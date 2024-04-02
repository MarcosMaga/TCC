import React from 'react'

const AppContext = React.createContext();

function AppProvider({children}){
    const [user, setUser] = React.useState({
        id: null,
        name: null,
        email: null,
        createdOn: null
    });

    return(
        <AppContext.Provider value={{user, setUser}}>
            {children}
        </AppContext.Provider>
    );
}

export { AppContext, AppProvider };