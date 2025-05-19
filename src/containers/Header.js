import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


const Header = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const [showCart, setShowCart] = useState(false);
    const dispatch = useDispatch();
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="ui fixed menu" style={{ padding: "0 20px" }}>
            <div
                className="ui container center"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    height: "60px"
                }}
            >
                <h2>
                    <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
                        FakeShop — practicing with Redux store. Cart state is stored in localStorage 🎯
                    </a>
                </h2>

                <div
                    style={{
                        position: "relative",
                        cursor: "pointer",
                        marginTop: "10px" // 👈 ниже иконка корзины
                    }}
                    onClick={() => setShowCart(!showCart)}
                >
                    <i className="shopping cart icon large"></i>

                    {totalItems > 0 && (
                        <div
                            style={{
                                position: "absolute",
                                top: "-5px",
                                right: "-10px",
                                background: "red",
                                color: "white",
                                borderRadius: "50%",
                                padding: "4px 7px",
                                fontSize: "12px"
                            }}
                        >
                            {totalItems}
                        </div>
                    )}

                    {showCart && (
                        <div
                            style={{
                                position: "absolute",
                                top: "40px",
                                right: 0,
                                width: "300px",
                                background: "white",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                padding: "10px",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                                zIndex: 10
                            }}
                        >
                            <h4 style={{ marginBottom: "10px" }}>Cart:</h4>
                            {cartItems.length === 0 ? (
                                <p>Empty</p>
                            ) : (
                                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                    {cartItems.map(item => (
                                        <li
                                            key={item.productId}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                marginBottom: "10px",
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                {item.image && (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title || "product"}
                                                        style={{
                                                            width: "40px",
                                                            height: "40px",
                                                            objectFit: "contain",
                                                            marginRight: "10px",
                                                            border: "1px solid #eee",
                                                            borderRadius: "4px"
                                                        }}
                                                    />
                                                )}
                                                <span style={{ fontSize: "14px" }}>
                                                    {item.title || `Product ID ${item.productId}`} — {item.quantity} шт.
                                                </span>
                                            </div>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    dispatch({ type: "REMOVE_FROM_CART", payload: { productId: item.productId } });
                                                }}
                                                style={{
                                                    background: "transparent",
                                                    border: "none",
                                                    color: "#999",
                                                    fontSize: "16px",
                                                    cursor: "pointer",
                                                    marginLeft: "10px"
                                                }}
                                                title="Удалить"
                                            >
                                                &times;
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
