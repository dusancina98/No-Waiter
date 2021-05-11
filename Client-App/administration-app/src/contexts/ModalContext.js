import { createContext, useReducer } from "react";
import { modalReducer } from "../reducers/ModalReducer";

export const ModalContext = createContext();

const ModalContextProvider = (props) => {
	const [modalState, dispatch] = useReducer(modalReducer, {
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
	});

	return <ModalContext.Provider value={{ modalState, dispatch }}>{props.children}</ModalContext.Provider>;
};

export default ModalContextProvider;
