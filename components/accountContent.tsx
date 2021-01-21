import Image from 'next/image';
import '../styles/account.module.css';
import { useAuthGuard } from '../hooks/useAuthGuard';
import { useState } from 'react';
import React from 'react';
import Room from './account-tabs/room';

export default function AccountContent({ accountTab, switchTab, ...page }){
    
    const setPassword = (e) => {
        e.preventDefault();
        console.log(e)
    }

    const clearPassword = (e) => {
        e.preventDefault();
        console.log(e)
    }

    return (
        <div id="account">
            {/* <h1 className="text-center mt-5">{ auth.userInfo().username }</h5> */}
            <Image src="/images/luke-chesser-3rWagdKBF7U-unsplash(1).jpg" unoptimized={false} alt="account-page-background" layout="fill" objectFit="cover"/>
            <div className="container">
                <div className="account-name-container">
                    <div className="side-menu">
                        <div className="top">
                            <div className="user-info">
                                <div className="profile-image"></div>
                            </div>
                            <div className="presence">
                                <div className="username"><h4>Username</h4></div>
                                <h6>Followers: 50k</h6>
                                <h6>Following: 30k</h6>
                            </div>
                        </div>
                        <div className="menu-buttons">
                            <div className={`menu-btn room ${accountTab.tab === "room" ? "active" : ""}`}>
                                <button onClick={(e) => switchTab(e)}>
                                    <h5>Room</h5>
                                </button>           
                            </div>
                            <div className={`menu-btn followers ${accountTab.tab === "followers" ? "active" : ""}`}>
                                <button onClick={(e) => switchTab(e)}>
                                    <h5>Followers</h5>
                                </button>
                            </div>
                            <div className={`menu-btn following ${accountTab.tab === "following" ? "active" : ""}`}>
                                <button onClick={(e) => switchTab(e)}>
                                    <h5>Following</h5>
                                </button>   
                            </div>
                            <div className={`menu-btn security ${accountTab.tab === "security" ? "active" : ""}`}>
                                <button onClick={(e) => switchTab(e)}>
                                    <h5>Security</h5>
                                </button> 
                            </div>
                            <div className={`menu-btn logout ${accountTab.tab === "logout" ? "active" : ""}`}>
                                <button onClick={(e) => switchTab(e)}>
                                    <h5>Logout</h5>
                                </button> 
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        {accountTab.tab === "room" &&
                            <>
                                <Room
                                    setPassword={setPassword}
                                    clearPassword={clearPassword}
                                />
                            </>
                        }
                        {accountTab.tab === "followers" && 
                            <>
                                <h1>Followers</h1>
                            </>
                        }
                        {accountTab.tab === "following" &&
                            <>
                                <h1>Following</h1>
                            </>
                        }
                        {accountTab.tab === "security" &&
                            <>
                                <h1>Security</h1>
                            </>
                        }
                        {accountTab.tab === "logout" &&
                            <>
                                <h1>Logout</h1>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}