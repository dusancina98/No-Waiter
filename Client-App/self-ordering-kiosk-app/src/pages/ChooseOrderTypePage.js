import React from "react";
import ChooseOrderHeaderLogo from "../components/ChoseOrderType/ChooseOrderHeaderLogo";
import ChooseOrderTypeOptions from "../components/ChoseOrderType/ChooseOrderTypeOptions";
import ChooseOrderTypeQuestionText from "../components/ChoseOrderType/ChoseOrderTypeQuestionText";
import OrderContextProvider from "../contexts/OrderContext";

const ChooseOrderTypePage = () => {
	return (
		<React.Fragment>
            <div className="home-page-background">
                <div className="col-md-12">
                    <OrderContextProvider>
                        <ChooseOrderHeaderLogo/>
                    </OrderContextProvider>
                    <ChooseOrderTypeQuestionText question= "Where will you be eating?"/>
                    <OrderContextProvider>
                        <ChooseOrderTypeOptions/>
                    </OrderContextProvider>
				</div>
            </div>
                
		</React.Fragment>
	);
};

export default ChooseOrderTypePage;