import { useState } from "react";

export const useBugReport = () => {
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createBugReport = async (msg: string) => {
    setIsLoading(true);
    setError(null);

    const reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");

    const response: globalThis.Response = await fetch("http://localhost:1337/api/bugs", {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify({msg})
    });

    const json: any = await response.json();

    if(!response.ok){
      setIsLoading(false);
      setError(json.error);
    }

    if(response.ok){
      setIsLoading(false);
    }
  }

  return { createBugReport, isLoading, error }
}