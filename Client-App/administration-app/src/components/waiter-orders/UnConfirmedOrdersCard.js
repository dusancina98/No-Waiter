import React from "react";

const UnConfirmedOrdersCard = () => {
	return (
		<React.Fragment>
			<div className="card" style= {{"width":"auto"}} >
                <div className="card-header text-center" style={{"backgroundColor":"orange"}}>
                    Un-Confirmed
                </div>
                <ul className="list-group list-group-flush" >
                    <div className="hover-div">
                        <div class='hover-div--off'>
                            <li className="list-group-item hover-div" style= {{"width":"auto","minHeight":"100px","minWidth":"250px"}}>
                                <div  style={{"height":"70px"}}>
                                    <div className="row align-items-center" >
                                        <div className="col-2 ">
                                            <div className="row">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
                                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
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
                        </div>
                    
                    <div className='hover-div--on'>
                        <li>
                            <div >
                                <div className="row">
                                    <div className="col-6 text-center">
                                        <button style={{"minHeight":"100px"}}>
                                            Details
                                        </button>
                                    </div>
                                    <div className="col-6 text-center">
                                        <button style={{"minHeight":"100px"}} >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </div>
                    
                    </div>
                </ul>
            </div>
		</React.Fragment>
	);
};

export default UnConfirmedOrdersCard;
