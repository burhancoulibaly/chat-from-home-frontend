import Link from 'next/link';
import '../styles/room.module.css';

export default function RoomContent({ auth, ...props}){

    return(
        <>
            <div className="roomContainer">
                <div className="left-side-menu">
                    <div className="owner-profile-pic">
                        
                    </div>

                    <div className="menu-options">
                        <div className="directs">
                            <i className="fas fa-comment-dots"></i>
                        </div>
                        <div className="users">
                            <i className="fas fa-users"></i>
                        </div>
                        <div className="start-cam">
                            <i className="fas fa-video"></i>
                        </div>
                    </div>

                    <div className="home-btn">
                        <i className="fas fa-home"></i>
                    </div>
                </div>
                <div className="content">
                    <div className="cam-window"></div>
                    <div className="cam-window"></div>
                    <div className="cam-window"></div>
                    <div className="cam-window"></div>
                    <div className="cam-window"></div>
                    <div className="cam-window"></div>
                </div>
                <div className="right-side-menu">
                    <div className="room-name">
                        <h1>Room Name</h1>
                    </div>
                    <div className="chat-box">

                    </div>
                    <div className="user-input">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Type a message" aria-label="type-message" aria-describedby="message"></input>
                            <div className="input-group-append">
                                <span className="input-group-text" id="message"><i className="fas fa-paper-plane"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}