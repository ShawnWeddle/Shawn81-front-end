import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMessageContext } from "./useMessageContext";

export const useCreateMessage = () => {
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { authState } = useAuthContext();
  const user = authState.user;

  const { messageDispatch } = useMessageContext();

  const createMessage = async (username: string, msg: string, location: number) => {
    setIsLoading(true);
    setError(null);

    if(!user){
      setError("Please Log In");
      setIsLoading(false);
      return
    }

    const reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");
    reqHeaders.append("Authorization", `Bearer ${user.accessToken}`);

    const response: globalThis.Response = await fetch("http://localhost:1337/api/messages", {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify({username, msg, location})
    });

    const json: any = await response.json();

    if(!response.ok){
      setIsLoading(false);
      setError(json.error);
    }

    if(response.ok){
      messageDispatch({type: "CREATE-MESSAGE", payload: {messages: [json]}});
      setIsLoading(false);
    }
  }

  return { createMessage, isLoading, error }
}