import React from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

const ProductComponent = () => {
    const products = useSelector((state) => state.allProducts.products);

    const renderList = products.map((product) => {
        const { id, title, image, price, category } = product;
        return (

            <div className="card" key={id}>
                <Link to={`/product/${id}`} className="ui link">
                    <div className="image ui ">
                        <img src={image} alt={title} />
                    </div>
                    <div className="content">
                        <div className="header">{title}</div>
                        <div className="meta price">$ {price}</div>
                        <div className="meta">{category}</div>
                    </div>
                </Link>

            </div >
        );
    });
    return (
        <div className="ui four stackable cards" style={{ marginTop: "30px" }}>
            {renderList}
        </div>
    );
};

export default ProductComponent;
