import { useContext, useState } from "react";
import { OrderContext } from "../contexts/OrderContext";

const CreateOrderWrapper = () => {
	const { orderState } = useContext(OrderContext);

	return (
		<div id="portfolio" className="portfolio">
			<div className=" ">
				<div className="row portfolio-container">
					<div className={orderState.createOrder.pageVisible === 1 ? "row w-100 justify-content-center" : "row w-100 "}>
                        <div className="col-12 col-md-2">
                            test1
                        </div>
                        <div className="col-12 col-md-8">
                            test2
                        </div>
                        <div className="col-12 col-md-2">
                            test3
                        </div>
                    </div>
				</div>
			</div>
		</div>
	);
};

export default CreateOrderWrapper;
