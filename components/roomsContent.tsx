import Link from 'next/link';
import '../styles/rooms.module.css';

function LiveRooms({ roomsState, ...props }){
    const liveRooms = roomsState.rooms.map((room, index) => {
        return <div key={index} className="live-room">{index}</div>
    });
    
    return (
        <>
            {liveRooms}
        </>
    )
}

export default function RoomsContent({ auth, scrollBottom, roomsState, ...props }){
    return (
        <>
            <div className="room-heading">
                <h1>Rooms</h1>
                <div className="room-options">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search for room" aria-label="room-search" aria-describedby="search"></input>
                        <div className="input-group-append">
                            <span className="input-group-text" id="search"><i className="fas fa-search"></i></span>
                        </div>
                    </div>

                    <div className="btn btn-primary filter"><i className="fas fa-sliders-h"></i></div>
                </div>
            </div>

            <div className="rooms-container">  
                <LiveRooms
                    roomsState={roomsState}
                />
            </div>

            {roomsState.loading && 
                <div className="loading-rooms">
                    <h3>...Loading</h3>
                </div>
            }
        </>
    )
}