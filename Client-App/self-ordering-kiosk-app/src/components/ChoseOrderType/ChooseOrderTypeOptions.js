import React, { useContext } from "react";
import { orderConstants } from "../../constants/OrderConstants";
import { OrderContext } from "../../contexts/OrderContext";

const ChooseOrderTypeOptions = () => {
	const { dispatch } = useContext(OrderContext);


    const handleClickOnEatIn = () => {
		window.location = "#/create-order";
        dispatch({ type: orderConstants.CHOOSE_ORDER_TYPE, orderType: "ORDER_INSIDE"})
	}

    const handleClickOnTakeOut = () => {
		window.location = "#/create-order";
        dispatch({ type: orderConstants.CHOOSE_ORDER_TYPE, orderType: "TAKEOVER"})
	}

	return (
		<React.Fragment>
            <div className="row text-white d-md-flex align-items-end pt-2 text-center justify-content-center">
                <div className="card border-3 bg-indigo mr-2" style={{'height':'25em','width':'17em'}}>
                    <img className="card-img-top h-75 p-5 align-items-center" height="50px" src="../assets/images/food.png" alt=""/>
                    <div className="card-body">
                        <button onClick={() => handleClickOnEatIn()} type="button" style={{'backgroundColor':'red'}} class=" w-100 btn btn-primary btn-lg">EAT IN</button>
                    </div>
                </div>
                <div className="card border-3 bg-indigo ml-2" style={{'height':'25em','width':'17em'}}>
                    <img className="card-img-top h-75 p-5 align-items-center" height="150px" src="../assets/images/take-away.png" alt=""/>
                    <div className="card-body h-50">
                        <button onClick={() => handleClickOnTakeOut()} type="button" style={{'backgroundColor':'red'}} class="w-100 btn btn-primary btn-lg">TAKE OUT</button>
                    </div>
                </div>
			</div>
		</React.Fragment>
	);
};

export default ChooseOrderTypeOptions;