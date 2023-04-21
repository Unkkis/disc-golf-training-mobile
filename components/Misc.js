import { Header } from "@rneui/base";
import Styles from "../Styles";
import { TouchableOpacity } from "react-native";
import React from "react";
import UserContext from "../UserContext";

const CustomHeader = () => {
    const userContext = React.useContext(UserContext); 

    return (
        <Header 
            centerComponent={{ text: 'DG TRAINER', style: Styles.header }}
            rightComponent={{ text: `User: ${userContext.user.username}`, style: Styles.header }}
        />

    );

};

const customButton = () => {
    return (
        <TouchableOpacity> </TouchableOpacity>

    )
}

export { CustomHeader };