import { modalConstants } from "../constants/ModalConstants";

export const modalReducer = (state, action) => {
	switch (action.type) {
		case modalConstants.SHOW_OBJECT_DETAILS:
			return {
				...state,
				objectDetails: {
					showModal: true,
					readOnly: true,
					object: action.object,
				},
			};
		case modalConstants.HIDE_OBJECT_DETAILS:
			return {
				...state,
				objectDetails: {
					showModal: false,
					readOnly: true,
					object: {
						Id: "",
						EntityDTO: {
							Email: "",
							Name: "",
							Address: "",
							PhoneNumber: "",
							ImagePath: "",
						},
					},
				},
			};
		case modalConstants.ALLOW_INPUT_FIELDS:
			let prom = { ...state };
			prom.objectDetails.readOnly = false;
			return prom;

		default:
			return state;
	}
};
