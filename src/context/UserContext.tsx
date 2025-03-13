import { createContext, useContext } from 'react';
import { useState } from 'react';

interface AuthContextType {
  isSignedIn: boolean;
  setIsSignedIn: Function;
  userToken?: string;
}

//CONTEXT SETUP
const GlobalUserContext = createContext<AuthContextType | null>(null);

export const useGlobalUserContext = () => {
  const {isSignedIn, setIsSignedIn, userToken}: any = useContext(GlobalUserContext);

  return {isSignedIn, setIsSignedIn, userToken}
}




//NEEDED CONTEXT VALUES
const storedToken = localStorage.getItem('pmw_token');
if (!storedToken) {
  console.error("No user is logged in");
}

let userToken: string | undefined;

if(storedToken) {
  try {
    userToken = JSON.parse(storedToken);
  } catch (error) {
    console.error("Failed to parse token:", error);
    userToken = undefined
  }
} else {
  console.error("No user is logged in");
  userToken = undefined;
}

const UserContext = ({ children }: any) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(
    userToken ? true : false
  );

  return (
    <GlobalUserContext.Provider
      value={{ isSignedIn, setIsSignedIn, userToken }}
    >
      {children}
    </GlobalUserContext.Provider>
  );
};

export default UserContext;
