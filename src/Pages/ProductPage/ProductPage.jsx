import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import InfoPage from "./InfoPage";
import AppContext from "../../context";

const ProductPage = () => {
    const {
        itemAdded,
    } = useContext(AppContext);

    const {itemID} = useParams();
    const [product,setProduct] = useState(null);

    useEffect(() => {
        fetch(`https://6175c7dd03178d00173da9e3.mockapi.io/api/v1/product/?id=${itemID}`)
            .then(res => res.json()
            )
            .then(data => {
                setProduct(...data);
            })
            .catch(err => console.log(err))
    },[itemID,itemAdded]);

    return (
        <InfoPage product={product} />
    );
};

export default ProductPage;