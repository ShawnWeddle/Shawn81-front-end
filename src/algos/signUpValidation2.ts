import { useState } from "react";

export const signUpValidation2 = (username: string, password: string, passwordConfirmation: string) => {
  const [success, setSuccess] = useState<boolean>(true);
  const [errorsArray, setErrorsArray] = useState<string[]>([]);
  const [usernameErrors, setUsernameErrors] = useState<string[]>([]);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [passwordConfirmationErrors, setPasswordConfirmationErrors] = useState<string[]>([]);
  const usernameRegEx: RegExp = /^[a-zA-Z0-9_]{2,24}$/;

  if(username === "&^%$#@!"){
    return {success, usernameErrors, passwordErrors, passwordConfirmationErrors}
  }

  if(!username){
    setUsernameErrors([...usernameErrors, "Username is required"]);
  }

  if(!password){
    setPasswordErrors([...passwordErrors, "Password is required"]);
  }

  if(!passwordConfirmation){
    setPasswordConfirmationErrors([...passwordConfirmationErrors, "Password confirmation is required"]);
  }

  setErrorsArray([...usernameErrors, ...passwordErrors, ...passwordConfirmationErrors]);

  if(errorsArray.length !== 0){
    setSuccess(false);
    return {success, usernameErrors, passwordErrors, passwordConfirmationErrors};
  }

  if(username.length > 24){
    setUsernameErrors([...usernameErrors, "Usernames can't be longer than 24 characters"]);
  }

  if(username.length < 3){
    setUsernameErrors([...usernameErrors, "Usernames must be at least three characters long"]);
  }

  if(usernameRegEx.test(username)){
    setUsernameErrors([...usernameErrors, "Usernames can only contain letters, numbers, and underscores"]);
  }

  if(password.length < 8){
    setPasswordErrors([...passwordErrors, "Passwords must be at least eight characters long"]);
  }

  if(password.length > 64){
    setPasswordErrors([...passwordErrors, "Don't make your password longer than 64 characters"]);
  }

  if(password !== passwordConfirmation){
    setPasswordConfirmationErrors([...passwordConfirmationErrors, "Passwords do not match"]);
  }

  if(errorsArray.length !== 0){
    setSuccess(false);
  }

  return {success, usernameErrors, passwordErrors, passwordConfirmationErrors};
}