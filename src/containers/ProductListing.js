import React, { useEffect, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/productAction";
import ProductComponent from "./ProductComponent";

const ProductListing = () => {
    const products = useSelector((state) => state.allProducts); // исправил доступ
    const dispatch = useDispatch();

    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get("https://fakestoreapi.com/products");
            dispatch(setProducts(response.data));
        } catch (err) {
            console.log("Err", err);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);


    return (
        <div className="ui grid container" style={{ marginTop: "30px" }}>
            <ProductComponent />
        </div>
    );
};

export default ProductListing;
