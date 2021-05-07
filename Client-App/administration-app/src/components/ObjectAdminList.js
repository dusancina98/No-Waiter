import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";

const ObjectAdminList = () => {
	const { userState, dispatch } = useContext(UserContext);

	useEffect(() => {
		const getUsersHandler = async () => {
			await userService.findAllObjectAdmins(dispatch);
		};
		getUsersHandler();
	}, [dispatch]);

	return (
		<React.Fragment>
			{userState.objectAdmins.map((objectAdmin) => {
				return (
					<tr key={objectAdmin.Id}>
						<td>{objectAdmin.EntityDTO.Email}</td>
						<td>{objectAdmin.EntityDTO.Name}</td>
						<td>{objectAdmin.EntityDTO.Surname}</td>
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
