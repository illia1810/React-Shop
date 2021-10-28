import React, {useContext} from 'react';
import "./BagInfo.css";
import AppContext from "../../context";

const BagInfo = ({onOpen}) => {

    const {bagItems} = useContext(AppContext)

    const totalBag = bagItems
        .filter(item => item.count > 0)
        .reduce((prev, item) => prev + Number(item.price) * Number(item.count), 0);

    return (
        <div onClick={onOpen} className="cart_block">
            {
                totalBag > 0
                ?
                    <p
                        className="cart-sum"
                    >
                        {totalBag} $
                    </p>
                    :
                    <p className="cart-sum empty"
                    >
                        Your bag is empty...
                    </p>
            }
        </div>
    );
};

export default BagInfo;