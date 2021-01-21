import Image from 'next/image';
import '../styles/passwordreset.module.css';
import PasswordResetForm from '../components/passwordResetForm';
import { useAuthGuard } from '../hooks/useAuthGuard';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { PASSWORDRESET } from '../graphql-queries/auth-queries';
import { confirmPassword } from '../lib/formValidator';
import { useValidation } from '../hooks/useValidationTest';

export default function PasswordReset() {
    const auth = useAuthGuard();
    const router = useRouter();
    const validate = useValidation();
    const [passwordReset, { error: passwordResetError, loading: passwordResetLoading, data: passwordResetData }] = useMutation(PASSWORDRESET);

    const validateForm = (password1: string, password2: string) => {
        let isValid: boolean = true;
        const errors = {
            password: null,
            confirm: null
        }

        if(!password1){
            errors.password = "Please enter a valid password"

            isValid = false;
        }

        if(!confirmPassword(password1, password2) || !password1 || !password2){
            errors.confirm = "Passwords must match";

            isValid = false;
        }

        validate.setFormErrors({
            ...validate.formErrors,
            password: errors.password,
            confirm: errors.confirm
        })

        return isValid;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        validate.setFormErrors({
            password: null,
            confirm: null,
            response: null
        })

        const token = auth ? await auth.getIdToken() : null;
        const email = auth ? auth.userInfo().email : null;
        const password1 = e.target[0].value;
        const password2 = e.target[1].value;

        const isValid: boolean = validateForm(password1, password2);
        
        if(!isValid){
            return;
        }

        if(password1 === password2){
            passwordReset({
                variables: {
                    idToken: token,
                    email: email,
                    password: password1
                }
            })
        }
    }

    useEffect(() => {
        validate.setFormErrors({
            ...validate.formErrors,
            username: null, 
            email: null, 
            password: null, 
            confirm: null, 
            response: null
        })
    }, [router.pathname])

    // <--------------------------------Password-Reset--------------------------------> 
    useEffect(() => { 
        if(passwordResetError){
            console.log(passwordResetError)
        }

        if(passwordResetData){
            if(passwordResetData.passwordReset.status != "Error"){
                auth.signInWithCustomToken(passwordResetData.passwordReset.accessToken);

                router.push('/');
            }else{
                validate.setFormErrors({
                    ...validate.formErrors,
                    response: passwordResetData.passwordReset.message
                })

                console.log(passwordResetData.passwordReset)
            }
        }
        
    }, [passwordResetError, passwordResetData])

    return(
        <>
        { auth.user === 'loading' && 
            <>
            </>
        }
        { (auth.user !== 'loading' && (auth.user || Object.values(auth.user).length)) &&
            <div className="passwordResetBoxBackground">
                <Image src="/images/luke-chesser-B_oL3jEt5L4-unsplash.jpg" unoptimized={false} alt="Password Reset page background image" layout="fill" objectFit="cover"/>
                
                <div className="passwordResetBox">
                    <h1 role="title">Reset Password</h1>
                    <PasswordResetForm
                        onSubmit={handleSubmit}
                        formErrors={validate.formErrors} 
                    />
                </div>
            </div>
        }
      </>
    )
}