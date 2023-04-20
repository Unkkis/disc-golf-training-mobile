import { Header } from "@rneui/base";
import Styles from "../Styles";
import { TouchableOpacity } from "react-native";
import React from "react";

const CustomHeader = () => {
    return (
        <Header 
            centerComponent={{ text: 'DG TRAINER', style: Styles.header }}
            rightComponent={{ text: 'User: Jussi', style: Styles.header }}
        />

    );

};

const customButton = () => {
    return (
        <TouchableOpacity> </TouchableOpacity>

    )
}

export { CustomHeader };