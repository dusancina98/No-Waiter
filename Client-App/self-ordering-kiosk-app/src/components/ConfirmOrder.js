import React, {useContext} from "react";
import { OrderContext } from "../contexts/OrderContext";
import { capitalizeFirstLetter } from "../helpers/string-util";
import { orderService } from "../services/OrderService";

const ConfirmOrder = () => {
    const { orderState,dispatch } = useContext(OrderContext);

	const handleClickOnBack = () =>{
		window.location = "#/home";
	}

	const getOrderSum = () => {
		let sum = 0;
		orderState.createOrder.orderItems.forEach((item) => {
			sum += item.Count * item.Price;
		});
		return sum;
	};

	const getItemSum = (item) =>{
		return item.Count * item.Price;
	}

	const handleConfirmOrder = () =>{
		let order = {
			Items: [],
			OrderType: orderState.orderType,
			Address: "",
			EstimatedTime: 0,
			TableId: "",
		};

		orderState.createOrder.orderItems.forEach((item) => {
			if (item.SideDishes.length === 0) {
				order.Items.push({ Id: item.ProductId, Count: item.Count, Note: item.Note, SideDishes: [] });
			} else {
				let sideDishes = [];
				item.SideDishes.forEach((sideDish) => {
					sideDishes.push(sideDish.Id);
				});
				order.Items.push({ Id: item.ProductId, Count: item.Count, Note: item.Note, SideDishes: sideDishes });
			}
		});

		orderService.createOrder(order, dispatch);
	}
    
	return (
		<React.Fragment>
				<div hidden={orderState.pageVisible!==3}>
					<div className="create-order-header d-md-flex align-items-center justify-content-end">
						<a onClick={()=>handleClickOnBack()} class="btn btn-circle-exit mr-2 d-flex justify-content-center align-items-center" data-toggle="collapse" href="#/choose" aria-expanded="false" aria-controls="collapseExample">
							<div style={{'fontSize':'25px'}}>
								X
							</div>
						</a>
					</div>
					<div className="container">
                        <div className="p-5">
							<h1 style={{ color: "rgb(17, 89, 134)" }}>CONFIRM YOUR ORDER</h1>
							<div className="mt-5" style={{'width':'100%','height':'100%'}}>
								<hr></hr>
								{orderState.createOrder.orderItems.map((item) => {
									return (
										<React.Fragment>
											<div className="d-flex justify-content-between">
												<div className="d-md-flex justify-content-start">
													<h3>{item.Count} x {item.Name} ({item.SideDishes.map((sideDish) =>
												item.SideDishes.indexOf(sideDish) === item.SideDishes.length - 1 ? capitalizeFirstLetter(sideDish.EntityDTO.Name) : capitalizeFirstLetter(sideDish.EntityDTO.Name + ", ")
											)}) </h3>
												</div>
												<div className="d-md-flex justify-content-center">
													
												</div>
												<div className="d-md-flex justify-content-end">
													<h3>=</h3><h3 style={{ color: "#198ae3" }}> {getItemSum(item)} RSD</h3> 
												</div>
											</div>
											
										</React.Fragment>
										);
									})}
									<hr></hr>
									<div className=" d-flex justify-content-end display-4 mr-2">
										<b>Total:</b>
										<span style={{ color: "#198ae3" }} className="ml-2">
										<b>{Number(getOrderSum()).toFixed(2)} RSD</b>
										</span>
									</div>
							</div>
							<div className="row d-flex align-items-end mt-5" >
								<div className="mr-auto ">
									<button onClick={()=>handleClickOnBack()} type="button" style={{'backgroundColor':'rgb(17, 89, 134)'}} className="btn btn-primary btn-lg">Cancel order</button>
								</div>
								<div className="ml-auto ">
									<button onClick={()=>handleConfirmOrder()} type="button" style={{'backgroundColor':'rgb(17, 89, 134)'}} className="btn btn-primary btn-lg">Confirm order</button>
								</div>
							</div>
						</div>
                    </div>
				</div>
		</React.Fragment>
	);
};

export default ConfirmOrder;