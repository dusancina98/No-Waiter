import React, {useContext} from "react";
import ChooseOrderHeaderLogo from "../components/ChoseOrderType/ChooseOrderHeaderLogo";
import ChooseOrderTypeOptions from "../components/ChoseOrderType/ChooseOrderTypeOptions";
import ChooseOrderTypeQuestionText from "../components/ChoseOrderType/ChoseOrderTypeQuestionText";
import { OrderContext } from "../contexts/OrderContext";

const ChooseOrder = () => {
    const { orderState } = useContext(OrderContext);

	return (
		<React.Fragment>
            <div hidden={orderState.pageVisible!==1} className="home-page-background">
                <div className="col-md-12">
                    <ChooseOrderHeaderLogo/>
                    <ChooseOrderTypeQuestionText question= "Where will you be eating?"/>
                    <ChooseOrderTypeOptions/>
				</div>
            </div>
		</React.Fragment>
	);
};

export default ChooseOrder;