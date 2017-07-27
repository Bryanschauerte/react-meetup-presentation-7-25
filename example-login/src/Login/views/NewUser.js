import React, {
    Component,
    PropTypes } from 'react';
import {
    confirmUserCode,
    signUp
} from '../../utilities/cognito/utils.js';

class NewUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            confirmationCode:'',
            email: '',
            password: '',
            submitted: false,
            user: null
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfimationCodeChange = this.handleConfimationCodeChange.bind(this);
        this.renderConfirmPage = this.renderConfirmPage.bind(this);
        this.renderSignUpPage = this.renderSignUpPage.bind(this);
        this.submitForNewUser = this.submitForNewUser.bind(this);
        this.submitConfimationCodeCode = this.submitConfimationCodeCode.bind(this);

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

    handleConfimationCodeChange(e){
        e.preventDefault();
        this.setState({
            confirmationCode: e.target.value
        });
    }

    submitConfimationCodeCode(e){
        e.preventDefault();
        confirmUserCode(this.state.user, this.state.confirmationCode).then(
            res => this.props.onLoginSuccess(res),
            error => this.setState({ error })
        );
    }

    submitForNewUser(e){
        e.preventDefault();
        signUp(this.state.email, this.state.password).then(
            res => {
                this.setState({
                    user: res
                });

                console.log(res, 'res yes');
            }, error => {
                this.setState({ error })
            console.log(error, 'error');
        }
        );
    }

    renderConfirmPage(){
        return (
            <div>
                <h1 className="login-section-title">Confirmation page</h1>
                <p>Please Enter Verification code sent to {this.state.email}</p>
                <div>
                    <form>
                        <input
                            type="text"
                            placeholder="Confirm Code"
                            onChange ={this.handleConfimationCodeChange}/>
                        <button
                            type="text"
                            onClick ={this.submitConfimationCodeCode}>
                                submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    renderSignUpPage(){

        return (
            <div>
                <h1 className="login-section-title">NewUser</h1>
                <div>
                    <form>
                        <input
                            type="text"
                            placeholder="Enter your Email"
                            onChange ={this.handleEmailChange}/>
                        <input
                            type="text"
                            placeholder="Enter desired Password"
                            onChange ={this.handlePasswordChange} />
                        {this.state.email && this.state.password ?
                            <button
                            type="text"
                            onClick ={this.submitForNewUser}>
                                submit
                        </button>
                            : null }
                        {this.state.error &&
                            <div className="error">
                                {this.state.error.message}
                            </div>}

                    </form>
                </div>
            </div>
        );
    }

    render(){
        return (
            <div>
                {
                    this.state.user
                        ? this.renderConfirmPage() : this.renderSignUpPage()
                }
            </div>
        );
    }

}

NewUser.propTypes = {
    onLoginSuccess: PropTypes.func,
    canSubmit: PropTypes.bool,
    onSubmit: PropTypes.func,
    onUpdateConfirmPassword: PropTypes.func,
    onUpdateEmail: PropTypes.func,
    onUpdatePassword: PropTypes.func
};

export default NewUser;
