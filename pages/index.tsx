import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useAuth } from '../hooks/useAuth';
import { useAuthGuard } from '../hooks/useAuthGuard'
import { useRouter } from 'next/router';

export default function Home() {
  let auth: any;
  const router = useRouter();
  

  if(router){
    auth = useAuthGuard;
  }else{
    auth = useAuth();
  }
  

  return (
    <>
      <Head>
        <title id="page-title">Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      { auth.user === 'loading' && 
        <>
        </>
      }
      { ((auth.user && auth.user !== 'loading') || !auth) &&
        <>
        </>
      }
    </>
  )
}
