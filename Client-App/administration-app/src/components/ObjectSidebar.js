import React, { useContext } from "react";
import { ObjectContext } from "../contexts/ObjectContext";

const ObjectSidebar = () => {
	const { objectState } = useContext(ObjectContext);

	return (
		<div className="col-md-4 col-lg-4 col-12">
			<h4>Object information</h4>

			<h4 className="mt-2">Name</h4>
			<p>{objectState.objectInfo.object.EntityDTO.Name}</p>

			<h4>Address</h4>
			<p>{objectState.objectInfo.object.EntityDTO.Address}</p>

			<h4>Address</h4>
			<p>{objectState.objectInfo.object.EntityDTO.Address}</p>

			<h4>Address</h4>
			<p>{objectState.objectInfo.object.EntityDTO.Address}</p>
			
			<h4 className="mt-5">Work time</h4>
			{objectState.objectInfo.object.EntityDTO.Name}
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
