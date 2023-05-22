import { Header } from "@rneui/themed";
import Styles from "../Styles";
import { TouchableOpacity } from "react-native";
import React from "react";

const CustomHeader = () => {



    return (
        <Header 
            centerComponent={{ text: 'DG TRAINER', style: Styles.header }}
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