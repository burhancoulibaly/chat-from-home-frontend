import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import '../styles/rooms.module.css';
import { useAuthGuard } from '../hooks/useAuthGuard';
import React, { useEffect, useState } from 'react';
import RoomsContent from '../components/roomsContent';

export default function Rooms({ ...props }){
    const auth = useAuthGuard();
    const router = useRouter();
    const [scrollBottom, setScrollBottom] = useState({ isBottom: false });
    const [roomsState, setRoomsState] = useState({
        rooms: [
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
        ],
        loading: false
    })

    // console.log(scrollBottom);

    const getNewRooms = () => {
        return [
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
            { roomId: "", roomname: "", users: {}, thumbnail: "", roomOwner: "" },
        ]
    }

    const loadMoreRooms = async() => {
        let newRooms;

        setRoomsState({
            ...roomsState,
            loading: true
        })

        setTimeout(() => {
            newRooms = roomsState.rooms.concat(getNewRooms());

            setRoomsState({
                ...roomsState,
                loading: false
            })
    
            setRoomsState({
                ...roomsState,
                rooms: newRooms
            })
        }, 1000)
    }

    useEffect(() => {
        const handleWinScroll = () => {
            // console.log(window.scrollY + window.innerHeight,  document.body.scrollHeight)
            if((window.scrollY + window.innerHeight) >= document.body.scrollHeight){
                setScrollBottom({
                    ...scrollBottom,
                    isBottom: ((window.scrollY + window.innerHeight) >= document.body.scrollHeight)
                })
            }else{
                if(scrollBottom.isBottom){
                    setScrollBottom({
                        ...scrollBottom,
                        isBottom: ((window.scrollY + window.innerHeight) >= document.body.scrollHeight)
                    })
                }
            }
        }

        window.addEventListener('scroll', handleWinScroll);

        return () => {
            window.removeEventListener('scroll', handleWinScroll);
        };
    })

    useEffect(() => {
        if(scrollBottom.isBottom){
            loadMoreRooms();
        }
    }, [scrollBottom])

    return (
        <>
            <div id="rooms">
                <RoomsContent
                    auth={auth}
                    scrollBottom={scrollBottom}
                    roomsState={roomsState}
                />
            </div>
        </>
    )
}