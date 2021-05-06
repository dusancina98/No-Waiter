import React, { useContext, useEffect } from "react";
import { ObjectContext } from "../contexts/ObjectContext";
import { objectService } from "../services/ObjectService";
import ObjectItem from "./ObjectItem";

const ObjectList = () => {
	const { objectState, dispatch } = useContext(ObjectContext);

	useEffect(() => {
		const getObjectsHandler = async () => {
			await objectService.findAll(dispatch);
		};
		getObjectsHandler();
	}, [dispatch]);

	return (
		<React.Fragment>
			<div className="content-wrapper">
				<div className="row">
					{objectState.objects.map((object) => {
						return <ObjectItem imagePath="assets/images/restaurant.jpg" key={object.Id} name={object.EntityDTO.Name} />;
					})}
				</div>
			</div>
		</React.Fragment>
	);
};

export default ObjectList;
