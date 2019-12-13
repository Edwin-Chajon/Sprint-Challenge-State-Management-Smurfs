import React, {useContext} from 'react';
import ProductContext from '../contexts/ProductContext'



const Products = () => {
	const { smurfs, addItem }=useContext(ProductContext);
	
	return (
		<div className="products-container">
			{smurfs.map(smurf => (
				<Product
                smurf={smurf}
					addItem={addItem}
				/>
			))}
		</div>
	);
};

export default Products;
