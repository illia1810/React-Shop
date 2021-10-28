import React, {useEffect, useState} from "react";
import {Route, Switch} from "react-router-dom";
import {Home, About,ProductPage} from "./Pages/index";
import {Header,AuthorizationMenu,BagTamplate} from "./Components/index";
import AppContext from "./context";
import "./App.css";

function App() {

    const [cartOpened, setCartOpened] = useState(false);
    const [bagItems, setBagItems] = useState([]);
    const [inStockItems, setInStockItems] = useState([]);
    const [authorizationStatus, setAuthorizationStatus] = useState(false);
    const [itemAdded, setItemAdded] = useState(false);
    const [user, setUser] = useState({
        isAdmin: false,
        isLoggedIn: false,
    });

    async function getData() {
        try {
            const [cartResponse, itemsResponse] = await Promise.all([
                fetch("https://6175c7dd03178d00173da9e3.mockapi.io/api/v1/bag").then(res => res.json()),
                fetch("https://6175c7dd03178d00173da9e3.mockapi.io/api/v1/product").then(res => res.json()),
            ])
            setBagItems(cartResponse);
            setInStockItems(itemsResponse)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const onAddToCart = async (product, count = 1) => {
        setTimeout(() => setItemAdded(prev =>  !prev),300)
        let [cartProduct] = [bagItems.find(cartItem => Number(cartItem.id) === Number(product.id))]
        let [inStockItem] = [inStockItems.find(cartItem => Number(cartItem.id) === Number(product.id))]
        cartProduct.count += count;
        inStockItem.inStock = Number(inStockItem.inStock) - count
        setBagItems((prev) => [...prev.filter(cartItem => Number(cartItem.id) !== Number(product.id)), cartProduct])
        setInStockItems((prev) => [...prev.filter(item => Number(item.id) !== Number(product.id)), inStockItem])
        fetch(`https://6175c7dd03178d00173da9e3.mockapi.io/api/v1/bag/${product.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                count: cartProduct.count,
            })
        }).catch(err => console.log(err)
        )
        fetch(`https://6175c7dd03178d00173da9e3.mockapi.io/api/v1/product/${product.id}`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inStock: inStockItem.inStock,
            })
        }).catch(err => console.log(err))
    }

    const onClose = () => {
        setAuthorizationStatus(!authorizationStatus)
    }

    return (
        <AppContext.Provider value={{
            items: inStockItems,
            setItems: setInStockItems,
            bagItems,
            setBagItems,
            onAddToCart,
            user,
            setUser,
            setAuthorizationStatus,
            authorizationStatus,
            itemAdded,
            setItemAdded,
            onClose
        }}>
            <Header
                authorizationMenuOpen={() => setAuthorizationStatus(!authorizationStatus)}
                openCart={() => setCartOpened(!cartOpened)}
            />
            {cartOpened
                ? <BagTamplate
                    items={bagItems}
                    onClose={() => setCartOpened(!cartOpened)}
                />
                : null
            }
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={Home}
                    />
                    <Route
                        exact
                        path="/about"
                        component={About}
                    />
                    <Route
                        exact
                        path="/product/:itemID"
                        component={ProductPage}
                    />
                    <Route
                        render={() => <p className="page_not_found">Error 404 Page not found.</p>}
                    />
                </Switch>
            {authorizationStatus
                ?
                <AuthorizationMenu/>
                :
                null
            }
        </AppContext.Provider>
    )
}

export default App;