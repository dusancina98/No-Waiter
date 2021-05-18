import { useContext,useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
import { Link } from "react-router-dom";

const FirstActivationPasswordChangeForm = (props) => {
    const { userState, dispatch } = useContext(UserContext);

	const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");

    const userId = props.id;
	const token= props.token;

    const handleSubmit = (e) => {
		e.preventDefault();

		let changePasswordRequest = {
			password,
			repeatedPassword,
            userId,
			token
		};

        userService.changeFirstPassword(changePasswordRequest, dispatch);
	};

	useEffect(() => {

		let tokenDTO = {
			token
		}

		userService.checkIfActivationTokenIsValid(tokenDTO);
	});


	return (
		<form className="login100-form" onSubmit={handleSubmit}>
					<span className="login100-form-title p-b-26">
						No-Waiter Change Password
					</span>
					<span className="login100-form-title p-b-48">
						<i className="zmdi zmdi-font"/>
					</span>

                    <div hidden={userState.changePassword.showSuccessMessage} className="wrap-input100">
                        <span class="btn-show-pass">
							<i class="zmdi zmdi-eye"></i>
						</span>
				        <input className="input100" required type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <span class="focus-input100"></span>
                    </div>


			        <div hidden={userState.changePassword.showSuccessMessage} className="wrap-input100">
                        <span class="btn-show-pass">
							<i class="zmdi zmdi-eye"></i>
						</span>
				        <input className="input100" required type="password" name="repeatedPassword" placeholder="Repeat Password" value={repeatedPassword} onChange={(e) => setRepeatedPassword(e.target.value)}></input>
                        <span class="focus-input100"></span>
                    </div>

                    <div className="form-group text-center" style={{ color: "red", fontSize: "0.8em" }} hidden={!userState.changePassword.showError}>
				        {userState.changePassword.errorMessage}
			        </div>

					<div hidden={userState.changePassword.showSuccessMessage} class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
							<button class="login100-form-btn">
								Change password
							</button>
						</div>
					</div>

                    <div hidden={!userState.changePassword.showSuccessMessage} className="form-group text-center" style={{ fontSize: "1.3em" }}>
				        You successfully changed your password.
			        </div>

					<div hidden={!userState.changePassword.showSuccessMessage} class="container-login100-form-btn">
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

export default FirstActivationPasswordChangeForm;
