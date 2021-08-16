import React, { useContext, useEffect } from "react";
import { modalConstants } from "../../constants/ModalConstants";
import { UserContext } from "../../contexts/UserContext";
import { userService } from "../../services/UserService";

const ObjectAdminList = () => {
	const { userState, dispatch } = useContext(UserContext);

	useEffect(() => {
		const getUsersHandler = async () => {
			await userService.findAllObjectAdmins(dispatch);
		};
		getUsersHandler();
	}, [dispatch]);

	const handleObjectAdminClick = (objectAdmin) => {
		dispatch({ type: modalConstants.SHOW_OBJECT_ADMIN_DETAILS, objectAdmin });
	};

	return (
		<React.Fragment>
			{userState.objectAdmins.map((objectAdmin) => {
				return (
					<tr key={objectAdmin.Id} onClick={() => handleObjectAdminClick(objectAdmin)} style={{ cursor: "pointer" }}>
						<td>{objectAdmin.EntityDTO.Email}</td>
						<td>{objectAdmin.EntityDTO.Name}</td>
						<td>{objectAdmin.EntityDTO.Surname}</td>
						<td>{objectAdmin.EntityDTO.Address}</td>
						<td>{objectAdmin.EntityDTO.PhoneNumber}</td>
						<td>
							<label className="badge badge-info">{objectAdmin.EntityDTO.ObjectName}</label>
						</td>
					</tr>
				);
			})}
		</React.Fragment>
	);
};

export default ObjectAdminList;
