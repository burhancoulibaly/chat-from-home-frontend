import '../../styles/followers.module.css';

export default function Followers({ ...props }){

    return (
        <>
            <div id="followers">
                <h1>Followers</h1>

                <div className="followers-list">
                    <div className="user-following"><h5>follower_1</h5></div>
                    <div className="user-following"><h5>follower_1</h5></div>
                    <div className="user-following"><h5>follower_1</h5></div>
                    <div className="user-following"><h5>follower_1</h5></div>
                </div>
            </div>
        </>
    )
}