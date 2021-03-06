import Link from 'next/link';

export default function SignupForm({onSubmit, formErrors, ...props}) {
    return(
        <>
            <form id="signup" onSubmit={(e) => onSubmit(e)} data-testid="form">
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className={`form-control ${formErrors.username ? "error" : ""}`} id="username" placeholder="Enter username"></input>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className={`form-control ${formErrors.email ? "error" : ""}`} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className={`form-control ${formErrors.password ? "error" : ""}`} id="password" placeholder="Password"></input>
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" className={`form-control ${formErrors.confirm ? "error" : ""}`} id="confirmPassword" placeholder="Password"></input>
            </div>
            <button type="submit" title="signupButton" className="btn btn-primary">Signup</button>
            </form>

            <div className="errors-container">
                {formErrors.username && <h6 className="error-text">{formErrors.username}</h6>}
                {formErrors.email && <h6 className="error-text">{formErrors.email}</h6>}
                {formErrors.password && <h6 className="error-text">{formErrors.password}</h6>}
                {formErrors.confirm && <h6 className="error-text">{formErrors.confirm}</h6>}
                {formErrors.response && <h6 className="response-text">{formErrors.response}</h6>}
            </div>

            <p className="login-link">
                {"Already have an account? "}
                <Link href="/login">
                    <a href="#" className="text-blue-500">
                        Login
                    </a>
                </Link>
            </p>
        </>
    )
}