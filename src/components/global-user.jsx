import * as React from 'react';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const contextValue = {
    user,
    updateUser,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return React.useContext(UserContext);
};