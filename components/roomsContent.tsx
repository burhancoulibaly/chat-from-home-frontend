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
                    <h1>Filter/Search Options Here</h1>
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