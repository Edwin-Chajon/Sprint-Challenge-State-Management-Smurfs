import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';




const smurfButton = props => {
	return (
		<div className="product">
			<p>{props.name}</p>
			<p>{props.height}</p>
            <p>{props.age}</p>
           
			<button onClick={() => props.addItem(props.smurfs)}>
                Add
			</button>
		</div>
	);
};

export default smurfButton;