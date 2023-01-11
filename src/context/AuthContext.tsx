import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext<ContextType | null>(null);

type ContextType = {
  authState: { user: UserType | null };
  authDispatch: React.Dispatch<{ type: string; payload: UserType | null }>;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export type UserType = {
  username: string;
  accessToken: string;
  refreshToken: string;
};

type AuthReducerState = { user: UserType | null };
type AuthReducerAction = { type: string; payload: UserType | null };

export const authReducer = (
  state: AuthReducerState,
  action: AuthReducerAction
) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authState, authDispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    const userCheck: string | null = localStorage.getItem("user");
    let user: any;
    if (userCheck) {
      user = JSON.parse(userCheck);
    }

    if (user) {
      authDispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
