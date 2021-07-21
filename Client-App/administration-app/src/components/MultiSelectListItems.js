import React from "react";

const MultiSelectListItems = ({ list, selectedItems, handleItemDelete, handleItemAdd, handleItemsAddAll, itemsName, hiddenSelectAll = true }) => {
	return (
		<React.Fragment>
			<div>
				<h5>Select {itemsName}</h5>
			</div>
			<span hidden={hiddenSelectAll}>
				<button type="button" onClick={() => handleItemsAddAll(list)} className="btn btn-secondary btn-icon-text">
					All <i className="mdi mdi-plus btn-icon-append"></i>
				</button>
			</span>
			{list.map((listItem, index) => {
				return (
					<span key={listItem.Id} className={index === 0 && hiddenSelectAll === true ? "" : "ml-2"}>
						<button type="button" onClick={() => handleItemAdd(listItem)} className="btn btn-secondary btn-icon-text">
							{listItem.EntityDTO.Name} <i className="mdi mdi-plus btn-icon-append"></i>
						</button>
					</span>
				);
			})}
			<div hidden={selectedItems.length === 0} className="mt-3">
				<h5>Selected {itemsName}</h5>
			</div>
			<div>
				{selectedItems.map((listItem, index) => {
					return (
						<span key={listItem.Id} className={index === 0 ? "" : "ml-2"}>
							<button type="button" onClick={() => handleItemDelete(listItem.Id)} className="btn btn-outline-dark btn-icon-text border-0">
								{listItem.EntityDTO.Name} <i className="mdi mdi-close btn-icon-append text-danger"></i>
							</button>
						</span>
					);
				})}
			</div>
		</React.Fragment>
	);
};

export default MultiSelectListItems;
