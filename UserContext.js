import React from 'react';

//https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component

const UserContext = React.createContext({
    user: {},
    setUser: () => {}
});
const UserDialogContext = React.createContext({
    toggleUserDialog: () => {},
})

export {UserContext, UserDialogContext};