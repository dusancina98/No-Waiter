package NoWaiter.UserService.services.implementation;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import NoWaiter.UserService.entities.Deliverer;
import NoWaiter.UserService.entities.DelivererRequest;
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
	public void sendActivationLinkAsync(User user, String token)
			throws MailException, InterruptedException, MessagingException {
		System.out.println("Slanje emaila...");
		
		String url = LOCAL_URL + "/api/users/activate-user/token=" + token;
		
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
	
	@Async
	public void sendResetPasswordLinkAsync(User user, String token) throws MessagingException {
		System.out.println("Slanje emaila...");
		
		String url = CLIENT_APP_URL + "#/reset-password/" + user.getId() +"/"+ token;
		
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
		String htmlMsg = "<p>Hello " + user.getName() + ",</p>" +
					"<p>You have sent a password reset request, if you want to reset password please click on link bellow</p>"
					+ "<a href=\"" + url + "\">Reset your password</a>.</p>" + "<p>Kind Regards, No-Waiter</p>"; 
		helper.setText(htmlMsg, true);
		helper.setTo(user.getEmail());
		helper.setSubject("Reset password");
		helper.setFrom(env.getProperty("spring.mail.username"));
		javaMailSender.send(mimeMessage);
		System.out.println("Email poslat!");

	}

	public void sendDelivererActivationLinkAsync(Deliverer deliverer, String token) throws MessagingException {
		System.out.println("Slanje emaila...");
		
		String url = CLIENT_APP_URL + "#/reset-password/" + deliverer.getId() +"/"+ token;
		
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
		String htmlMsg = "<p>Hello " + deliverer.getName() + ",</p>" +
					"<p>You registered an account on PQuince portal, before being able to use your account you need to verify that this is your email address by clicking here:</p>"
					+ "<a href=\"" + url + "\">Verify your account</a>.</p>" + "<p>Kind Regards, No-Waiter</p>"; 
		helper.setText(htmlMsg, true);
		helper.setTo(deliverer.getEmail());
		helper.setSubject("Activate account");
		helper.setFrom(env.getProperty("spring.mail.username"));
		javaMailSender.send(mimeMessage);
		System.out.println("Email poslat!");
	}


	public void sendDelivererRejectReasonEmailAsync(DelivererRequest delivererRequest, String reason) throws MessagingException {
		System.out.println("Slanje emaila...");
		
		
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
		String htmlMsg = "<p>Hello " + delivererRequest.getName() + ",</p>" +
					"<p>Your request for deliverer is rejected</p>"+
					"<p>Reason: </p>" + "<b>" + reason + "</b>" 
					+ "<p>Kind Regards, No-Waiter</p>"; 
		helper.setText(htmlMsg, true);
		helper.setTo(delivererRequest.getEmail());
		helper.setSubject("Rejected deliverer request");
		helper.setFrom(env.getProperty("spring.mail.username"));
		javaMailSender.send(mimeMessage);
		System.out.println("Email poslat!");
	}

	public void sendDelivererAcceptedRequestEmailAsync(DelivererRequest delivererRequest) throws MessagingException {
		System.out.println("Slanje emaila...");
		

		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
		String htmlMsg = "<p>Hello " + delivererRequest.getName() + ",</p>" +
					"<p>Your request for deliverer is accepted</p>"+
					"<p>You will receive an email soon to activate your account </p>"   
					+ "<p>Kind Regards, No-Waiter</p>"; 
		helper.setText(htmlMsg, true);
		helper.setTo(delivererRequest.getEmail());
		helper.setSubject("Accepted deliverer request");
		helper.setFrom(env.getProperty("spring.mail.username"));
		javaMailSender.send(mimeMessage);
		System.out.println("Email poslat!");
	}

}
