import React, { useContext } from "react";
import { ObjectContext } from "../../contexts/ObjectContext";
import { objectService } from "../../services/ObjectService";

const SelfOrderingTokenGenerator = () => {
    const { objectState, dispatch} = useContext(ObjectContext)

	const generateNewToken = () => {
        objectService.generateNewToken(dispatch);
	}

	return (
		<React.Fragment>
			<div className="form-group row">
                <button className="btn btn-primary" onClick={() => generateNewToken()}>
                    Generate new token
                </button>
			</div>
			<div className=" form-group row">
			<textarea
          		value={objectState.generatedToken}
		  		readOnly
                style={{'borderColor':'gray','border':'1px solid',}}
				rows="10"
				cols="40"
        		/>
			</div>
			<div className="form-group row">
                <button className="btn btn-secondary float-right" onClick={() => {navigator.clipboard.writeText(objectState.generatedToken)}}>
                    Copy to clipboard
                </button>
			</div>
		</React.Fragment>
	);
};

export default SelfOrderingTokenGenerator;
