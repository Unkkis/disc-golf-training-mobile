import React from 'react';

const UserContext = React.createContext({
    user: {},
});
const UserDialogContext = React.createContext({
    toggleUserDialog: () => {},
})

export {UserContext, UserDialogContext};