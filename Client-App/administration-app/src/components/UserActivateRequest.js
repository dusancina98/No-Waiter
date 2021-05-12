import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";

const UserActivateRequest = (props) => {
    const { userState, dispatch } = useContext(UserContext);

	const userId = props.id;

    const handleSubmit = (e) => {
		e.preventDefault();
        alert('TODO')
	};

    useEffect(() => {
		userService.checkIfUserIdExist(userId, dispatch);
	}, [userId, dispatch]);

	return (
		<form className="login100-form" onSubmit={handleSubmit}>
					<span className="login100-form-title p-b-48">
						<i className="zmdi zmdi-font"/>
					</span>

                    <div className="text-center p-b-35 fs-20">
					    Vas nalog nije aktiviran. Ukoliko zelite da aktiviranje naloga pritisnite na dugme ispod nakon cega ce Vam na email: <b>{userState.inActiveUser.emailAddress}</b> stici
					    aktivacioni link.
				    </div>

                    <div className="container-login100-form-btn p-t-35">
						<div className="wrap-login100-form-btn">
							<div className="login100-form-bgbtn"></div>
							<button className="login100-form-btn">
								Send activation mail
							</button>
						</div>
					</div>
				</form>
	);
};

export default UserActivateRequest;
