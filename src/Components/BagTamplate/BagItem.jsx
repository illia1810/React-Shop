import React, {useContext} from 'react';
import AppContext from "../../context";
import "./BagItem.css";

const BagItem = ({item}) => {

    const {bagItems,
        setBagItems,
        items,
        setItems,
        setItemAdded
    } = useContext(AppContext)

    const handleRemove = (item) => {
        setTimeout(() => setItemAdded(prev => !prev),300)
        let [itemToRemoveFromCart] = [bagItems.find(product => product.id === item.id)]
        let [itemToIncrementInStock] = [items.find(product => product.id === item.id)]
        let itemCount = itemToRemoveFromCart.count;
        itemToIncrementInStock.inStock += itemCount;
        itemToRemoveFromCart.count = 0;
        setBagItems((items) => {
            return [
                ...items.filter(product => product.id !== item.id),
                itemToRemoveFromCart
            ]
        })
        setItems((items) => {
            return [
                ...items.filter(product => product.id !== item.id),
                itemToIncrementInStock
            ]
        })
        fetch(`https://61726dde61ed900017c4087f.mockapi.io/cart/${item.id}`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                count: itemToRemoveFromCart.count,
            })
        })

        fetch(`https://61726dde61ed900017c4087f.mockapi.io/items/${item.id}`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inStock: itemToIncrementInStock.inStock
            })
        })

    }

    return (
        <div className="product_wrapper">
            <p className="product_title">{item.title}</p>
            <div className="product">
                <div className="product_img_wrapper">
                    <img className="cart_product_img" src={item.img} alt={item.title}/>
                </div>
                <div className="product_info" >
                    <h3 className="product_price">Price: {item.price} $</h3>
                    <p>Quantity: {item.count}</p>
                </div>
            </div>
            <p onClick={() => handleRemove(item)} className="remove_button">Remove</p>
        </div>
    );
};

export default BagItem;