import React, { useContext } from "react";
import { modalConstants } from "../constants/ModalConstants";
import { ObjectContext } from "../contexts/ObjectContext";
import { hasRoles } from "../helpers/auth-header";

const ObjectSidebar = () => {
	const { objectState, dispatch } = useContext(ObjectContext);

	const handleEditObjectInformationClick = () => {
		dispatch({ type: modalConstants.SHOW_OBJECT_DETAILS, object: objectState.objectInfo.object });
	}

	return (
		<div className="col-md-4 col-lg-4 caol-12">
			<div className="row">
				<h3 className="mt-1">Object information</h3> 
				<button
					type="button"
					data-toggle="tooltip"
					disabled={!hasRoles("ROLE_OBJADMIN")}
					hidden={!hasRoles("ROLE_OBJADMIN")}
					title="Add new product category"
					onClick={() => handleEditObjectInformationClick()}
					className="btn btn-outline-secondary btn-rounded btn-icon border-0 ml-3"
				>
					<i>
						<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="bi bi-pencil" viewBox="0 0 16 16">
						<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
					</svg>
					</i>
				</button>
			</div>

			<h4 className="mt-3">Name</h4>
			<p>{objectState.objectInfo.object.EntityDTO.Name}</p>

			<h4 className="mt-2">Email</h4>
			<p>{objectState.objectInfo.object.EntityDTO.Email}</p>

			<h4 className="mt-2">Address</h4>
			<p>{objectState.objectInfo.object.EntityDTO.Address}</p>

			<h4 className="mt-2">Phone Number</h4>
			<p>{objectState.objectInfo.object.EntityDTO.PhoneNumber}</p>
			
			<h4 className="mt-5">Work time</h4>
			<p>Ponedeljak - {objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.MONDAY.Working ? objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.MONDAY.TimeFrom + " - " +  objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.MONDAY.TimeTo : 'NERADAN' }</p>
			<p>Utorak - {objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.TUESDAY.Working ? objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.TUESDAY.TimeFrom + " - " +  objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.TUESDAY.TimeTo : 'NERADAN' }</p>
			<p>Sreda - {objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.WEDNESDAY.Working ? objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.WEDNESDAY.TimeFrom + " - " +  objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.WEDNESDAY.TimeTo : 'NERADAN' }</p>
			<p>Cetvrtak - {objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.THURSDAY.Working ? objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.THURSDAY.TimeFrom + " - " +  objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.THURSDAY.TimeTo : 'NERADAN' }</p>
			<p>Petak - {objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.FRIDAY.Working ? objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.FRIDAY.TimeFrom + " - " +  objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.FRIDAY.TimeTo : 'NERADAN' }</p>
			<p>Subota - {objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.SATURDAY.Working ? objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.SATURDAY.TimeFrom + " - " +  objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.SATURDAY.TimeTo : 'NERADAN' }</p>
			<p>Nedelja - {objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.SUNDAY.Working ? objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.SUNDAY.TimeFrom + " - " +  objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.SUNDAY.TimeTo : 'NERADAN' }</p>

			
			
		</div>
	);
};

export default ObjectSidebar;
