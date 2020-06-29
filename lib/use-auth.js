import React, { useState, useContext, createContext } from "react";
import useLocalStorage from "./use-local-storage";

const API_URL = "https.testurl.com";

const AuthContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [token, setToken] = useLocalStorage("token", "foo");

  const initState = () => ({
    token: token,
    isAuth: false,
    roleName: "",
    username: "",
    apiUrl: API_URL
  });

  const [user, setUser] = useState(initState());

  const getUserInfo = async (username, password) => {
    if (token) {
      try {
        const apiConfig = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`
          },
          body: JSON.stringify({ username, password })
        };

        const response = await fetch(`${API_URL}/auth/signin`, apiConfig);
        const responseJson = await response.json();

        if (response.ok) {
          // Update Context API
          setUser({
            ...user,
            roleName: responseJson.roles,
            username: responseJson.username,
            isAuth: true
          });
        } else if (response.status === 401) {
          await refreshToken();
          getUserInfo();
        } else {
          throw new Error(
            `Wow a error from getUserInfo(): ${responseJson.error}`
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const signup = async (username, password, firstName, lastName, roleName) => {
    if (!token) {
      try {
        const apiConfig = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            password,
            firstName,
            lastName,
            roleName
          })
        };

        const response = await fetch(`${API_URL}/auth/signup`, apiConfig);
        const responseJson = await response.json();

        if (response.ok) {
          setUser({
            ...user,
            isAuth: true,
            roleName: responseJson.roles,
            username: responseJson.username
          });
        } else if (response.status === 401) {
          await refreshToken();
        } else {
          throw new Error(
            `Error in signUp() try again buddy: ${responseJson.error}`
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const signin = async (username, password) => {
    try {
      const apiConfig = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      };

      const response = await fetch(`${API_URL}/auth/signup`, apiConfig);
      const responseJson = await response.json();

      if (response.ok) {
        setUser({
          ...user,
          isAuth: true,
          token: responseJson
        });
        // Update token in local storage
        setToken(responseJson.token);
      } else if (response.status === 401) {
        await refreshToken();
        getUserInfo();
      } else {
        throw new Error(
          `Error signIn() try again buddy: ${responseJson.error}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signout = () => {
    setToken(null);
    setUser(initState());
  };

  const refreshToken = async () => {
    try {
      const apiConfig = {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user.token}`
        }
      };

      const response = await fetch(`${API_URL}/auth/signin`, apiConfig);
      const responseJson = await response.json();

      if (response.ok) {
        setToken(responseJson.token);
        setUser({
          ...user,
          userRole: "some new role",
          token: responseJson.token
        });
      } else {
        throw new Error(
          `Requested inform can't be found error from refreshToken(),try again`
        );
      }
    } catch (error) {
      throw error;
    }
  };

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout
  };
}
