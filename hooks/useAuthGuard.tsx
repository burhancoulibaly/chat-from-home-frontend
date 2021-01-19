import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './useAuth';
import { route } from 'next/dist/next-server/server/router';

export const useAuthGuard = () => {
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!auth || !auth.user) {
            //Add processing here
            if(router.pathname === '/passwordreset' || router.pathname === '/account'){
                router.push('/login')
            }
        }else if(auth.user !== "loading"){
            if(router.pathname === '/login' || router.pathname === '/signup'){
                router.push('/')
            } 
        }
    }, [auth, router]);

    return auth;
};