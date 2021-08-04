import React, { useContext } from "react";
import { orderConstants } from "../../constants/OrderConstants";
import { OrderContext } from "../../contexts/OrderContext";

const ChooseOrderHeaderLogo = () => {
	const { dispatch } = useContext(OrderContext);

    const handleClickOnBack = () => {
		window.location = "#/home";
		dispatch({ type: orderConstants.RESET_ORDER})
	}

	return (
		<React.Fragment>
            <div class="d-flex justify-content-between">
                <div>
                </div>
                <div style={{'marginLeft':'90px'}}>
                   <img alt='' src="../assets/images/pngegg.png" href="#/choose-type" height="200px"/>
                </div>
                <a onClick={()=>handleClickOnBack()} class="btn btn-circle-exit mr-3 mt-3 d-flex justify-content-center align-items-center" data-toggle="collapse" href="#/choose" aria-expanded="false" aria-controls="collapseExample">
				    <div style={{'fontSize':'25px'}}>
						X
					</div>
				</a>
            </div>
		</React.Fragment>
	);
};

export default ChooseOrderHeaderLogo;