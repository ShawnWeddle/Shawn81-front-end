export const usernameValidator = (username: string) => {
  let usernameErrorsArray: string[] = [];
  const usernameRegEx: RegExp = /^[a-zA-Z0-9_]{2,24}$/;

  if(!username){
    usernameErrorsArray.push("Username is required");
  }

  if(usernameErrorsArray.length > 0){
    return usernameErrorsArray
  }

  if(username.length > 24){
    usernameErrorsArray.push("Usernames can't be longer than 24 characters");
  }

  if(username.length < 3){
    usernameErrorsArray.push("Usernames must be at least three characters long");
  }

  if(!usernameRegEx.test(username)){
    usernameErrorsArray.push("Usernames can only contain letters, numbers, and underscores");
  }

  return usernameErrorsArray;
}

export const passwordValidator = (password: string) => {
  let passwordErrorsArray: string[] = [];

  if(!password){
    passwordErrorsArray.push("Password is required");
  }

  if(passwordErrorsArray.length > 0){
    return passwordErrorsArray;
  }

  if(password.length < 8){
    passwordErrorsArray.push("Passwords must be at least eight characters long");
  }

  if(password.length > 64){
    passwordErrorsArray.push("Don't make your password longer than 64 characters");
  }

  return passwordErrorsArray;
}

export const passwordConfirmationValidator = (password: string, passwordConfirmation: string) => {
  let passwordConfirmationErrorsArray: string[] = [];

  if(!passwordConfirmation){
    passwordConfirmationErrorsArray.push("Password Confirmation is required");
  }

  if(passwordConfirmationErrorsArray.length > 0){
    return passwordConfirmationErrorsArray;
  }

  if(password !== passwordConfirmation){
    passwordConfirmationErrorsArray.push("Passwords do not match");
  }

  return passwordConfirmationErrorsArray;
}

export const signUpValidation = (username: string, password: string, passwordConfirmation: string) => {
  let validation: boolean = true;
  let errorsArray: string[] = [];
  let usernameErrorsArray: string[] = [];
  let passwordErrorsArray: string[] = [];
  let passwordConfirmationErrorsArray: string[] = [];
  const usernameRegEx: RegExp = /^[a-zA-Z0-9_]{2,24}$/;

  if(!username){
    usernameErrorsArray.push("Username is required");
  }

  if(!password){
    passwordErrorsArray.push("Password is required");
  }

  if(!passwordConfirmation){
    passwordConfirmationErrorsArray.push("Password confirmation is required");
  }

  errorsArray = [...usernameErrorsArray, ...passwordErrorsArray, ...passwordConfirmationErrorsArray];

  if(errorsArray.length !== 0){
    validation = false;
    console.log(validation, usernameErrorsArray, passwordErrorsArray, passwordConfirmationErrorsArray);
    return {validation, usernameErrorsArray, passwordErrorsArray, passwordConfirmationErrorsArray};
  }

  if(username.length > 24){
    usernameErrorsArray.push("Usernames can't be longer than 24 characters");
  }

  if(username.length < 3){
    usernameErrorsArray.push("Usernames must be at least three characters long");
  }

  if(!usernameRegEx.test(username)){
    usernameErrorsArray.push("Usernames can only contain letters, numbers, and underscores");
  }

  if(password.length < 8){
    passwordErrorsArray.push("Passwords must be at least eight characters long");
  }

  if(password.length > 64){
    passwordErrorsArray.push("Don't make your password longer than 64 characters");
  }

  if(password !== passwordConfirmation){
    passwordConfirmationErrorsArray.push("Passwords do not match");
  }

  errorsArray = [...usernameErrorsArray, ...passwordErrorsArray, ...passwordConfirmationErrorsArray];

  if(errorsArray.length !== 0){
    validation = false;
  }

  console.log(validation, usernameErrorsArray, passwordErrorsArray, passwordConfirmationErrorsArray);
  return {validation, usernameErrorsArray, passwordErrorsArray, passwordConfirmationErrorsArray};
}