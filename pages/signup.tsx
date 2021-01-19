import Image from 'next/image';
import SignupForm from '../components/signupForm';
import '../styles/signup.module.css';
import { useAuthGuard } from '../hooks/useAuthGuard';
import { useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { REGISTER } from '../graphql-queries/auth-queries';
import { useValidation } from '../hooks/useValidationTest';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Signup() {
    const auth = useAuthGuard();
    const router = useRouter();
    const validate = useValidation();
    const [register, { error: registerError, loading: registerLoading, data: registerData }] = useMutation(REGISTER);

    const handleSubmit = (e) => {
        e.preventDefault();

        validate.setFormErrors({
            ...validate.formErrors,
            username: null, 
            email: null, 
            password: null, 
            confirm: null, 
            response: null 
        })

        const username = e.target[0].value;
        const email = e.target[1].value;
        const password1 = e.target[2].value;
        const password2 = e.target[3].value;

        const isValid: boolean = validate.validateFormSignUp(username, email, password1, password2);
        
        if(!isValid){
            return;
        }

        if(password1 === password2){
            register({
                variables: {
                    username: username,
                    email: email,
                    password: password1
                }
            })
        }
    }

    // <--------------------------------Register--------------------------------> 
    useEffect(() => { 
        if(registerError){
            console.log(registerError)
        }

        if(registerData){
            if(registerData.register.status != "Error"){
                auth.signInWithCustomToken(registerData.register.accessToken);

                router.push('/');
            }else{
                validate.setFormErrors({
                    ...validate.formErrors,
                    response: registerData.register.login.message
                })

                console.log(registerData.register);
            }
            
        }
        
    }, [registerError, registerData])

    return (
      <>
        <Head>
            <title>Signup</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        { auth.user === 'loading' && 
            <>
            </>
        }
        { (auth.user !== 'loading' && (!auth.user || !Object.values(auth.user).length)) &&
            <div className="signupBoxBackground">
                <Image src="/images/vadim-sherbakov-RcdV8rnXSeE-unsplash(1).jpg" unoptimized={false} alt="Login/Signup page background image" layout="fill" objectFit="cover"/>
                
                <div className="signupBox">
                    <div className="leftSide">
                        <h1 role="title">Signup</h1>
                        <SignupForm
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