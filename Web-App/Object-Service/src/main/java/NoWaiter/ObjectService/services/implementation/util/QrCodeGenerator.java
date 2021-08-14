package NoWaiter.ObjectService.services.implementation.util;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.nio.file.FileSystems;
import java.util.HashMap;
import java.util.Map;


import javax.imageio.ImageIO;

import org.json.JSONObject;
import org.springframework.security.crypto.bcrypt.BCrypt;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

public class QrCodeGenerator {
	
	public QrCodeGenerator() {
		
	}
	
	@SuppressWarnings("unchecked")
	public byte[] generateQrCode(String objectId, String tableId) throws Exception {
		String filePath = "QRCode.png";
		String charset = "UTF-8";
		@SuppressWarnings("rawtypes")
		Map hintMap = new HashMap();
		hintMap.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);
		System.out.println("TEST1");
		Map<String, String> qrCodeDataMap = Map.of(
		"ObjectId", objectId,
		"TableId", tableId,
		"Key", generateVerificationKey("OBJECT")
		// see next section for ´generateVerificationKey´ method
		);

		String jsonString = new JSONObject(qrCodeDataMap).toString();
		createQRCode(jsonString, filePath, charset, hintMap, 500, 500);

		BufferedImage image = ImageIO.read(new File(filePath));

		ByteArrayOutputStream baos = new ByteArrayOutputStream();

		ImageIO.write(image, "png", baos);

		byte[] imageData = baos.toByteArray();
		
		return imageData;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private void createQRCode(String qrCodeData, 
            String filePath, 
            String charset, 
            Map hintMap, 
            int qrCodeHeight, 
            int qrCodeWidth) throws Exception {

		BitMatrix matrix = new MultiFormatWriter().encode(
		new String(qrCodeData.getBytes(charset), charset),
		BarcodeFormat.QR_CODE,
			qrCodeWidth,
			qrCodeHeight,
			hintMap
			);
			
		MatrixToImageWriter.writeToPath(
		matrix,
		filePath.substring(filePath.lastIndexOf('.') + 1),
		FileSystems.getDefault().getPath(filePath)
			);
	}
	
	private String generateVerificationKey(String str) throws Exception {
		/*int iterations = 10000;
		int keyLength = 512;
			
		char[] strChars = str.toCharArray();
		byte[] saltBytes = "ASD".getBytes();
		
		SecretKeyFactory skf = SecretKeyFactory.getInstance("SHA256");
		PBEKeySpec spec = new PBEKeySpec(strChars, saltBytes, iterations, keyLength);
		SecretKey key = skf.generateSecret(spec);
		byte[] hashedBytes = key.getEncoded( );
			
		return Hex.encodeHexString(hashedBytes);*/
		
		String strong_salt = BCrypt.gensalt(10);

		String hash = BCrypt.hashpw(str,strong_salt);
		
		return hash;
		
	}
}
