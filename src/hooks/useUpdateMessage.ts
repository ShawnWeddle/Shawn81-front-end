import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWindowContext } from "./useWindowContext";
import { useMessageContext } from "./useMessageContext";

export const useUpdateMessage = () => {
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { authState } = useAuthContext();
  const user = authState.user;

  const { windowState } = useWindowContext();
  const activeMessage = windowState.activeMessage;

  const { messageState, messageDispatch } = useMessageContext();

  const msgId: string = (activeMessage ? activeMessage._id : "");

  const updateMessage = async (username: string, msg: string, color: string, location: number) => {
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

    const response: globalThis.Response = await fetch(`http://localhost:1337/api/messages/${msgId}`, {
      method: "PUT",
      headers: reqHeaders,
      body: JSON.stringify({username, msg, color, location})
    });

    const json = await response.json();


    if(!response.ok){
      console.log(json);
      console.log("update error");
      setIsLoading(false);
    }

    if(response.ok){
      messageDispatch({type: "UPDATE-MESSAGE", payload: {messages: [json]}})
      setIsLoading(false);
    }
  }

  return { updateMessage, isLoading, error }
}