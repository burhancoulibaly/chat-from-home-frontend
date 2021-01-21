import React from 'react';
import Link from 'next/link';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/dist/client/router';
import '../styles/topNav.module.css';

export default function TopNav() {
    const auth = useAuth();
    const router = useRouter();

    return(
        <>
            <div id="top-nav">
                <h5>Chat From Home</h5>

                <div className="nav-items">
                    <div className="nav-links">
                    <button className={`btn btn-primary top-nav-button ${router.pathname === "/" ? "active" : ""}`}>
                        <Link href="/">
                            <a className="btn" href="#">
                                Home
                            </a>
                        </Link>
                    </button>
                    <button className={`btn btn-primary top-nav-button ${router.pathname === "/rooms" ? "active" : ""}`}>
                        <Link href="/rooms">
                            <a className="btn" href="#">
                                Rooms
                            </a>
                        </Link>
                    </button>
                    </div>
                    { (!auth || !auth.user) &&
                        <>
                            <Link href="/login">
                                <a className="btn" href="#">
                                    <button className={`btn btn-primary top-nav-button ${router.pathname === "/login" ? "active" : ""}`}>Login</button>
                                </a>
                            </Link>
                            <Link href="/signup">
                                <a className="btn" href="#">
                                    <button className={`btn btn-primary top-nav-button ${router.pathname === "/signup" ? "active" : ""}`}>Signup</button>
                                </a>
                            </Link>
                        </>
                    }
                    { (auth && auth.user && auth.user !== "loading") && 
                        <DropdownButton id="dropdown-basic-button" title={ auth.userInfo().username }>
                            <Dropdown.Item href="/account" className={`btn btn-primary top-nav-button ${router.pathname === "/account" ? "active" : ""}`}>My Account</Dropdown.Item>
                            <Dropdown.Item href="#" onClick={(e) => { e.preventDefault(); return auth.signout()}}>Logout</Dropdown.Item>
                        </DropdownButton>
                    }
                </div>      
            </div>
        </>
    )
}