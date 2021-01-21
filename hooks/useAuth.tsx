import { Context } from 'react';
import { useState, useEffect, useContext, createContext, ReactNode, useMemo } from 'react';
import { auth, db } from '../config/firebase';


const authContext = createContext({ user: {}, userInfo: null, getIdToken: null, signInWithCustomToken: null, signout: null });
const { Provider } = authContext;

export function AuthProvider(props: { children: ReactNode, authProvider: any }): JSX.Element {
    const providedAuth:any = props.authProvider ? props.authProvider : useAuthProvider();

    return <Provider value={providedAuth}>{props.children}</Provider>;
}

const useAuthProvider = () => {
    const [user, setUser]: any = useState('loading');

    // console.log(user)
    // console.log(user ? user.email : null);

    useEffect(() => {                 
        const unsub = auth.onAuthStateChanged(handleAuthStateChanged);

        return async() => unsub();
    }, []);

    const handleAuthStateChanged = async(user) => {
        setUser(user);

        const userDB = auth.app.firestore();

        try {
            if(user){
                let userResponse = await (await userDB.collection('user').doc(user.uid).get()).data();
            
                if(userResponse){
                    return setUser({
                        ...user,
                        email: userResponse.email
                    })
                }

                console.log("User not found")
            }

            console.log("User is undefined");
            
        } catch (error) {
            console.log(error);
        }
    };

    const userInfo = () => {
        if(user){
            return {
                username: user.uid,
                email: user.email
            }
        }
        
        return null;
    }

    const getIdToken = async() => {
        return await auth.currentUser.getIdToken(true);
    }

    const signInWithCustomToken = async(token) => {
        try {
            return setUser(await (await auth.signInWithCustomToken(token)).user)     
        } catch (error) {
            return error
        }
    }

    const signout = async() => {
        try {
            await auth.signOut();
            setUser(false);
        } catch (error) {
            return error;
        }
    }

    return {
        user,
        userInfo,
        getIdToken,
        signInWithCustomToken,
        signout
    }
}

export const useAuth = () => {
    return useContext(authContext);
}