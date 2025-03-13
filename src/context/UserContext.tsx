import { createContext, useContext } from 'react';
import { useState } from 'react';

interface AuthContextType {
  isSignedIn: boolean;
  setIsSignedIn: Function;
  userToken?: string;
  userData: any;
  setUserData: Function;
}

//CONTEXT SETUP
const GlobalUserContext = createContext<AuthContextType | null>(null);

export const useGlobalUserContext = () => {
  const {isSignedIn, setIsSignedIn, userToken, userData, setUserData}: any = useContext(GlobalUserContext);

  return {isSignedIn, setIsSignedIn, userToken, userData, setUserData}
}




//NEEDED CONTEXT VALUES
const storedToken = localStorage.getItem('pmw_token');
const storedUser = localStorage.getItem("pmw_user");
if (!storedToken) {
  console.error("No user is logged in");
}

let userToken: string | undefined;
let user: any

if(storedToken && storedUser) {
  try {
    userToken = JSON.parse(storedToken);
    user = JSON.parse(storedUser);
  } catch (error) {
    console.error("Failed to parse token:", error);
    userToken = undefined
    user = undefined
  }
} else {
  console.error("No user is logged in");
  userToken = undefined;
  user = undefined
}

const UserContext = ({ children }: any) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(
    userToken ? true : false
  );
  const [userData, setUserData] = useState<any>(user ? user : undefined)

  return (
    <GlobalUserContext.Provider
      value={{ isSignedIn, setIsSignedIn, userToken, userData, setUserData }}
    >
      {children}
    </GlobalUserContext.Provider>
  );
};

export default UserContext;
