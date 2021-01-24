import Image from 'next/image';
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
      <Image src="/images/luke-chesser-3rWagdKBF7U-unsplash(1).jpg" unoptimized={false} alt="account-page-background" layout="fill" objectFit="cover"/>
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
