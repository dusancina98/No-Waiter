import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";

const DelivererRequestList = () => {
	const { userState, dispatch } = useContext(UserContext);

	useEffect(() => {
		const getRequestsHandler = async () => {
			await userService.findAllDelivererRequests(dispatch);
		};
		getRequestsHandler();
	}, [dispatch]);


	return (
		<React.Fragment>
			{userState.delivererRequest.requests.map((delivererRequest) => {
				return (
					<tr key={delivererRequest.Id} style={{ cursor: "pointer" }}>
						<td>{delivererRequest.EntityDTO.Email}</td>
						<td>{delivererRequest.EntityDTO.Name}</td>
						<td>{delivererRequest.EntityDTO.Surname}</td>
						<td>{delivererRequest.EntityDTO.PhoneNumber}</td>
					</tr>
				);
			})}
		</React.Fragment>
	);
};

export default DelivererRequestList;
