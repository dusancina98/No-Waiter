package NoWaiter.UserService.services.implementation;

import java.util.UUID;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import NoWaiter.UserService.entities.User;

@Service
public class EmailServiceImpl {
	@Autowired
	private JavaMailSender javaMailSender;
	
	private final String LOCAL_URL = "http://localhost:8082";
	
	private final String CLIENT_APP_URL = "http://localhost:3000";


	@Autowired
	private Environment env;
	
	@Async
	public void sendActivationLinkAsync(User user, UUID activationId)
			throws MailException, InterruptedException, MessagingException {
		System.out.println("Slanje emaila...");
		
		String url = LOCAL_URL + "/api/users/activate-user/" + activationId;
		
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
		String htmlMsg = "<p>Hello " + user.getName() + ",</p>" +
					"<p>You registered an account on PQuince portal, before being able to use your account you need to verify that this is your email address by clicking here:</p>"
					+ "<a href=\"" + url + "\">Verify your account</a>.</p>" + "<p>Kind Regards, No-Waiter</p>"; 
		helper.setText(htmlMsg, true);
		helper.setTo(user.getEmail());
		helper.setSubject("Activate account");
		helper.setFrom(env.getProperty("spring.mail.username"));
		javaMailSender.send(mimeMessage);
		System.out.println("Email poslat!");
	}

	public void sendResetPasswordLinkAsync(User user, UUID resetPasswordId) throws MessagingException {
		System.out.println("Slanje emaila...");
		
		String url = CLIENT_APP_URL + "#/reset-password/" + resetPasswordId;
		
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
		String htmlMsg = "<p>Hello " + user.getName() + ",</p>" +
					"<p>You registered an account on PQuince portal, before being able to use your account you need to verify that this is your email address by clicking here:</p>"
					+ "<a href=\"" + url + "\">Verify your account</a>.</p>" + "<p>Kind Regards, No-Waiter</p>"; 
		helper.setText(htmlMsg, true);
		helper.setTo(user.getEmail());
		helper.setSubject("Activate account");
		helper.setFrom(env.getProperty("spring.mail.username"));
		javaMailSender.send(mimeMessage);
		System.out.println("Email poslat!");

	}
}
