import React, { useContext, useEffect, useState } from "react";
import { productService } from "../services/ProductService";
import { OrderContext } from "../contexts/OrderContext";
import { ProductContext } from "../contexts/ProductContext";
import SelectedProductCategoryTitle from "./SelectedProductCategoryTitle";
import CreateOrderProductItem from "./CreateOrderProductItem";
import { orderConstants } from "../constants/OrderConstants";
import MultiSelectListItems from "./MultiSelectListItems";
import InputSpinner from 'react-bootstrap-input-spinner'  
import { v4 as uuidv4 } from "uuid";

const CreateOrderProductList = () => {
	const { productState, dispatch } = useContext(ProductContext);
	const orderCtx = useContext(OrderContext);

	const [productCount, setProductCount] = useState(1);
	const [selectedSideDishes, setSelectedSideDishes] = useState([]);

	useEffect(() => {
		const getOProductssHandler = async () => {
			await productService.findAllProducts(dispatch);
		};
		getOProductssHandler();
	}, [dispatch]);

	const handleItemSelect = (product) =>{
		orderCtx.dispatch({ type: orderConstants.SHOW_ORDER_ITEM_DETAILS, product });
	}

	const handleClickOnBack = () =>{
		setSelectedSideDishes([])
		setProductCount(1)
		orderCtx.dispatch({ type: orderConstants.HIDE_ORDER_ITEM_DETAILS });
	}

	const handleClickOnAddToOrder = () => {
		orderCtx.dispatch({
			type: orderConstants.ADD_PRODUCT_TO_SHOPPING_CART,
			item: {
				Id: uuidv4(),
				ProductId: orderCtx.orderState.createOrder.selectedProduct.Id,
				ImageUrl: orderCtx.orderState.createOrder.selectedProduct.EntityDTO.Image,
				Name: orderCtx.orderState.createOrder.selectedProduct.EntityDTO.Name,
				Price: orderCtx.orderState.createOrder.selectedProduct.EntityDTO.Price,
				SideDishes: selectedSideDishes,
				Count: productCount,
			},
		});
		setSelectedSideDishes([])
		setProductCount(1)
	}

	const handleItemsAddAll = (sideDishes) => {
		setSelectedSideDishes(sideDishes);
	};

	const handleAddSideDish = (sideDish) => {
		console.log(sideDish);
		if (selectedSideDishes.find((sd) => sd.Id === sideDish.Id) === undefined) {
			let prom = [...selectedSideDishes];
			prom.push(sideDish);

			setSelectedSideDishes(prom);
		}
	};

	const handleSideDishDelete = (sideDishId) => {
		let prom = selectedSideDishes.filter((sideDish) => sideDish.Id !== sideDishId);
		setSelectedSideDishes(prom);
	};
	
	return (
		<div className="col-md-12 col-lg-12 col-12 no-gutters">
			<div hidden={orderCtx.orderState.createOrder.pageVisible !== 1}>
				<SelectedProductCategoryTitle/>
				<hr/>
				<div className="row ">
					{productState.showedProducts.map((product) => {
						console.log(product);
						return <CreateOrderProductItem key={product.Id} product={product} handleItemSelect={handleItemSelect} />;
					})}
				</div>
			</div>
			{orderCtx.orderState.createOrder.pageVisible !== 2 ? <div>
				</div>:
				<div hidden={orderCtx.orderState.createOrder.pageVisible !== 2} className='container'>
					<div className="row d-md-flex p-5 text-center justify-content-center" > 
						<div className="col-12 center d-md-flex  justify-content-center" >
							<div class="quantity">
								<h5>Select amount</h5>

								<InputSpinner
									type={'real'}
									precision={1}
									min={1}
									step={1}
									value={productCount}
									onChange={num=>setProductCount(num)}
									variant={'secondary'}
									size="lg"
								/>
							</div>
						</div>
						<div className="col-12 mt-5">
							<MultiSelectListItems
								list={orderCtx.orderState.createOrder.selectedProduct.EntityDTO.SideDishes}
								selectedItems={selectedSideDishes}
								handleItemDelete={handleSideDishDelete}
								handleItemAdd={handleAddSideDish}
								handleItemsAddAll={handleItemsAddAll}
								itemsName="side dishes"
								hiddenSelectAll={false}
							/>
						</div>
						
					</div>
					<div className="row d-flex align-items-end" >
						<div className="mr-auto ">
							<button onClick={() => handleClickOnBack()} type="button" style={{'backgroundColor':'rgb(17, 89, 134)'}} className="btn btn-primary btn-lg">Back</button>
						</div>
						<div className="ml-auto ">
							<button onClick={() => handleClickOnAddToOrder()} type="button" style={{'backgroundColor':'rgb(17, 89, 134)'}} className="btn btn-primary btn-lg">Add to order</button>
						</div>
					</div>
				</div>
			}
		</div>
	);
};

export default CreateOrderProductList;
