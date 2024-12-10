import React, { useState, createContext } from 'react';

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);

function useProvideAuth() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errors, setErrors] = useState([]);

  const doLogin = (username, password) => {
    setIsLoading(true);
    // login fetch request
    setUser(user);
  };

  const doRegister = user => {
    setUser(user);
  };

  const doLogout = () => {
    setUser({});
  };

  const refresh = () => {};

  return { user, doLogin, doRegister, doLogout, isLoading, errors };
}
