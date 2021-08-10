package no_waiter.order_service.services.implementation.util;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.ListItem;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

import no_waiter.order_service.entities.Order;
import no_waiter.order_service.entities.OrderItem;
import no_waiter.order_service.entities.SideDish;

public class OrderReportPDFGenerator {
	
	private Order order;
	
	private Font catFont = new Font(Font.FontFamily.TIMES_ROMAN, 18,
            Font.BOLD);
	
	private Font redFontMax = new Font(Font.FontFamily.TIMES_ROMAN, 56,
            Font.NORMAL, BaseColor.RED);
	
    private Font smallBold = new Font(Font.FontFamily.TIMES_ROMAN, 10,
            Font.BOLD);
    private Font normalnBold = new Font(Font.FontFamily.TIMES_ROMAN, 12,
            Font.BOLD);
	
	public OrderReportPDFGenerator(Order order) {
		this.order = order;
	}
	
	public byte[] generatePDF() throws Exception, DocumentException {
		String fileName = String.valueOf("report_" + order.getId() +".pdf");

		Document document = new Document(PageSize.A6);
		@SuppressWarnings("unused")
		PdfWriter pdfWriter = PdfWriter.getInstance(document,
				new FileOutputStream(fileName));
		document.open();
		
        addPageTitle(document);

        addOrderItemsContent(document);
        createTotalPrice(document);

        Paragraph paragraph1 = new Paragraph("Your number: ", normalnBold);
		paragraph1.setAlignment(Element.ALIGN_CENTER);
		document.add(paragraph1);
		Paragraph paragraph2 = new Paragraph("13", redFontMax);
		paragraph2.setAlignment(Element.ALIGN_CENTER);
		document.add(paragraph2);

		document.close();

		Path path = Paths.get(fileName);
		byte[] contents = Files.readAllBytes(path);
		
		return contents;
	}
	
	@SuppressWarnings("deprecation")
	private void addPageTitle(Document document)
            throws DocumentException {
        Paragraph preface = new Paragraph();
		Paragraph paragraph = new Paragraph("ORDER REPORT", catFont);
		paragraph.setAlignment(Element.ALIGN_CENTER);
        addEmptyLine(preface, 1);
        preface.add(paragraph);        
        preface.add(new Paragraph(
                "Order created: "  + new Date().toLocaleString(),
                smallBold));
        addEmptyLine(preface, 1);
        
        document.add(preface);
    }
	
	private void addOrderItemsContent(Document document) throws Exception {
        Paragraph preface = new Paragraph();

		preface.add(new Paragraph(
                "Order items: ",
                normalnBold));

        document.add(preface);
        document.add(createList());

        addEmptyLine(preface, 1);

	
	}
	
	private void createTotalPrice(Document document)
            throws DocumentException {
        Paragraph paragraph = new Paragraph("Total price: "+ getTotalPrice() , normalnBold);
		paragraph.setAlignment(Element.ALIGN_RIGHT);
		
		addEmptyLine(paragraph,2);
        document.add(paragraph);
    }
	
	private String getTotalPrice() {
		Double totalPrice=0.0;
		
		for(OrderItem orderItem : order.getItems()) {
			totalPrice+= orderItem.getCount()*orderItem.getSingleItemPrice();
		}
		return totalPrice.toString();
	}

	private void addEmptyLine(Paragraph paragraph, int number) {
        for (int i = 0; i < number; i++) {
            paragraph.add(new Paragraph(" "));
        }
    }
	
	private com.itextpdf.text.List createList() {
        com.itextpdf.text.List list = new com.itextpdf.text.List(false, false, 10);
        for(OrderItem orderItem : order.getItems()) {
            list.add(new ListItem(orderItem.getCount() + " * " + orderItem.getProduct().getName() + generateSideDishesString(orderItem) + " = " + orderItem.getCount()*orderItem.getSingleItemPrice()));
        }
    
        return list;
    }

	private String generateSideDishesString(OrderItem orderItem) {
		String retVal="(";
		
		if(orderItem.getSideDishes().size()==0) {
			return "";
		}
		
		int sidedishesNumber=1;
		for(SideDish sideDish: orderItem.getSideDishes()) {
			retVal+=sideDish.getName();
			if(orderItem.getSideDishes().size() != sidedishesNumber) {
				retVal+=",";
			}
			sidedishesNumber++;
		}
		
		retVal+=")";
		
		return retVal;
		
	}
}
