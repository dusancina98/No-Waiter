import React from "react";

const ChooseOrderTypeQuestionText = ({question}) => {
	return (
		<React.Fragment>
            <div className="row text-white  d-md-flex pt-5 text-center justify-content-center">
                <h1 className="display-3">{question}</h1>
            </div>
		</React.Fragment>
	);
};

export default ChooseOrderTypeQuestionText;