import { useContext,useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
import { Link } from "react-router-dom";

const ResetPasswordForm = (props) => {
    const { userState, dispatch } = useContext(UserContext);

	const [password, setPassword] = useState("");
	const [passwordRepeat, setPasswordRepeat] = useState("");
	let resetPasswordId = props.id;

    const handleSubmit = (e) => {
		e.preventDefault();

		let resetPasswordRequest = {
			resetPasswordId,
			password,
			passwordRepeat,
		};

		userService.resetPassword(resetPasswordRequest, dispatch);
	};

	return (
		<form className="login100-form" onSubmit={handleSubmit}>
					<span className="login100-form-title p-b-26">
						No-Waiter Reset Password
					</span>
					<span className="login100-form-title p-b-48">
						<i className="zmdi zmdi-font"/>
					</span>

                    <div hidden={userState.resetPassword.showSuccessMessage} className="wrap-input100">
                        <span class="btn-show-pass">
							<i class="zmdi zmdi-eye"></i>
						</span>
				        <input className="input100" required type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <span class="focus-input100"></span>
                    </div>

			        <div hidden={userState.resetPassword.showSuccessMessage} className="wrap-input100">
                        <span class="btn-show-pass">
							<i class="zmdi zmdi-eye"></i>
						</span>
				        <input className="input100" required type="password" name="password" placeholder="Password" value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)}></input>
                        <span class="focus-input100"></span>
                    </div>

					<div className="form-group text-center" style={{ color: "red", fontSize: "1em" }} hidden={!userState.resetPassword.showError}>
						{userState.resetPassword.errorMessage}
					</div>

					<div hidden={userState.resetPassword.showSuccessMessage} class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
							<button class="login100-form-btn">
								Reset password
							</button>
						</div>
					</div>
                    <div hidden={!userState.resetPassword.showSuccessMessage} className="form-group text-center" style={{ fontSize: "1.3em" }}>
						You successfully changed your password.
					</div>

					<div hidden={!userState.resetPassword.showSuccessMessage} className="form-group">
					<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
							<Link className="login100-form-btn" to="/login">
								Back to login
							</Link>
						</div>

					</div>
				</form>
	);
};

export default ResetPasswordForm;
