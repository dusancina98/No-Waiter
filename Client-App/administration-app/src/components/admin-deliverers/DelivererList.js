import React, { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { userService } from "../../services/UserService";
import { modalConstants } from "../../constants/ModalConstants";


const DelivererList = () => {
	const { userState, dispatch } = useContext(UserContext);

	useEffect(() => {
		const getRequestsHandler = async () => {
			await userService.findAllDeliverer(dispatch);
		};
		getRequestsHandler();
	}, [dispatch]);

	const handleDelivererRequestClick = (deliverer) => {
		dispatch({ type: modalConstants.SHOW_DELIVERER_DETAILS, deliverer });
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
						<td>{deliverer.EntityDTO.Grade}</td>
						<td>
							<label  className={deliverer.EntityDTO.DelivererStatus==='ACTIVE' ? 'badge badge-info' : 'badge badge-info-inactive'}>{deliverer.EntityDTO.DelivererStatus}</label>
						</td>
					</tr>
				);
			})}
		</React.Fragment>
	);
};

export default DelivererList;
