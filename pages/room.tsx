import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import '../styles/room.module.css';
import { useAuthGuard } from '../hooks/useAuthGuard';
import React, { useEffect, useState } from 'react';
import RoomContent from '../components/roomContent';

export default function Room({ ...props }){
    const auth = useAuthGuard();
    const router = useRouter();

    return (
        <>
            <div id="room">
                <RoomContent
                    auth={auth}
                />
            </div>
        </>
    )
}