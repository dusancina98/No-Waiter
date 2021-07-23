import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import ConfirmedOrdersCard from "../components/waiter-orders/ConfirmedOrdersCard";
import ReadyOrdersCard from "../components/waiter-orders/ReadyOrdersCard";
import UnConfirmedOrdersCard from "../components/waiter-orders/UnConfirmedOrdersCard";
import OrderContextProvider from "../contexts/OrderContext"

const WaiterOrdersPage = () => {
	return (
		<React.Fragment>
			<div className="container-scroller">
				<SideBar />
				<div className="container-fluid page-body-wrapper">
					<Header />
					<div className="main-panel">
                        <div className="order-container">
                             <div className="row ">
                                 <OrderContextProvider>
                                    <div className="col-sm">
                                        <UnConfirmedOrdersCard/>
                                    </div>
                                 </OrderContextProvider>
                                <div className="col-sm">
                                    <ConfirmedOrdersCard/>
                                </div>
                                <div className="col-sm">
                                    <ReadyOrdersCard/>
                                </div>
                                <div className="col-sm">
                                    <div className="card" style= {{"width":"auto"}} >
                                        <div className="card-header text-center" style={{"backgroundColor":"DodgerBlue"}}>
                                            On-Route
                                        </div>
                                        <ul className="list-group list-group-flush">
                                        <li className="list-group-item" style= {{"width":"auto","minHeight":"100px","minWidth":"250px"}}>
                                                <div>
                                                    <div className="row align-items-center">
                                                        <div className="col-2 ">
                                                            <div className="row">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
                                                                    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className="col-7" >
                                                            <div className="row">
                                                                <b>Type</b>: Deliverer
                                                            </div> 
                                                            <div className="row">
                                                                <b>Placed</b>: 3 minutes ago
                                                            </div>
                                                            <div className="row">
                                                                <b>Expired</b>: 15 minutes
                                                            </div>
                                                        </div>
                                                        <div className="col-3" >
                                                            <div className="row">
                                                                <b>1300 RSD</b>
                                                            </div> 
                                                            <div className="row">
                                                                Card
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div className="card" style= {{"width":"auto"}} >
                                        <div className="card-header text-center" style={{"backgroundColor":"green"}}>
                                            Completed
                                        </div>
                                        <ul className="list-group list-group-flush">
                                        <li className="list-group-item" style= {{"width":"auto","minHeight":"100px","minWidth":"250px"}}>
                                                <div>
                                                    <div className="row align-items-center">
                                                        <div className="col-2 ">
                                                            <div className="row">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                                                    <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className="col-7" >
                                                            <div className="row">
                                                                <b>Type</b>: Deliverer
                                                            </div> 
                                                            <div className="row">
                                                                <b>Placed</b>: 3 minutes ago
                                                            </div>
                                                            <div className="row">
                                                                <b>Expired</b>: 15 minutes
                                                            </div>
                                                        </div>
                                                        <div className="col-3" >
                                                            <div className="row">
                                                                <b>1300 RSD</b>
                                                            </div> 
                                                            <div className="row">
                                                                Card
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                            </div>
                        </div>
					</div>
				</div>
                </div>
			</div>
		</React.Fragment>
	);
};

export default WaiterOrdersPage;
