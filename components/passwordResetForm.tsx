export default function PasswordResetForm({onSubmit, formErrors, ...props}) {
    return (
        <>
            <form id="passwordReset" onSubmit={(e) => onSubmit(e)} data-testid="form">
            <div className="form-group">
                <label htmlFor="password">New Password</label>
                <input type="password" className={`form-control ${formErrors.password ? "error" : ""}`} id="password" placeholder="Password"></input>
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" className={`form-control ${formErrors.confirm ? "error" : ""}`} id="confirmPassword" placeholder="Password"></input>
            </div>
            <button type="submit" title="passwordReset" className="btn btn-primary">Reset Password</button>
            </form>

            <div className="errors-container">
                {formErrors.password && <h6 className="error-text">{formErrors.password}</h6>}
                {formErrors.confirm && <h6 className="error-text">{formErrors.confirm}</h6>}
                {formErrors.response && <h6 className="response-text">{formErrors.response}</h6>}
            </div>
        </>
    )
}