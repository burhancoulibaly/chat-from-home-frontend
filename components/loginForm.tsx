import Link from 'next/link';
import '../styles/login.module.css'

export default function LoginForm({onSubmit, formErrors, ...props}) {
    return(
        <>
            <form id="login" onSubmit={(e) => onSubmit(e)} data-testid="form">
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input 
                    type="text" 
                    className={`form-control ${formErrors.username ? "error" : ""}`}
                    id="username" 
                    placeholder="Enter username"></input>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    className={`form-control ${formErrors.password ? "error" : ""}`}
                    id="password" 
                    placeholder="Password"></input>
            </div>
            <button type="submit" title="loginButton" className="btn btn-primary">Login</button>
            </form>

            <div className="errors-container">
                {formErrors.username && <h6 className="error-text">{formErrors.username}</h6>}
                {formErrors.password && <h6 className="error-text">{formErrors.password}</h6>}
                {formErrors.response && <h6 className="response-text">{formErrors.response}</h6>}
            </div>

            <p className="signup-link">
                {"Already have an account? "}
                <Link href="/signup">
                <a href="#" className="text-blue-500">
                    Signup
                    </a>
                </Link>
            </p>
        </>
    )
}

