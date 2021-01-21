import Image from 'next/image';
import '../styles/account.module.css';
import { useAuthGuard } from '../hooks/useAuthGuard';
import { useState } from 'react';
import AccountContent from '../components/accountContent';

export default function Account(){
    const auth = useAuthGuard();
    const [accountTab, setAccountTab] = useState({tab: "room"});

    const switchTab = (e) => {
        e.preventDefault();

        const tab = e.target.textContent

        switch(tab) { 
            case "Room": { 
               setAccountTab({
                   ...accountTab,
                   tab: "room"
               })
               break; 
            } 
            case "Followers": { 
                setAccountTab({
                    ...accountTab,
                    tab: "followers"
                })
                break; 
             }
             case "Following": { 
                setAccountTab({
                    ...accountTab,
                    tab: "following"
                })
                break; 
             } 
             case "Security": { 
                setAccountTab({
                    ...accountTab,
                    tab: "security"
                })
                break; 
             } 
             case "Logout": { 
                setAccountTab({
                    ...accountTab,
                    tab: "logout"
                })
                break; 
             }  
            default: { 
               console.log("Passed event does not have a valid target") 
               break; 
            } 
        } 
    }

    return (
        <>
            { (!auth || !auth.user) &&
                <>
                </>
            }
            { (auth && auth.user && auth.user !== "loading") && 
                <AccountContent
                    accountTab={accountTab}
                    switchTab={switchTab}
                />
            }
        </>
    )
}