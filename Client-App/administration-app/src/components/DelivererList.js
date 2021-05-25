import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
import { modalConstants } from "../constants/ModalConstants";


const DelivererList = () => {
	const { userState, dispatch } = useContext(UserContext);

	useEffect(() => {
		const getRequestsHandler = async () => {
			await userService.findAllDeliverer(dispatch);
		};
		getRequestsHandler();
	}, [dispatch]);

	const handleDelivererRequestClick = (delivererRequest) => {
		dispatch({ type: modalConstants.SHOW_DELIVERER_REQUEST_DETAILS, delivererRequest });
	};

	return (
		<React.Fragment>
			{userState.deliverers.map((deliverer) => {
				return (
					<tr key={deliverer.Id} onClick={() => handleDelivererRequestClick(deliverer)} style={{ cursor: "pointer" }}>
						<td>{deliverer.EntityDTO.Email}</td>
						<td>{deliverer.EntityDTO.Name}</td>
						<td>{deliverer.EntityDTO.Surname}</td>
						<td>{deliverer.EntityDTO.PhoneNumber}</td>
					</tr>
				);
			})}
		</React.Fragment>
	);
};

export default DelivererList;
