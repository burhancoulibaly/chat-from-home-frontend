import '../../styles/following.module.css';

export default function Following({ ...props }){

    return (
        <>
            <div id="following">
                <h1>Following</h1>

                <div className="following-list">
                    <div className="followed-user"><h5>following_1</h5></div>
                    <div className="followed-user"><h5>following_1</h5></div>
                    <div className="followed-user"><h5>following_1</h5></div>
                </div>
            </div>
        </>
    )
}