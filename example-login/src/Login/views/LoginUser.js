import React, {
    Component,
    PropTypes } from 'react';
import { signIn } from '../../utilities/cognito/utils';
import './LoginUser.css'

class LoginUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: 'bryan.schauerte@gmail.com',
            password: 'Yellow1!',
            user: null
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleEmailChange(e){
        this.setState({
            email: e.target.value
        });
    }
    handlePasswordChange(e){
        this.setState({
            password: e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        signIn(this.state.email, this.state.password).then(
            res => {
                this.setState({
                    user: res
                });
                this.props.onLoginSuccess(res);
                console.log(res, 'success');
            }, err => {
            console.log(err, 'FAil');
            this.props.onLoginFail(err);
        });
    }

    render(){

        return (
            <div className="loginFormContainer">
                <h1 className="login-section-title">Login</h1>
                <div>
                    <form className="loginForm">
                        <input
                            type="text"
                            placeholder="Enter your Email"
                            onChange ={this.handleEmailChange}/>
                        <input
                            type="text"
                            placeholder="Enter Password"
                            onChange ={this.handlePasswordChange} />
                        {this.state.email && this.state.password ?
                            <button
                            type="text"
                            onClick ={this.handleSubmit}>
                                submit
                        </button>
                            : null }
                    </form>
                </div>
            </div>
        );
    }

}

LoginUser.propTypes = {
    onLoginFail: PropTypes.func,
    onLoginSuccess: PropTypes.func,
    onSubmit: PropTypes.func
};

export default LoginUser;
