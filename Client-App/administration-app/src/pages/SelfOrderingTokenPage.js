import React from "react";
import HeaderAndSideBarWrapper from "../components/page-addons/HeaderAndSideBarWrapper";
import SelfOrderingTokenGenerator from "../components/self-ordering-token/SelfOrderingTokenGenerator";
import ObjectContextProvider from "../contexts/ObjectContext";

const SelfOrderingTokenPage = () => {
	return (
		<React.Fragment>
			<HeaderAndSideBarWrapper>
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
			</HeaderAndSideBarWrapper>
		</React.Fragment>
	);
};

export default SelfOrderingTokenPage;
