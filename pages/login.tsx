import Image from 'next/image'
import LoginForm from '../components/loginForm'
import '../styles/login.module.css'
import { useAuthGuard } from '../hooks/useAuthGuard'
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { LOGIN } from '../graphql-queries/auth-queries';
import { useValidation } from '../hooks/useValidationTest';

export default function Login() {
    const auth = useAuthGuard();
    const router = useRouter();
    const [login, { error: loginError, loading: loginLoading, data: loginData }] = useLazyQuery(LOGIN);

    const validate = useValidation();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target)
        const username = e.target[0].value;
        const password = e.target[1].value;

        const isValid: boolean = validate.validateLoginForm(username, password);
        
        if(!isValid){
            return;
        }

        return login({
            variables: {
                username: username,
                password: password
            }
        })
    }

    // <--------------------------------Login--------------------------------> 
    useEffect(() => { 
        if(loginError){
            console.log(loginError)
        }

        if(loginData){
            if(loginData.login.status != "Error"){
                auth.signInWithCustomToken(loginData.login.accessToken);

                router.push('/');
            }else{
                validate.setFormErrors({
                    ...validate.formErrors,
                    response: loginData.login.message
                })

                console.log(loginData.login);
            }
        }

      }, [loginError, loginData])

    return (
      <>
        <Head>
            <title>Login</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        { auth.user === 'loading' && 
            <>
            </>
        }
        { (auth.user !== 'loading' && (!auth.user || !Object.values(auth.user).length))  &&
            <div className="loginBoxBackground">
                <Image src="/images/vadim-sherbakov-RcdV8rnXSeE-unsplash(1).jpg" unoptimized={false} alt="Login/Signup page background image" layout="fill" objectFit="cover"/>
                
                <div className="loginBox">
                    <div className="leftSide">
                        <h1 role="title">Login</h1>
                        <LoginForm 
                            onSubmit={handleSubmit}
                            formErrors={validate.formErrors}    
                        />
                    </div>
                    <div className="rightSide">

                        <Image src="/images/ilya-pavlov-IcclLmLQuw8-unsplash(1).jpg" unoptimized={false} alt="Login/Signup page background image" layout="fill" objectFit="cover"/>
                    </div>
                </div>
            </div>
        }
      </>
    )
}