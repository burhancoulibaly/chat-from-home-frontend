export default function EmailChangeForm({onSubmit, formErrors, ...props}) {
    return (
        <>
            <form id="emailChange" onSubmit={(e) => onSubmit(e)} data-testid="form">
            <div className="form-group">
                <label htmlFor="email">New Email</label>
                <input type="email" className={`form-control ${formErrors.email ? "error" : ""}`} id="email" placeholder="Email"></input>
            </div>
            <div className="form-group">
                <label htmlFor="confirmEmail">Confirm Email</label>
                <input type="email" className={`form-control ${formErrors.confirm ? "error" : ""}`} id="confirmEmail" placeholder="Email"></input>
            </div>
            <button type="submit" title="changeEmail" className="btn btn-primary">Change Email</button>
            </form>

            <div className="errors-container">
                {formErrors.email && <h6 className="error-text">{formErrors.email}</h6>}
                {formErrors.confirm && <h6 className="error-text">{formErrors.confirm}</h6>}
                {formErrors.response && <h6 className="response-text">{formErrors.response}</h6>}
            </div>
        </>
    )
}