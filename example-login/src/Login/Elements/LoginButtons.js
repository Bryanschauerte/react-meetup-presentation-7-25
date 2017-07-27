import React from 'react';
import PropTypes from 'prop-types';
import './loginButtons.css';

const LoginButtons = ({ changeView, currentView }) =>{

    return (
        <div>
            { currentView !== 'sign_in'?
                <button onClick={()=>changeView('sign_in')}>
                    Sign in
                </button>
                :<button onClick={()=>changeView('new_user')}>
                    new User
                </button>
            }
        </div>
    );
};
LoginButtons.propTypes = {
    changeView: PropTypes.func,
    currentView: PropTypes.string
};

export default LoginButtons;
