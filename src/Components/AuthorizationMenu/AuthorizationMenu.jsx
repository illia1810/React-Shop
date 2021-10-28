import React, {useContext} from 'react';
import LogIn from "./LogIn/LogIn";
import LogOut from "./LogOut/LogOut";
import AppContext from "../../context";

const AuthorizationMenu = () => {
    const {user, setUser, authorizationStatus, setAuthorizationStatus, onClose} = useContext(AppContext);

    return (
        user.isLoggedIn
            ?
            <LogIn
                user={user}
                setUser={setUser}
                authorizationStatus={authorizationStatus}
                setAuthorizationStatus={setAuthorizationStatus}
                onClose={onClose}
            />
            :
            <LogOut
                setUser={setUser}
                authorizationStatus={authorizationStatus}
                setAuthorizationStatus={setAuthorizationStatus}
                onClose={onClose}
            />

    );
};

export default AuthorizationMenu;