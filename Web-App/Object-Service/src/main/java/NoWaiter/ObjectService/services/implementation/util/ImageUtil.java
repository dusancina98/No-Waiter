package NoWaiter.ObjectService.services.implementation.util;

import java.io.*;
import java.nio.file.*;

import org.springframework.web.multipart.MultipartFile;

public class ImageUtil {

	public static void saveFile(String uploadDir, String fileName, MultipartFile multipartFile) throws IOException {
        Path uploadPath = Paths.get(uploadDir);
         
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
         
        try (InputStream inputStream = multipartFile.getInputStream()) {
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ioe) {        
            throw new IOException("Could not save image file: " + fileName, ioe);
        }      
    }
	
	public static String getImagePath(String dirName, String fileName) {
		Path uploadDir = Paths.get(dirName);
		Path imagePath = uploadDir.resolve(fileName);
        return imagePath.toFile().getAbsolutePath();
	}
}
