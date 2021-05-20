import Axios from "axios";
import React, { useState } from "react";
import { authHeader } from "../helpers/auth-header";

const ObjectImageForm = () => {
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

	return (
		<React.Fragment>
			<form method="post" enctype="multipart/form-data" onSubmit={handleSubmit}>
				<label>Photos: </label>
				<input type="file" name="image" accept="image/png, image/jpeg" onChange={onImageChange} />
				<button type="submit">Submit</button>
				<img src={showedImage} />
			</form>
		</React.Fragment>
	);
};

export default ObjectImageForm;
