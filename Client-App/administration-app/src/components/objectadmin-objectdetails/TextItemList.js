import React from "react";

const TextItemList = ({ list, handleItemDelete, handleItemAdd, itemInput, setItemInput }) => {
	return (
		<React.Fragment>
			{list.map((listItem) => {
				return (
					<div key={listItem.Id}>
						<label>{listItem.EntityDTO.Name}</label>
						<button type="button" onClick={() => handleItemDelete(listItem.Id)} className="btn btn-outline-secondary btn-rounded btn-icon border-0">
							<i className="mdi mdi-close text-danger"></i>
						</button>
					</div>
				);
			})}
			<div>
				<input type="text" placeholder="Ingredient" value={itemInput} onChange={(e) => setItemInput(e.target.value)} />
				<button type="button" onClick={handleItemAdd} disabled={itemInput.length === 0} className="btn btn-outline-primary btn-icon=text border-0">
					<i className="mdi mdi-plus mr-1"></i>Add
				</button>
			</div>
		</React.Fragment>
	);
};

export default TextItemList;
