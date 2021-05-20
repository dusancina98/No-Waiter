import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { colorConstants } from "../constants/ColorConstants";
import { ObjectContext } from "../contexts/ObjectContext";
import { authHeader } from "../helpers/auth-header";
import { objectService } from "../services/ObjectService";

const ObjectImageForm = () => {
	const { objectState, dispatch } = useContext(ObjectContext);

	const [image, setImage] = useState("");
	const [showedImage, setShowedImage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();

		formData.append("image", image, "img");

		Axios.put(`/object-api/api/objects/image`, formData, { validateStatus: () => true, headers: authHeader() })
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const onImageChange = (e) => {
		setImage(e.target.files[0]);

		console.log(image);

		if (e.target.files && e.target.files[0]) {
			let img = e.target.files[0];
			setShowedImage(URL.createObjectURL(img));
		}
	};

	useEffect(() => {
		const getObjectHandler = async () => {
			await objectService.findByAdminId(dispatch);
		};
		getObjectHandler();
	}, []);

	const getImagePath = () => {
		return showedImage === "" ? objectState.objectInfo.object.EntityDTO.ImagePath : showedImage;
	};

	return (
		<div className="img-fluid" style={{ backgroundImage: 'url("' + getImagePath() + '")', minHeight: "50vh", backgroundSize: "cover" }}>
			<div className="mt-3">
				<div className="row">
					<h1 className="sticky-top d-flex justify-content-center col-12" style={{ letterSpacing: "1.5vh", top: "50px", color: colorConstants.COLOR_WHITE, fontFamily: "Comic Sans MS" }}>
						<i>
							<b>{objectState.objectInfo.object.EntityDTO.Name}</b>
						</i>
					</h1>
				</div>
				<div className="d-flex ">
					<div className="col-6 float-left ">
						<h4>{objectState.objectInfo.object.EntityDTO.Address}</h4>
					</div>
					<div className="col-6 float-right">
						<form method="post" enctype="multipart/form-data" onSubmit={handleSubmit}>
							<input type="file" name="image" accept="image/png, image/jpeg" onChange={onImageChange} />

							<button type="button" className="btn btn-outline-secondary btn-icon-text" style={{ border: "0" }}>
								<i className="mdi mdi-upload btn-icon-prepend"></i> Upload
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ObjectImageForm;
