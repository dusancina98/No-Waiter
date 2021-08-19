import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { userService } from "../../services/UserService";

const ForgotPasswordForm = () => {
	const {userState, dispatch } = useContext(UserContext);

	const [email, setEmail] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		let resetPasswordLinkRequest = {
			email,
		};

		userService.resetPasswordLinkRequest(resetPasswordLinkRequest,dispatch);
	};

	return (
		<form className="login100-form" onSubmit={handleSubmit}>
			<span className="login100-form-title p-b-26">
				No-Waiter Forgot Password
			</span>
			<span className="login100-form-title p-b-48">
				<i className="zmdi zmdi-font"/>
			</span>

			<div className="form-group text-center p-t-25" style={{ color: "red", fontSize: "1em" }} hidden={!userState.forgotPasswordRequestLinkError.showError}>
				{userState.forgotPasswordRequestLinkError.errorMessage}
			</div>

            <div hidden={userState.forgotPasswordRequestLinkError.showSuccessMessage} className="wrap-input100">
				<input className="input100" required type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <span class="focus-input100"></span>
            </div>


			<div hidden={!userState.forgotPasswordRequestLinkError.showSuccessMessage} className="text-center p-b-35 fs-20">
				We sent an email to <b>{userState.forgotPasswordRequestLinkError.emailAddress}</b> with a link to get back into your account.
			</div>

			<div hidden={!userState.forgotPasswordRequestLinkError.showSuccessMessage} class="container-login100-form-btn">
				<div class="wrap-login100-form-btn">
					<div class="login100-form-bgbtn"></div>
						<Link className="login100-form-btn" to="/login">
					    	Back to login
				        </Link>
				</div>
			</div> 


			<div hidden={userState.forgotPasswordRequestLinkError.showSuccessMessage} class="container-login100-form-btn">
				<div class="wrap-login100-form-btn">
					<div class="login100-form-bgbtn"></div>
					<button class="login100-form-btn">
						Send reset email
					</button>
				</div>
			</div>
				
		</form>
	);
};

export default ForgotPasswordForm;
