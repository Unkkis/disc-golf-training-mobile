import React from 'react';
import { Share, Text} from 'react-native';
import { Button } from '@rneui/themed'

export default function ShareStats(props){
    const message = props.message
    

    const shareOptions = {
        title: 'Title',
        message: `${message}`, // Note that according to the documentation at least one of "message" or "url" fields is required
        subject: 'Subject'
    };

    const onSharePress = () => {
        Share.share(shareOptions)
    }

    
    return(
        <Button onPress={onSharePress} title="Share stats to friends" />
    );
  }
