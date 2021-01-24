import { MockedProvider } from "@apollo/client/testing";
import { createEvent, fireEvent, render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import React, { ReactNode } from "react";
import { AuthProvider, useAuth } from "../hooks/useAuth";
import MockRouter from "../lib/mockRouter";
import EmailChange from "../pages/emailchange";
import { confirmEmail,  validateEmail } from "../lib/formValidator";
import EmailChangeForm from "../components/emailChangeForm";
import { ValidationProvider } from "../hooks/useValidationTest";

const formErrors = {
    email: null,
    confirm: null,
    response: null
}

const user = {
    uid: "test_user",
    email: "test_user@gmail.com"
}

const authProvider = {
    user: user,
    userInfo: () => {
        return {
            username: user.uid,
            email: user.email
        }
    }, 
    getIdToken: null, 
    signInWithCustomToken: null, 
    signout: null  
}

const validateFormEmailChange = (email1: string, email2: string) => {
    let isValid: boolean = true;

    const errors = {
      email: null,
      confirm: null
    }

    if(!validateEmail(email1) || !email1){
      errors.email = "Please enter a valid email";

      isValid = false;
    }

    if(!confirmEmail(email1, email2) || !email1 || !email2){
      errors.confirm = "Emails must match";

      isValid = false;
    }
  
    return isValid;
}

beforeAll(() => {
    
})


describe("Email Change", () => {
    it('Testing email change page', () => {
        const { queryByRole } = render(
            <MockedProvider>
                <AuthProvider authProvider={ authProvider }>
                    <MockRouter path="/login">
                        <ValidationProvider>
                            <EmailChange/>
                        </ValidationProvider>
                    </MockRouter>
                </AuthProvider>
            </MockedProvider>
        )

        expect(queryByRole('title')).toHaveTextContent('Change Email');
    });
});

describe("Login form validation", () => {
    it("Submit completes with valid inputs", async() => {
        let isValid;
        let submitData = null;
    
            const handleSubmit = jest.fn((e) => {
                isValid = validateFormEmailChange(e.target[0].value, e.target[1].value);

                if(isValid){
                    submitData = e.target;
                }   
        
            return
        })
    
        const { getByLabelText, getByTitle, getByText, getByTestId } = render(
            <MockedProvider>
                <AuthProvider authProvider={ authProvider }>
                    <MockRouter path="/login">
                        <EmailChangeForm
                            onSubmit={handleSubmit}
                            formErrors={formErrors}
                        />
                    </MockRouter>
                </AuthProvider>
            </MockedProvider>
        )
    
        const emailInput: any  = getByLabelText("New Email");
        const confirmEmailInput: any  = getByLabelText("Confirm Email");
        const changeEmailButton: any  = getByTitle("changeEmail");
        
        expect(emailInput);
        expect(confirmEmailInput);
        expect(changeEmailButton);
    
        emailInput.value = 'test_email@gmail.com';
        confirmEmailInput.value = 'test_email@gmail.com';

        fireEvent.change(emailInput);
        expect(emailInput.value).toBe('test_email@gmail.com')
    
        fireEvent.change(confirmEmailInput);
        expect(confirmEmailInput.value).toBe('test_email@gmail.com')
    
        const submit = getByTestId("form")
    
        const submitEvent = createEvent.submit(submit, {
            target: [emailInput, confirmEmailInput]
        })
    
        fireEvent.submit(submit, submitEvent);
        
        expect(isValid).toEqual(true);
        expect(submitData[0].value).toEqual(emailInput.value);
        expect(submitData[1].value).toEqual(confirmEmailInput.value);
    })

    it("Doesn't submit if there are errors in form input", async() => {
        let isValid;
        let submitData = null;
    
            const handleSubmit = jest.fn((e) => {
                isValid = validateFormEmailChange(e.target[0].value, e.target[1].value);

                if(isValid){
                    submitData = e.target;
                }   
        
            return
        })
    
        const { getByLabelText, getByTitle, getByText, getByTestId } = render(
            <MockedProvider>
                <AuthProvider authProvider={ authProvider }>
                    <MockRouter path="/login">
                        <EmailChangeForm
                            onSubmit={handleSubmit}
                            formErrors={formErrors}
                        />
                    </MockRouter>
                </AuthProvider>
            </MockedProvider>
        )

        const emailInput: any  = getByLabelText("New Email");
        const confirmEmailInput: any  = getByLabelText("Confirm Email");
        const changeEmailButton: any  = getByTitle("changeEmail");

        expect(emailInput);
        expect(confirmEmailInput);
        expect(changeEmailButton);
    
        emailInput.value = 'test_email@gmail.com';
        confirmEmailInput.value = 'test.email@gmail.com';

        fireEvent.change(emailInput);
        expect(emailInput.value).toBe('test_email@gmail.com')
    
        fireEvent.change(confirmEmailInput);
        expect(confirmEmailInput.value).toBe('test.email@gmail.com')
    
        const submit = getByTestId("form")
    
        const submitEvent = createEvent.submit(submit, {
            target: [emailInput, confirmEmailInput]
        })
    
        fireEvent.submit(submit, submitEvent);
        
        expect(isValid).toEqual(false);
        expect(submitData).toEqual(null);

        emailInput.value = 'test_email@g';
        confirmEmailInput.value = 'test_email@g';

        fireEvent.change(emailInput);
        expect(emailInput.value).toBe('test_email@g')
    
        fireEvent.change(confirmEmailInput);
        expect(confirmEmailInput.value).toBe('test_email@g')

        fireEvent.submit(submit, submitEvent);

        expect(isValid).toEqual(false);
        expect(submitData).toEqual(null);


        emailInput.value = '';
        confirmEmailInput.value = 'test.email@gmail.com';

        fireEvent.change(emailInput);
        expect(emailInput.value).toBe('')
    
        fireEvent.change(confirmEmailInput);
        expect(confirmEmailInput.value).toBe('test.email@gmail.com')

        fireEvent.submit(submit, submitEvent);

        expect(isValid).toEqual(false);
        expect(submitData).toEqual(null);

        emailInput.value = 'test_email@gmail.com';
        confirmEmailInput.value = '';

        fireEvent.change(emailInput);
        expect(emailInput.value).toBe('test_email@gmail.com')
    
        fireEvent.change(confirmEmailInput);
        expect(confirmEmailInput.value).toBe('')

        fireEvent.submit(submit, submitEvent);

        expect(isValid).toEqual(false);
        expect(submitData).toEqual(null);

        emailInput.value = '';
        confirmEmailInput.value = '';

        fireEvent.change(emailInput);
        expect(emailInput.value).toBe('')
    
        fireEvent.change(confirmEmailInput);
        expect(confirmEmailInput.value).toBe('')

        fireEvent.submit(submit, submitEvent);

        expect(isValid).toEqual(false);
        expect(submitData).toEqual(null);
    })
})