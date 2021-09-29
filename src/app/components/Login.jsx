import React from "react";
import * as mutations from '../store/mutations';
import { connect } from "react-redux";

const LoginComponent = ({authenticateUser, authenticated}) => {
    return <div>
        <h2>
            Please login
        </h2>
        <form onSubmit={authenticateUser}>
            <input type="text" placeholder="username" name="username" defaultValue="Dev"/>
            <input type="password" placeholder="password" name="password" defaultValue=""/>
            {authenticated === mutations.AUTH_FAILURE ? <p> Login incorrect </p> : null}
            <button type="submit">Login</button>
        </form>
    </div>
}

const mapStateToProps = ({session}) => ({
    authenticated: session.authenticated
});

const mapDispatchToProps = (dispatch) => ({
    authenticateUser(ev) {
        ev.preventDefault();
        let username = ev.target[`username`].value;
        let password = ev.target[`password`].value;
        dispatch(mutations.requestAuthenticateUser(username, password));
    }
});

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);