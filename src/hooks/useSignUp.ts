import { useState } from "react";
import { useErrorContext } from "./useErrorContext";

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { errorState, errorDispatch} = useErrorContext();

  const signUp = async (username: string, password: string, passwordConfirmation: string) => {
    setIsLoading(true);

    errorDispatch({
      type: "REMOVE_ALL_ERRORS",
      payload: { error: { type: "N/A", message: "N/A" } },
    });

    const response: globalThis.Response = await fetch("http://localhost:1337/api/users", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username, password, passwordConfirmation})
    });

    const json = await response.json();

    if(!response.ok){

      if(json.error.message === "This username is already taken"){
        errorDispatch({
          type: "SET_ERROR",
          payload: { error: { message: json.error.message, type: json.error.type } },
        });
      }

      setIsLoading(false);
    }

    if(response.ok){
      setIsLoading(false);
    }
  }

  return { signUp, isLoading }
}