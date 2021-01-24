import Link from 'next/link';
import '../../styles/security.module.css';

export default function Security({ auth, ...props }){

    return (
        <>
            <div id="security">
                <h1>Security</h1>

                <div className="security-opts">
                    <div className="btns">
                        <Link href="/emailchange">
                            <button className="change-email btn btn-primary">Change Email</button>
                        </Link>
                        <Link href="/passwordreset">
                            <button className="change-pass btn btn-primary">Reset Password</button>
                        </Link>
                        <button onClick={(e) => { e.preventDefault(); return auth.signout()}} className="logout btn btn-danger">Logout</button>
                    </div>
                </div>
            </div>
        </>
    )
}
