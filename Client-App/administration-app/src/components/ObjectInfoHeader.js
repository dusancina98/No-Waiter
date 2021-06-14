import React, { useContext, useEffect, useState } from "react";
import { colorConstants } from "../constants/ColorConstants";
import { objectConstants } from "../constants/ObjectConstants";
import { ObjectContext } from "../contexts/ObjectContext";
import { objectService } from "../services/ObjectService";
import FailureAlert from "./FailureAlert";
import SuccessAlert from "./SuccessAlert";

const ObjectInfoHeader = () => {
	const { objectState, dispatch } = useContext(ObjectContext);

	const [image, setImage] = useState("");

	const imgRef = React.createRef();

	const handleSubmit = () => {
		const formData = new FormData();
		formData.append("image", image, "img");

		objectService.updateObjectImage(formData, dispatch);
	};

	const onImageChange = (e) => {
		setImage(e.target.files[0]);

		if (e.target.files && e.target.files[0]) {
			let img = e.target.files[0];
			dispatch({ type: objectConstants.OBJECT_IMAGE_SELECTED, showedImage: URL.createObjectURL(img) });
		}
	};

	useEffect(() => {
		const getObjectHandler = async () => {
			await objectService.findByAdminId(dispatch);
		};
		getObjectHandler();
	}, [dispatch]);

	const handleImageDeselect = () => {
		dispatch({ type: objectConstants.OBJECT_IMAGE_DESELECTED });
	};

	return (
		<React.Fragment>
			<SuccessAlert
				hidden={!objectState.objectInfo.showSuccessMessage}
				header="Success"
				message={objectState.objectInfo.successMessage}
				handleCloseAlert={() => dispatch({ type: objectConstants.OBJECT_IMAGE_CHANGE_REQUEST })}
			/>
			<FailureAlert
				hidden={!objectState.objectInfo.showError}
				header="Error"
				message={objectState.objectInfo.errorMessage}
				handleCloseAlert={() => dispatch({ type: objectConstants.OBJECT_IMAGE_CHANGE_REQUEST })}
			/>
			<div
				className="img-fluid d-flex align-items-start flex-column"
				style={{ backgroundImage: `linear-gradient(black 10%, transparent 60%, black 100%), url(${objectState.objectInfo.showedImage})`, minHeight: "60vh", backgroundSize: "cover" }}
			>
				<h1 className="sticky-top d-flex justify-content-center col-12 mt-3" style={{ letterSpacing: "1.5vh", top: "50px", color: colorConstants.COLOR_WHITE, fontFamily: "Comic Sans MS" }}>
					<i>
						<b>{objectState.objectInfo.object.EntityDTO.Name}</b>
					</i>
				</h1>
				<div className="row mt-auto w-100">
					<div className="col-6 d-flex justify-content-start">
						<h3 className="ml-3" style={{ color: colorConstants.COLOR_WHITE }}>
							{objectState.objectInfo.object.EntityDTO.Address}
						</h3>
					</div>
					<div className="col-6 d-flex justify-content-end">
						<input type="file" ref={imgRef} style={{ display: "none" }} name="image" accept="image/png, image/jpeg" onChange={onImageChange} />

						<button hidden={!objectState.objectInfo.imageSelected} type="button" onClick={handleImageDeselect} className="btn btn-outline-secondary btn-rounded btn-icon border-0">
							<i className="mdi mdi-close text-danger"></i>
						</button>
						<button hidden={!objectState.objectInfo.imageSelected} type="button" onClick={handleSubmit} className="btn btn-outline-secondary btn-icon-text border-0">
							<i className="mdi mdi-file-check btn-icon-prepend"></i> Submit
						</button>
						<button hidden={objectState.objectInfo.imageSelected} type="button" onClick={() => imgRef.current.click()} className="btn btn-outline-secondary btn-icon-text border-0">
							<i className="mdi mdi-upload btn-icon-prepend"></i> Upload
						</button>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ObjectInfoHeader;
