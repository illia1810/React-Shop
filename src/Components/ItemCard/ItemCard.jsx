import React, {useContext} from 'react';
import AppContext from "../../context";
import {Link} from "react-router-dom";
import "./ItemCard.css";

const ItemCard = ({item}) => {
    const {user, onAddToCart, setAuthorizationStatus,authorizationStatus,} = useContext(AppContext);

    return (
        <div className="product-tamplate">
            <div className="image"><img src={item.img} alt={item.title} className="product_image"/></div>
            <Link to={`/product/${item.id}`}><h5 className="item-tittle">{item.title}</h5></Link>
            <div className="item-info">
                <span className="item-price">Price: <b>{item.price}</b> $</span>
                <span className="item-inStock">In Stock: {item.inStock} </span>
                {!user.isLoggedIn
                    ?
                        <button className="add-to-bag"
                                onClick={() => setAuthorizationStatus(!authorizationStatus)}
                        >
                            <b>Login</b>
                        </button>
                    :
                    item.inStock > 0
                        ?
                        <button
                            className="add-to-bag"
                            onClick={() => onAddToCart(item)}
                        >
                            <b>Add to bag</b>
                        </button>
                        :
                        <button
                            disabled
                            className="add-to-bag"
                        >
                            <b>No items in stock</b>
                        </button>
                }
            </div>
        </div>
    );
};

export default ItemCard;