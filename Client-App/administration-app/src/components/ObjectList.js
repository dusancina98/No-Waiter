import React, { useContext, useEffect } from "react";
import { modalConstants } from "../constants/ModalConstants";
import { ModalContext } from "../contexts/ModalContext";
import { ObjectContext } from "../contexts/ObjectContext";
import { objectService } from "../services/ObjectService";
import ObjectItem from "./ObjectItem";

const ObjectList = () => {
	const { objectState, dispatch } = useContext(ObjectContext);
	const modalContext = useContext(ModalContext);

	useEffect(() => {
		const getObjectsHandler = async () => {
			await objectService.findAll(dispatch);
		};
		getObjectsHandler();
	}, [dispatch]);

	const handleObjectClick = (object) => {
		modalContext.dispatch({ type: modalConstants.SHOW_OBJECT_DETAILS, object });
	};

	return (
		<React.Fragment>
			<div className="content-wrapper">
				<div className="row">
					{objectState.objects.map((object) => {
						console.log(object);
						return <ObjectItem imagePath="assets/images/restaurant.jpg" key={object.Id} name={object.EntityDTO.Name} clickHandler={() => handleObjectClick(object)} />;
					})}
				</div>
			</div>
		</React.Fragment>
	);
};

export default ObjectList;
