import React, { createContext, useReducer } from "react";
import { productReducer } from "../reducers/ProductReducer";

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
	const [ productState, dispatch] = useReducer(productReducer, {
        categories: ["All products"],
        products: [],
		showedProducts: [
            {
                EntityDTO: {
                    Address: "",
                    Favorite: false,
                    Image: "",
                    Name: "",
                    Opened: false,
                    Rating: 0,
                },
                Id: "",
            },
        ],
		selectedCategory: "All products",
	});

	return <ProductContext.Provider value={{ productState, dispatch }}>{props.children}</ProductContext.Provider>;
};

export default ProductContextProvider;
