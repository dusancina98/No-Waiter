package NoWaiter.GatewayService.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

	@Value("#{'${allowedOriginList}'.split(',')}") 
	private String[]allowedOriginList;

	@Override
	public void addCorsMappings(CorsRegistry registry) {
	    registry.addMapping("/**").allowedOrigins("/**").allowedMethods("*").allowedHeaders( "authorization").allowCredentials(true).exposedHeaders("Cache-Control", "Content-Type");
	
	}  
}