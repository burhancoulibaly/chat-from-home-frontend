import Image from 'next/image';
import '../styles/emailchange.module.css';
import EmailChangeForm from '../components/emailChangeForm';
import { useAuthGuard } from '../hooks/useAuthGuard';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { EMAILCHANGE } from '../graphql-queries/auth-queries';
import { useValidation } from '../hooks/useValidationTest';

export default function EmailChange() {
    const auth = useAuthGuard();
    const router = useRouter();
    const validate = useValidation();
    const [emailChange, { error: emailChangeError, loading: emailChangeLoading, data: emailChangeData }] = useMutation(EMAILCHANGE);

    const handleSubmit = async(e) => {
        e.preventDefault();

        validate.setFormErrors({
            email: null,
            confirm: null,
            response: null
        })

        const token = auth ? await auth.getIdToken() : null;
        const email = auth ? auth.userInfo().email : null;
        const email1 = e.target[0].value;
        const email2 = e.target[1].value;

        const isValid: boolean = validate.validateFormEmailChange(email1, email2);
        
        if(!isValid){
            return;
        }

        emailChange({
            variables: {
                idToken: token,
                email1: email,
                email2: email1
            }
        })

        e.target[0].value = "";
        e.target[1].value = "";

        return;
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

    // <--------------------------------Email-Change--------------------------------> 
    useEffect(() => { 
        if(emailChangeError){
            console.log(emailChangeError)
        }

        if(emailChangeData){
            if(emailChangeData.emailChange.status != "Error"){
                auth.signInWithCustomToken(emailChangeData.emailChange.accessToken);

                validate.setFormErrors({
                    ...validate.formErrors,
                    response: emailChangeData.emailChange.message
                })
            }else{
                validate.setFormErrors({
                    ...validate.formErrors,
                    response: emailChangeData.emailChange.message
                })

                console.log(emailChangeData.emailChange)
            }
        }
        
    }, [emailChangeError, emailChangeData])

    return(
        <>
        { auth.user === 'loading' && 
            <>
            </>
        }
        { (auth.user !== 'loading' && (auth.user)) &&
            <div className="emailChangeBoxBackground">         
                <div className="emailChangeBox">
                    <h1 role="title">Change Email</h1>
                    <EmailChangeForm
                        onSubmit={handleSubmit}
                        formErrors={validate.formErrors} 
                    />
                </div>
            </div>
        }
      </>
    )
}