import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { selectedProduct, removeSelectedProduct } from "../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = () => {
    const product = useSelector((state) => state.product);
    const { image, title, price, category, description } = product;
    const { productId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
                dispatch(selectedProduct(response.data));
            } catch (err) {
                console.log("Error", err);
            }
        };

        if (productId && productId !== "") {
            fetchProductDetail();
        }

        return () => {
            dispatch(removeSelectedProduct());
        };
    }, [productId, dispatch]);

    const handleAddToCart = () => {
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                productId: product.id,
                title: product.title,
                image: product.image
            }
        });
    };
    return (
        <div className="ui grid container" style={{ marginTop: "30px" }}>
            {Object.keys(product).length === 0 ? (
                <div>Loading...</div>
            ) : (
                <div className="ui placeholder segment">
                    <div className="ui two column stackable center aligned grid">
                        <div className="ui vertical divider"></div>
                        <div className="middle aligned row">
                            <div className="column lp">
                                <img className="ui fluid image" src={image} alt={title} />
                            </div>
                            <div className="column rp">
                                <h1>{title}</h1>
                                <h2>
                                    <a className="ui teal tag label">${price}</a>
                                </h2>
                                <h3
                                    style={{
                                        textTransform: "uppercase",
                                        padding: 20,
                                        border: "2px solid brown",
                                        backgroundColor: "#a2a0a03b",
                                    }}
                                    className="ui brown block"
                                >
                                    {category}
                                </h3>
                                <p>{description}</p>
                                <div
                                    className="ui vertical animated button"
                                    tabIndex="0"
                                    onClick={() => handleAddToCart(product.id)}
                                >
                                    <div className="hidden content">
                                        <i className="shop icon"></i>
                                    </div>
                                    <div className="visible content">Add to Cart</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
