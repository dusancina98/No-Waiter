import React, { useContext, useEffect } from "react";
import { modalConstants } from "../constants/ModalConstants";
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

	const handleObjectClick = (object) => {
		dispatch({ type: modalConstants.SHOW_OBJECT_DETAILS, object });
	};

	return (
		<React.Fragment>
			<div className="content-wrapper">
				<div className="row">
					{objectState.objects.map((object) => {
						console.log(object);
						return <ObjectItem imagePath={object.EntityDTO.ImagePath} key={object.Id} name={object.EntityDTO.Name} clickHandler={() => handleObjectClick(object)} />;
					})}
				</div>
			</div>
		</React.Fragment>
	);
};

export default ObjectList;
