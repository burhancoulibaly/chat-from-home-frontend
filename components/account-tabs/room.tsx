import React, { useState } from "react";
import '../../styles/room.module.css';
import Switch from "react-switch";

export default function Room({ setPassword, clearPassword, ...props }){
    const [checked, toggle] = useState({isChecked: false});

    const handleToggle = () => {
        toggle({
            ...toggle,
            isChecked: !checked.isChecked
        })
    }

    return (
        <div id="room-tab">
            <h1>Room Name</h1>

            <div className="mods-n-banned">
                <div className="mods-container">
                    <h4>Moderators</h4>

                    <div className="mods-list">
                        <div className="mod">mod_1</div>
                        <div className="mod">mod_1</div>
                        <div className="mod">mod_1</div>
                    </div>
                </div>
                

                <div className="banned-container">
                    <h4>Banned Users</h4>

                    <div className="banned-list">
                        <div className="banned">banned_user_1</div>
                    </div>
                </div>
            </div>

            <div className="room-pass-form">
                <form id="pass-input" data-testid="form">
                    <div className="form-group">
                        <label htmlFor="room-pass"><h4>Room Password</h4></label>
                        <input 
                            type="password" 
                            className={`form-control`}
                            id="room-pass" 
                            placeholder="Room Password">
                        </input>
                    </div>
                    <div className="room-pass-btns">
                        <button onClick={(e) => setPassword(e)} className="btn btn-primary">Set Password</button>
                        <button onClick={(e) => clearPassword(e)} className="btn btn-primary">Clear</button>
                    </div>
                </form>
            </div>

            <div className="private-toggle">
                <h4>Private</h4>

                <label>
                    <Switch onChange={handleToggle} checked={checked.isChecked} />
                </label>
            </div>
        </div>
    )
}