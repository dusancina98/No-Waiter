package no_waiter.order_service.services.contracts.dto;

public class CustomerOrderItemDTO {
	public String Image;
	
	public int Count;
	
	public String Note;

	public String SideDishes;
	
	public String Name;

	public Double Price;

	public CustomerOrderItemDTO(String image, int count, String note, String sideDishes, String name, Double price) {
		super();
		Image = image;
		Count = count;
		Note = note;
		SideDishes = sideDishes;
		Name=name;
		Price=price;
	}
	
	

}
