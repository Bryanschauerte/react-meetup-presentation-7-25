import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import { connect } from 'react-redux';
import {
    getLoggedIn,
    getErrors } from './viewState';
import {
    userLoginFail,
    userLoginSuccess
} from './actions';
import LoginUser from './views/LoginUser';
import NewUser from './views/NewUser';
import Column from '../Layout/Column';
import Card from '../Layout/Card';
import { getViewStates } from '../StateConfig/viewStates';
import LoginButtons from './Elements/LoginButtons';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            view: 'sign_in'
        };
        this.renderView = this.renderView.bind(this);
        this.changeView = this.changeView.bind(this);
    }

    changeView(viewChange){
        this.setState({ view:viewChange, error: null });
    }

    renderView(){

        switch (this.state.view) {
            case 'sign_in':
                return (
                    <LoginUser
                        onLoginSuccess={this.props.onLoginSuccess}
                        onLoginFail={this.props.onLoginFail}/>);
            case 'new_user':
                return (
                    <NewUser onLoginSuccess={this.props.onLoginSuccess}/>);
            default:
                return (<LoginUser
                    onLoginSuccess={this.props.onLoginSuccess}
                    onLoginFail={this.props.onLoginFail}/>);
        }
    }

    render() {

        if (!this.props.loggedIn){
            return (
                <Column>
                    <Card className="login-base" headerComponent={<LoginButtons
                            currentView={this.state.view}
                            changeView={this.changeView}/>}>
                        { this.renderView() }
                        {this.props.getErrors && this.state.view === 'sign_in'
                            && <div className="error">
                                {this.props.getErrors.message}
                            </div>}
                    </Card>
                </Column>);
        } else {
            return (<div><h1>Logged IN!</h1></div>);
        }
    }

}
const mapStateToProps = (state) => {
    console.log(state, 'state at login');

    return {

        getErrors: getErrors(state),
        getViewStates: getViewStates(state),
        loggedIn: getLoggedIn(state)
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onLoginFail: (err) => dispatch(userLoginFail(err)),
        onLoginSuccess: (user) => dispatch(userLoginSuccess(user))
    };
};

Login.propTypes = {
    history: PropTypes.any,
    loggedIn: PropTypes.bool,
    onCreateUser: PropTypes.func,
    onLoginFail:PropTypes.func,
    onLoginSuccess: PropTypes.func,
    onUpdateConfirmPassword: PropTypes.func,
    onUpdateEmail: PropTypes.func,
    onUpdatePassword: PropTypes.func,
    onUserLogin: PropTypes.func,
    password: PropTypes.string,
    replace: PropTypes.func,
    view: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
