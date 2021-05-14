import { useContext,useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";

const FirstActivationPasswordChangeForm = (props) => {
    const { userState, dispatch } = useContext(UserContext);

	const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");

    const userId = props.id;

    const handleSubmit = (e) => {
		e.preventDefault();

		let loginRequest = {
			password,
			repeatedPassword,
            userId
		};

        userService.login(loginRequest, dispatch);
	};

	return (
		<form className="login100-form" onSubmit={handleSubmit}>
					<span className="login100-form-title p-b-26">
						No-Waiter Change Password
					</span>
					<span className="login100-form-title p-b-48">
						<i className="zmdi zmdi-font"/>
					</span>

                    <div className="wrap-input100">
                        <span class="btn-show-pass">
							<i class="zmdi zmdi-eye"></i>
						</span>
				        <input className="input100" required type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <span class="focus-input100"></span>
                    </div>

			        <div className="wrap-input100">
                        <span class="btn-show-pass">
							<i class="zmdi zmdi-eye"></i>
						</span>
				        <input className="input100" required type="password" name="repeatedPassword" placeholder="Repeat Password" value={repeatedPassword} onChange={(e) => setRepeatedPassword(e.target.value)}></input>
                        <span class="focus-input100"></span>
                    </div>

					<div class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
							<button class="login100-form-btn">
								Change password
							</button>
						</div>
					</div>

                    <div className="form-group text-center p-t-25" style={{ color: "red", fontSize: "1em" }} hidden={!userState.loginError.showError}>
				        {userState.loginError.errorMessage}
			        </div>
				</form>
	);
};

export default FirstActivationPasswordChangeForm;
