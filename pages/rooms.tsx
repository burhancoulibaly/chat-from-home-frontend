import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import '../styles/rooms.module.css';
import { useAuthGuard } from '../hooks/useAuthGuard';

export default function Security({ ...props }){
    const auth = useAuthGuard();
    const router = useRouter();

    return (
        <>
        { auth.user === 'loading' && 
            <>
            </>
        }
        { (auth.user !== 'loading' && (auth.user || Object.values(auth.user).length)) &&
            <>
                <Image src="/images/luke-chesser-3rWagdKBF7U-unsplash(1).jpg" unoptimized={false} alt="account-page-background" layout="fill" objectFit="cover"/>

                <div id="rooms">

                </div>
            </>
        }
        </>
    )
}