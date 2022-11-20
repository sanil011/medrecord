import React, { useState, useEffect, useContext } from "react";
const AppContext = React.createContext();

const AppProvider = () => {
    const [value, setValue] = useState('');
    return (
        <AppContext.Provider>
            value={{
                value,
                setValue
           }}
        </AppContext.Provider>
    )
}


export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
