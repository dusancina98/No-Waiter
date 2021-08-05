import React from "react";
import Header from "../components/Header";
import SelfOrderingTokenGenerator from "../components/SelfOrderingTokenGenerator";
import SideBar from "../components/SideBar";
import ObjectContextProvider from "../contexts/ObjectContext";

const SelfOrderingTokenPage = () => {
	return (
		<React.Fragment>
			<div className="container-scroller">
				<SideBar />
				<div className="container-fluid">
					<Header />
					<div className="mt-4">
						<div className="p-5 container d-flex justify-content-center">
							<div className="row">
								<div className="col-12 mt-5">
                                    <ObjectContextProvider>
                                        <SelfOrderingTokenGenerator/>  
                                    </ObjectContextProvider>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default SelfOrderingTokenPage;
