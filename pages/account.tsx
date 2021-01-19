import { useAuthGuard } from '../hooks/useAuthGuard';

export default function Account(){
    const auth = useAuthGuard();

    return (
        <>
            { (!auth || !auth.user) &&
                <>
                </>
            }
            { (auth && auth.user && auth.user !== "loading") && 
                <div>
                    <h1 className="text-center mt-5">{ auth.userInfo().username }</h1>
                </div>
            }
        </>
    )
}