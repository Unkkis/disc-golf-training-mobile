import { Header } from "@rneui/themed";
import Styles from "../Styles";
import { TouchableOpacity } from "react-native";
import React from "react";
import { UserContext } from "../UserContext";

const CustomHeader = () => {
    const userContext = React.useContext(UserContext); 
    const userName = userContext.user.user.username


    return (
        <Header 
            centerComponent={{ text: 'DG TRAINER', style: Styles.header }}
            rightComponent={{ text: `User: ${userName}`, style: Styles.header } }
            rightContainerStyle= {{flex: 3}}
            leftContainerStyle= {{flex:3}}
            centerContainerStyle= {{flex:3}}
        />

    );

};

const customButton = () => {
    return (
        <TouchableOpacity> </TouchableOpacity>

    )
}

export { CustomHeader };