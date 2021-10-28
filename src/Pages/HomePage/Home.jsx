import React, {useContext} from 'react';
import AppContext from "../../context";
import ItemCard from "../../Components/ItemCard/ItemCard";
import "./Home.css";

const Home = ({onAddToCart}) => {
    const {items} = useContext(AppContext);

    return (
        <div className="products-tamplate">
            {!!items.length && items.sort((a,b)=> a.id - b.id)
                .map((item) => {
                return (
                    <ItemCard
                        item={item}
                        key={item.id}
                        onAddToCart={onAddToCart}
                    />
                )
            })}
        </div>
    );
};

export default Home;