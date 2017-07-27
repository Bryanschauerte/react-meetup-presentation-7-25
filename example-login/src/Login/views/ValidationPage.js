import React, { PropTypes } from 'react';

const ValidationPage = ({ handleSubmit, resend, onUpdateUserValidationCode, canSubmit }) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label className="login-section-title">Enter your validation Code from the email you submitted</label>
                <input
                    placeHolder="Enter Validation Code"
                    type="text"
                    onChange={onUpdateUserValidationCode.bind(this)} />
                <button disabled={!canSubmit} onClick={handleSubmit}>Submit</button>
            </form>
            <button onClick={()=>resend}>Resend the vallidation code</button>
        </div>);
};

ValidationPage.propTypes = {
    canSubmit: PropTypes.bool,
    handleSubmit: PropTypes.func,
    onUpdateUserValidationCode: PropTypes.func,
    resend: PropTypes.func
};

export default ValidationPage;
