//this is just a frontend comp to structure a review

import * as React from "react";
import { useState, useEffect } from "react";
import { View, Image } from "react-native"
import {Text, Card} from 'react-native-paper'

const Review = ({ itemName, rating, caption, photoExists, photoString }) => {


    return (
        <>
        <Card>
            <Card.Content>
                <View style={{ flex: 0, alignItems: "start", justifyContent: "start", margin: 10 }}>
                    <Text variant="titleLarge">{itemName}</Text>
                    <View style={{ flexDirection: 'row'}}>
                    {
                        [...Array(rating),].map((value, index) => (
                            <Image key={index}
                        source={require('../../assets/star-icon.png')}
                        style={{width:20, height:20}} />
                        ))
                    }
                    </View>
                </View>
                <View style={{flex: 0, alignItems: "start", justifyContent: "end", margin:10, gap:10}}>
                    <Text variant="bodyMedium">{caption}</Text>
                    {photoExists && <Image 
                        source={{uri : `data:image/jpeg;base64,${photoString}`}}
                        style={{width:150, height:75, borderRadius: 10}} />}
                </View>
                
            </Card.Content>

        </Card>
        
        
        </>
    )
}

export default Review