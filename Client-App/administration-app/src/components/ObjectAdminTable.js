import React from "react";
import { useContext } from "react";
import { userConstants } from "../constants/UserConstants";
import { UserContext } from "../contexts/UserContext";
import ObjectAdminList from "./ObjectAdminList";
import SuccessAlert from "./SuccessAlert";

const ObjectAdminTable = () => {
	const { userState, dispatch } = useContext(UserContext);

	return (
		<React.Fragment>
			<div className="m-3">
				<SuccessAlert
					hidden={!userState.deleteObjectAdmin.showSuccessMessage}
					header="Success"
					message={userState.deleteObjectAdmin.successMessage}
					handleCloseAlert={() => dispatch({ type: userConstants.OBJECT_ADMIN_DELETE_REQUEST })}
				/>
			</div>
			<div className="col-lg-12 grid-margin stretch-card">
				<div className="card">
					<div className="card-body">
						<h4 className="card-title">Object admins</h4>
						<div className="table-responsive">
							<table className="table table-hover">
								<thead>
									<tr>
										<th>Email</th>
										<th>Name</th>
										<th>Surname</th>
										<th>Address</th>
										<th>Phone number</th>
										<th>Object name</th>
									</tr>
								</thead>
								<tbody>
									<ObjectAdminList />
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ObjectAdminTable;
