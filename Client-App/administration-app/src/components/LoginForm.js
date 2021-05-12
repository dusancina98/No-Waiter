import { useContext,useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";

const LoginForm = () => {
    const { userState, dispatch } = useContext(UserContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
		e.preventDefault();

		let loginRequest = {
			username: email,
			password,
		};

        userService.login(loginRequest, dispatch);
	};

	return (
		<form className="login100-form" onSubmit={handleSubmit}>
					<span className="login100-form-title p-b-26">
						No-Waiter Login
					</span>
					<span className="login100-form-title p-b-48">
						<i className="zmdi zmdi-font"/>
					</span>

                    <div className="wrap-input100">
				        <input className="input100" required type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <span class="focus-input100"></span>
                    </div>

			        <div className="wrap-input100">
                        <span class="btn-show-pass">
							<i class="zmdi zmdi-eye"></i>
						</span>
				        <input className="input100" required type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <span class="focus-input100"></span>
                    </div>

					<div class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
							<button class="login100-form-btn">
								Login
							</button>
						</div>
					</div>
                    <div className="form-group text-center" style={{ color: "red", fontSize: "0.8em" }} hidden={!userState.loginError.showError}>
				        {userState.loginError.errorMessage}
			        </div>
					<div class="text-center p-t-55">
						<span class="txt1">
                            Forgot your password?
						</span>

						<a class="txt2 p-l-10" href="#reset">
							Reset password
						</a>
					</div>
				</form>
	);
};

export default LoginForm;
