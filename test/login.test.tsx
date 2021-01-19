import React from "react";
import { render, fireEvent, createEvent, waitFor, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import MockRouter from '../lib/mockRouter';
import Login from "../pages/login";
import LoginForm from "../components/loginForm";
import { useAuthGuard } from "../hooks/useAuthGuard";
import { validateUsername, validateEmail, validatePassword, confirmPassword } from "../lib/formValidator";
import { MockedProvider } from "@apollo/client/testing";

const formErrors = {
  username: null,
  email: null,
  password: null,
  confirm: null
}

const validateLoginForm = (username: string, password: string) => {
  let isValid: boolean = true;
  const errors = {
    username: null,
    password: null
  }

  if(!validateUsername(username) || !username){
    errors.username = "Please enter a valid username"

    isValid = false;
  }

  if(!password){
    errors.password = "Please enter a valid password"

    isValid = false;
  }

  return isValid;
}

describe("Login", () => {
  it("renders without crashing", () => {
    const { queryByRole } = render(
      <MockedProvider>
        <MockRouter path="/login">
          <Login/>
        </MockRouter>
      </MockedProvider>
    )

    expect(queryByRole('title')).toHaveTextContent('Login');
  });
});

describe("Login form validation", () => {
  it("Submit completes with valid inputs", async() => {
    let isValid;
    let submitData = null;

    const handleSubmit = jest.fn((e) => {
      return new Promise((resolve, reject) => {
        isValid = validateLoginForm(e.target[0].value, e.target[1].value);

        if(isValid){
          submitData = e.target;
        
          if(submitData){
            return resolve("Success");
          }
        }
      
        return reject("Invalid form");
      })
    })

    const { getByLabelText, getByTitle, getByText, getByTestId } = render(
      <MockRouter path="/login">
        <LoginForm
          onSubmit={handleSubmit}
          formErrors={formErrors}
        />
      </MockRouter>
    )

    const usernameInput: any = getByLabelText("Username");
    const passwordInput: any  = getByLabelText("Password");
    const loginButton: any  = getByTitle("loginButton");
    
    expect(usernameInput);
    expect(passwordInput);
    expect(loginButton);

    usernameInput.value = "test_user"
    passwordInput.value = 'Password123'

    fireEvent.change(usernameInput);
    expect(usernameInput.value).toBe('test_user')

    fireEvent.change(passwordInput);
    expect(passwordInput.value).toBe('Password123')

    const submit = getByTestId("form")

    const submitEvent = createEvent.submit(submit, {
      target: [usernameInput, passwordInput]
    })

    await fireEvent.submit(submit, submitEvent);
    
    expect(isValid).toEqual(true);
    expect(submitData[0].value).toEqual(usernameInput.value);
    expect(submitData[1].value).toEqual(passwordInput.value);
  });

  it("Doesn't submit if there are errors in form input", async() => {
    let isValid;
    let submitData = null;

    const handleSubmit = jest.fn((e) => {
      isValid = validateLoginForm(e.target[0].value, e.target[1].value);

      if(isValid){
        submitData = e.target;
      }
    
      return 
    })

    const { getByLabelText, getByTitle, getByText, getByTestId } = render(
      <MockRouter path="/login">
        <LoginForm
          onSubmit={handleSubmit}
          formErrors={formErrors}
        />
      </MockRouter>
    )

    const usernameInput: any = getByLabelText("Username");
    const passwordInput: any  = getByLabelText("Password");
    const loginButton: any  = getByTitle("loginButton");
    
    expect(usernameInput);
    expect(passwordInput);
    expect(loginButton);

    usernameInput.value = "test_user"
    passwordInput.value = ''

    fireEvent.change(usernameInput);
    expect(usernameInput.value).toBe('test_user')

    fireEvent.change(passwordInput);
    expect(passwordInput.value).toBe('')

    const submit = getByTestId("form")

    const submitEvent = createEvent.submit(submit, {
      target: [usernameInput, passwordInput]
    })

    fireEvent.submit(submit, submitEvent);
    
    expect(isValid).toEqual(false);
    expect(submitData).toEqual(null);

    usernameInput.value = ''
    passwordInput.value = 'Password123'

    fireEvent.change(usernameInput);
    expect(usernameInput.value).toBe('')

    fireEvent.change(passwordInput);
    expect(passwordInput.value).toBe('Password123')

    fireEvent.submit(submit, submitEvent);

    expect(isValid).toEqual(false);
    expect(submitData).toEqual(null);

    usernameInput.value = ''
    passwordInput.value = ''

    fireEvent.change(usernameInput);
    expect(usernameInput.value).toBe('')

    fireEvent.change(passwordInput);
    expect(passwordInput.value).toBe('')

    fireEvent.submit(submit, submitEvent);

    expect(isValid).toEqual(false);
    expect(submitData).toEqual(null);
  })
});