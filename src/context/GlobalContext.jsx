import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [dades, setDades] = useState([]);
    const [dataTicket, setDataTicket] = useState({})
    console.log(dades);


    return (
        <GlobalContext.Provider value={{ dades, setDades, dataTicket, setDataTicket}}>
            {children}
        </GlobalContext.Provider>
    );
};
