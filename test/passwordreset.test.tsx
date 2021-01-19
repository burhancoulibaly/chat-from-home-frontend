import { MockedProvider } from "@apollo/client/testing";
import { createEvent, fireEvent, render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import React, { ReactNode } from "react";
import { AuthProvider, useAuth } from "../hooks/useAuth";
import MockRouter from "../lib/mockRouter";
import PasswordReset from "../pages/passwordreset";
import { confirmPassword } from "../lib/formValidator";
import PasswordResetForm from "../components/passwordResetForm";

const formErrors = {
    password: null,
    confirm: null
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

const validateFormPasswordReset = (password1: string, password2: string) => {
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
  
    return isValid;
}

beforeAll(() => {
    
})


describe("Password Reset", () => {
    it('testing things', () => {
        const { queryByRole } = render(
            <MockedProvider>
                <AuthProvider authProvider={ authProvider }>
                    <MockRouter path="/login">
                        <PasswordReset/>
                    </MockRouter>
                </AuthProvider>
            </MockedProvider>
        )

        expect(queryByRole('title')).toHaveTextContent('Reset Password');
    });
});

describe("Login form validation", () => {
    it("Submit completes with valid inputs", async() => {
        let isValid;
        let submitData = null;
    
            const handleSubmit = jest.fn((e) => {
                isValid = validateFormPasswordReset(e.target[0].value, e.target[1].value);

                if(isValid){
                    submitData = e.target;
                }   
        
            return
        })
    
        const { getByLabelText, getByTitle, getByText, getByTestId } = render(
            <MockedProvider>
                <AuthProvider authProvider={ authProvider }>
                    <MockRouter path="/login">
                        <PasswordResetForm
                            onSubmit={handleSubmit}
                            formErrors={formErrors}
                        />
                    </MockRouter>
                </AuthProvider>
            </MockedProvider>
        )
    
        const passwordInput: any  = getByLabelText("New Password");
        const confirmPasswordInput: any  = getByLabelText("Confirm Password");
        const resetPasswordButton: any  = getByTitle("passwordReset");
        
        expect(passwordInput);
        expect(confirmPasswordInput);
        expect(resetPasswordButton);
    
        passwordInput.value = 'Password123';
        confirmPasswordInput.value = 'Password123';

        fireEvent.change(passwordInput);
        expect(passwordInput.value).toBe('Password123')
    
        fireEvent.change(confirmPasswordInput);
        expect(confirmPasswordInput.value).toBe('Password123')
    
        const submit = getByTestId("form")
    
        const submitEvent = createEvent.submit(submit, {
            target: [passwordInput, confirmPasswordInput]
        })
    
        fireEvent.submit(submit, submitEvent);
        
        expect(isValid).toEqual(true);
        expect(submitData[0].value).toEqual(passwordInput.value);
        expect(submitData[1].value).toEqual(confirmPasswordInput.value);
    })

    it("Doesn't submit if there are errors in form input", async() => {
        let isValid;
        let submitData = null;
    
            const handleSubmit = jest.fn((e) => {
                isValid = validateFormPasswordReset(e.target[0].value, e.target[1].value);

                if(isValid){
                    submitData = e.target;
                }   
        
            return
        })
    
        const { getByLabelText, getByTitle, getByText, getByTestId } = render(
            <MockedProvider>
                <AuthProvider authProvider={ authProvider }>
                    <MockRouter path="/login">
                        <PasswordResetForm
                            onSubmit={handleSubmit}
                            formErrors={formErrors}
                        />
                    </MockRouter>
                </AuthProvider>
            </MockedProvider>
        )

        const passwordInput: any  = getByLabelText("New Password");
        const confirmPasswordInput: any  = getByLabelText("Confirm Password");
        const resetPasswordButton: any  = getByTitle("passwordReset");

        expect(passwordInput);
        expect(confirmPasswordInput);
        expect(resetPasswordButton);
    
        passwordInput.value = 'Password123';
        confirmPasswordInput.value = 'Password456';

        fireEvent.change(passwordInput);
        expect(passwordInput.value).toBe('Password123')
    
        fireEvent.change(confirmPasswordInput);
        expect(confirmPasswordInput.value).toBe('Password456')
    
        const submit = getByTestId("form")
    
        const submitEvent = createEvent.submit(submit, {
            target: [passwordInput, confirmPasswordInput]
        })
    
        fireEvent.submit(submit, submitEvent);
        
        expect(isValid).toEqual(false);
        expect(submitData).toEqual(null);

        passwordInput.value = '';
        confirmPasswordInput.value = 'Password456';

        fireEvent.change(passwordInput);
        expect(passwordInput.value).toBe('')
    
        fireEvent.change(confirmPasswordInput);
        expect(confirmPasswordInput.value).toBe('Password456')

        fireEvent.submit(submit, submitEvent);

        expect(isValid).toEqual(false);
        expect(submitData).toEqual(null);

        passwordInput.value = 'Password123';
        confirmPasswordInput.value = '';

        fireEvent.change(passwordInput);
        expect(passwordInput.value).toBe('Password123')
    
        fireEvent.change(confirmPasswordInput);
        expect(confirmPasswordInput.value).toBe('')

        fireEvent.submit(submit, submitEvent);

        expect(isValid).toEqual(false);
        expect(submitData).toEqual(null);

        passwordInput.value = '';
        confirmPasswordInput.value = '';

        fireEvent.change(passwordInput);
        expect(passwordInput.value).toBe('')
    
        fireEvent.change(confirmPasswordInput);
        expect(confirmPasswordInput.value).toBe('')

        fireEvent.submit(submit, submitEvent);

        expect(isValid).toEqual(false);
        expect(submitData).toEqual(null);
    })
})