import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { useErrorContext } from "./useErrorContext";

export const useLogIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { authDispatch } = useAuthContext();
  const { errorState, errorDispatch} = useErrorContext();

    const logIn = async (username: string, password: string) => {
      setIsLoading(true);
  
      const response: globalThis.Response = await fetch("http://localhost:1337/api/sessions", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
      });
   
      const json = await response.json();
  
      if(!response.ok){
        if(json.error.message === "Invalid username or password"){
          errorDispatch({
            type: "SET_ERROR",
            payload: { error: { message: json.error.message, type: json.error.type } },
          });
        }
        setIsLoading(false);
      }
  
      if(response.ok){
        localStorage.setItem("user", JSON.stringify(json));
        authDispatch({type: "LOGIN", payload: json});
        setIsLoading(false);
      }
    }

    return { logIn, isLoading }


}