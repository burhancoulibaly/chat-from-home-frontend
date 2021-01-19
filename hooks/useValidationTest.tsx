import { createContext, ReactNode, useContext, useState } from "react";
import { validateUsername, validateEmail, validatePassword, confirmPassword } from "../lib/formValidator";

const validationContext = createContext({ formErrors: {}, setFormErrors: null, validateLoginForm: null, validateFormSignUp: null, validateFormPasswordReset: null});
const { Provider } = validationContext;

export function ValidationProvider(props: { children: ReactNode }): JSX.Element {
    const validation = useValidationProvider();

    return <Provider value={validation}>{props.children}</Provider>;
}

const useValidationProvider = () => {
  const [formErrors, setFormErrors] = useState({ username: null, email: null, password: null, confirm: null, response: null });

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

    setFormErrors({
      ...formErrors,
      username: errors.username,
      password: errors.password
    })

    return isValid;
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

    setFormErrors({
      ...formErrors,
      username: errors.username,
      email: errors.email,
      password: errors.password,
      confirm: errors.confirm
    })

    return isValid;
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

    setFormErrors({
      ...formErrors,
      password: errors.password,
      confirm: errors.confirm
    })

    return isValid;
  }

  return {
    formErrors,
    setFormErrors,
    validateLoginForm,
    validateFormSignUp,
    validateFormPasswordReset
  }
}

export const useValidation = () => {
    return useContext(validationContext);
}