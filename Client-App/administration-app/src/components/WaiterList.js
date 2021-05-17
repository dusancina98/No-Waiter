import React, { useContext, useEffect } from "react";
import { modalConstants } from "../constants/ModalConstants";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";

const WaiterList = () => {
	const { userState, dispatch } = useContext(UserContext);

	useEffect(() => {
		const getUsersHandler = async () => {
			await userService.findAllWaiters(dispatch);
		};
		getUsersHandler();
	}, [dispatch]);

	const handleObjectAdminClick = (waiter) => {
		dispatch({ type: modalConstants.SHOW_WAITER_DETAILS, waiter });
	};

	return (
		<React.Fragment>
			{userState.waiters.map((waiter) => {
				console.log(waiter);
				return (
					<tr key={waiter.Id} onClick={() => handleObjectAdminClick(waiter)} style={{ cursor: "pointer" }}>
						<td>{waiter.EntityDTO.Email}</td>
						<td>{waiter.EntityDTO.Name}</td>
						<td>{waiter.EntityDTO.Surname}</td>
						<td>{waiter.EntityDTO.Address}</td>
						<td>{waiter.EntityDTO.PhoneNumber}</td>
					</tr>
				);
			})}
		</React.Fragment>
	);
};

export default WaiterList;
