import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";

const UserActivateRequest = (props) => {
    const { userState, dispatch } = useContext(UserContext);

	const userId = props.id;

    const handleSubmit = (e) => {
		e.preventDefault();

		let requestIdDTO = {
			id: userId,
		};

		userService.resendActivationLinkRequest(requestIdDTO, dispatch);
	};

    useEffect(() => {
		userService.checkIfUserIdExist(userId, dispatch);
	}, [userId, dispatch]);

	return (
		<form className="login100-form" onSubmit={handleSubmit}>
					<span className="login100-form-title p-b-48">
						<i className="zmdi zmdi-font"/>
					</span>

                    <div hidden={userState.inActiveUser.showSuccessMessage} className="text-center p-b-35 fs-20">
					    Vas nalog nije aktiviran. Ukoliko zelite da aktiviranje naloga pritisnite na dugme ispod nakon cega ce Vam na email: <b>{userState.inActiveUser.emailAddress}</b> stici
					    aktivacioni link.
				    </div>

                    <div hidden={userState.inActiveUser.showSuccessMessage} className="container-login100-form-btn p-t-35">
						<div className="wrap-login100-form-btn">
							<div className="login100-form-bgbtn"></div>
							<button className="login100-form-btn">
								Send activation mail
							</button>
						</div>
					</div>

					<div className="form-group text-center  p-t-25" style={{ color: "red", fontSize: "1em" }} hidden={!userState.inActiveUser.showError}>
						{userState.inActiveUser.errorMessage}
					</div>

					<div hidden={!userState.inActiveUser.showSuccessMessage} className="form-group text-center" style={{ fontSize: "1.3em" }}>
						Activation mail was sent successfully.
					</div>
				</form>
	);
};

export default UserActivateRequest;
