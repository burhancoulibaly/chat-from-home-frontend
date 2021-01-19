import React from "react";
import { render, fireEvent, createEvent, waitFor, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import MockRouter from '../lib/mockRouter';
import { useAuthGuard } from "../hooks/useAuthGuard";
import { validateUsername, validateEmail, validatePassword, confirmPassword } from "../lib/formValidator";
import SignupForm from "../components/signupForm";
import Signup from "../pages/signup";
import { MockedProvider } from '@apollo/client/testing';

const formErrors = {
  username: null,
  email: null,
  password: null,
  confirm: null
}

const validateFormSignUp = (username: string, email: string, password1: string, password2: string) => {
  let isValid: boolean = true;

  const errors = {
    username: null,
    email: null,
    password: null,
    confirm: null
  }

  if(!validateUsername(username) || !username){
    errors.username = "Please enter a valid username";

    isValid = false;
  }

  if(!validateEmail(email) || !email){
    errors.email = "Please enter a valid email";

    isValid = false;
  }

  if(!validatePassword(password1) || !password1){
    errors.password = "Password must contain atleast 1 uppercase letter, 1 lowercase letter, and 8 characters";

    isValid = false;
  }

  if(!confirmPassword(password1, password2) || !password1 || !password2){
    errors.confirm = "Passwords must match";

    isValid = false;
  }

  return isValid;
}

describe("Signup", () => {
    it("renders without crashing", () => {
        const { queryByRole } = render(
            <MockedProvider>
                <MockRouter path="/signup">
                    <Signup/>
                </MockRouter>
            </MockedProvider>
        )
        
        expect(queryByRole('title')).toHaveTextContent('Signup');
    });
});

describe("Login form validation", () => {
    it("Submit completes with valid inputs", async() => {
      let isValid;
      let submitData = null;
  
        const handleSubmit = jest.fn((e) => {
            isValid = validateFormSignUp(e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].value);

            if(isValid){
                submitData = e.target;
            }   
    
        return
      })
  
      const { getByLabelText, getByTitle, getByText, getByTestId } = render(
        <MockRouter path="/signup">
          <SignupForm
            onSubmit={handleSubmit}
            formErrors={formErrors}
          />
        </MockRouter>
      )
  
      const usernameInput: any = getByLabelText("Username");
      const emailInput: any = getByLabelText("Email address");
      const passwordInput: any  = getByLabelText("Password");
      const confirmPasswordInput: any  = getByLabelText("Confirm Password");
      const signupButton: any  = getByTitle("signupButton");
      
      expect(usernameInput);
      expect(emailInput);
      expect(passwordInput);
      expect(confirmPasswordInput);
      expect(signupButton);
  
      usernameInput.value = "test_user";
      emailInput.value = "test_user@gmail.com";
      passwordInput.value = 'Password123';
      confirmPasswordInput.value = 'Password123';
  
      fireEvent.change(usernameInput);
      expect(usernameInput.value).toBe('test_user')

      fireEvent.change(emailInput);
      expect(emailInput.value).toBe('test_user@gmail.com')

      fireEvent.change(passwordInput);
      expect(passwordInput.value).toBe('Password123')
  
      fireEvent.change(confirmPasswordInput);
      expect(confirmPasswordInput.value).toBe('Password123')
  
      const submit = getByTestId("form")
  
      const submitEvent = createEvent.submit(submit, {
        target: [usernameInput, emailInput, passwordInput, confirmPasswordInput]
      })
  
      fireEvent.submit(submit, submitEvent);
      
      expect(isValid).toEqual(true);
      expect(submitData[0].value).toEqual(usernameInput.value);
      expect(submitData[1].value).toEqual(emailInput.value);
      expect(submitData[2].value).toEqual(passwordInput.value);
      expect(submitData[3].value).toEqual(confirmPasswordInput.value);
    });

    it("Doesn't submit if there are errors in form input", async() => {
        let isValid;
      let submitData = null;
  
        const handleSubmit = jest.fn((e) => {
            isValid = validateFormSignUp(e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].value);

            if(isValid){
                submitData = e.target;
            }   
    
        return
      })
  
      const { getByLabelText, getByTitle, getByText, getByTestId } = render(
        <MockRouter path="/signup">
          <SignupForm
            onSubmit={handleSubmit}
            formErrors={formErrors}
          />
        </MockRouter>
      )
  
      const usernameInput: any = getByLabelText("Username");
      const emailInput: any = getByLabelText("Email address");
      const passwordInput: any  = getByLabelText("Password");
      const confirmPasswordInput: any  = getByLabelText("Confirm Password");
      const signupButton: any  = getByTitle("signupButton");
      
      expect(usernameInput);
      expect(emailInput);
      expect(passwordInput);
      expect(confirmPasswordInput);
      expect(signupButton);
  
      usernameInput.value = "test_user";
      emailInput.value = "test_user@gmail.com";
      passwordInput.value = 'Password123';
      confirmPasswordInput.value = 'Password456';
  
      fireEvent.change(usernameInput);
      expect(usernameInput.value).toBe('test_user')

      fireEvent.change(emailInput);
      expect(emailInput.value).toBe('test_user@gmail.com')

      fireEvent.change(passwordInput);
      expect(passwordInput.value).toBe('Password123')
  
      fireEvent.change(confirmPasswordInput);
      expect(confirmPasswordInput.value).toBe('Password456')
  
      const submit = getByTestId("form")
  
      const submitEvent = createEvent.submit(submit, {
        target: [usernameInput, emailInput, passwordInput, confirmPasswordInput]
      })
  
      fireEvent.submit(submit, submitEvent);
      
      expect(isValid).toEqual(false);
      expect(submitData).toEqual(null);

      usernameInput.value = "";
      emailInput.value = "test_user@gmail.com";
      passwordInput.value = 'Password123';
      confirmPasswordInput.value = 'Password123';
  
      fireEvent.change(usernameInput);
      expect(usernameInput.value).toBe('')

      fireEvent.change(emailInput);
      expect(emailInput.value).toBe('test_user@gmail.com')

      fireEvent.change(passwordInput);
      expect(passwordInput.value).toBe('Password123')
  
      fireEvent.change(confirmPasswordInput);
      expect(confirmPasswordInput.value).toBe('Password123')

      fireEvent.submit(submit, submitEvent);
      
      expect(isValid).toEqual(false);
      expect(submitData).toEqual(null);
    
      usernameInput.value = "test_user";
      emailInput.value = "";
      passwordInput.value = 'Password123';
      confirmPasswordInput.value = 'Password123';
  
      fireEvent.change(usernameInput);
      expect(usernameInput.value).toBe('test_user')

      fireEvent.change(emailInput);
      expect(emailInput.value).toBe('')

      fireEvent.change(passwordInput);
      expect(passwordInput.value).toBe('Password123')
  
      fireEvent.change(confirmPasswordInput);
      expect(confirmPasswordInput.value).toBe('Password123')

      fireEvent.submit(submit, submitEvent);
      
      expect(isValid).toEqual(false);
      expect(submitData).toEqual(null);

      usernameInput.value = "test_user";
      emailInput.value = "test_user@gmail.com";
      passwordInput.value = '';
      confirmPasswordInput.value = 'Password123';
  
      fireEvent.change(usernameInput);
      expect(usernameInput.value).toBe('test_user')

      fireEvent.change(emailInput);
      expect(emailInput.value).toBe('test_user@gmail.com')

      fireEvent.change(passwordInput);
      expect(passwordInput.value).toBe('')
  
      fireEvent.change(confirmPasswordInput);
      expect(confirmPasswordInput.value).toBe('Password123')

      fireEvent.submit(submit, submitEvent);
      
      expect(isValid).toEqual(false);
      expect(submitData).toEqual(null);

      usernameInput.value = "test_user";
      emailInput.value = "test_user@gmail.com";
      passwordInput.value = 'Password123';
      confirmPasswordInput.value = '';
  
      fireEvent.change(usernameInput);
      expect(usernameInput.value).toBe('test_user')

      fireEvent.change(emailInput);
      expect(emailInput.value).toBe('test_user@gmail.com')

      fireEvent.change(passwordInput);
      expect(passwordInput.value).toBe('Password123')
  
      fireEvent.change(confirmPasswordInput);
      expect(confirmPasswordInput.value).toBe('')

      fireEvent.submit(submit, submitEvent);
      
      expect(isValid).toEqual(false);
      expect(submitData).toEqual(null);

      usernameInput.value = "";
      emailInput.value = "";
      passwordInput.value = '';
      confirmPasswordInput.value = '';
  
      fireEvent.change(usernameInput);
      expect(usernameInput.value).toBe('')

      fireEvent.change(emailInput);
      expect(emailInput.value).toBe('')

      fireEvent.change(passwordInput);
      expect(passwordInput.value).toBe('')
  
      fireEvent.change(confirmPasswordInput);
      expect(confirmPasswordInput.value).toBe('')

      fireEvent.submit(submit, submitEvent);
      
      expect(isValid).toEqual(false);
      expect(submitData).toEqual(null);
    })
})