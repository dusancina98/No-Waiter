import React from "react";


const ChooseOrderTypePage = () => {
	return (
		<React.Fragment>
            <div className="home-page-background">
                <div className="col-md-12">
                    <div className="h-25 d-md-flex justify-content-center">
                        <img alt='' src="../assets/images/pngegg.png" href="#/choose-type" height="200px"/>
                    </div>
                    <div className="row text-white  d-md-flex pt-5 text-center justify-content-center">
                        <h1 className="display-3">Where will you be eating?</h1>
                    </div>

                    <div className="row text-white d-md-flex align-items-end pt-2 text-center justify-content-center">
                        <div className="card border-3 bg-indigo mr-2" style={{'height':'25em','width':'17em'}}>
                            <img className="card-img-top h-75 p-5 align-items-center" height="50px" src="../assets/images/food.png" alt=""/>
                            <div className="card-body">
                                <button type="button" style={{'backgroundColor':'red'}} class=" w-100 btn btn-primary btn-lg">EAT IN</button>
                            </div>
                        </div>
                        <div className="card border-3 bg-indigo ml-2" style={{'height':'25em','width':'17em'}}>
                            <img className="card-img-top h-75 p-5 align-items-center" height="150px" src="../assets/images/take-away.png" alt=""/>
                            <div className="card-body h-50">
                                <button type="button" style={{'backgroundColor':'red'}} class="w-100 btn btn-primary btn-lg">TAKE OUT</button>
                            </div>
                        </div>
					</div>
				</div>
            </div>
                
		</React.Fragment>
	);
};

export default ChooseOrderTypePage;