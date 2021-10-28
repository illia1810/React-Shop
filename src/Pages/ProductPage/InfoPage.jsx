import React, {useContext, useState} from 'react';
import AppContext from "../../context";
import "./ItemPage.css";


const InfoPage = ({product, editorMod}) => {
    const {
        user,
        setAuthorizationStatus,
        authorizationStatus,
        onAddToCart
    } = useContext(AppContext)

    const [productCount, setProductCount] = useState(1);

    return (product &&
        <div>
            <div className="item_wrapper">
                <div >
                    <img src={product.img} alt="item" className="item_image"/>
                </div>
                <div className="info_right">
                    <h3 className="item_title">{product.title}</h3>
                    <p className="item_type">Category: {product.type}</p>
                    <p className="item_price">Price: {product.price} $</p>
                    <p className="item_inStock">In Stock: {product.inStock} items</p>
                    {
                        !user.isLoggedIn
                            ?
                            <div className="add_to_cart_container">
                                <button disabled={editorMod}
                                        onClick={() => setAuthorizationStatus(!authorizationStatus)}
                                        className="add_to_cart_btn">Login
                                </button>
                            </div>
                            :
                            product.inStock > 0
                                ?
                                <div className="add_to_cart_container">
                                    <button
                                        disabled={editorMod}
                                        onClick={() => onAddToCart(product, productCount)}
                                        className="add_to_cart_btn">ADD TO BAG
                                    </button>
                                </div>
                                :
                                <div className="add_to_cart_container">
                                    <button disabled className="add_to_cart_btn">No items in stock</button>
                                </div>
                    }
                    <p className="item_description">{product.description}</p>
                    
                </div>
            </div>
            
        </div>
    );
};

export default InfoPage;