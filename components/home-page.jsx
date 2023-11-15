import * as React from 'react';
import { View, Text, ImageBackground, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

function DHallSelectionButton({caption, image, onPress})
{
    return (
        <TouchableOpacity onPress={onPress} style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <Image source={image} resizeMode='cover' style={{ width: 300, height: 100 }} />
            <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{ fontSize: 30 }}>{caption}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default function HomePage()
{
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <DHallSelectionButton caption="BPlate" image={require('../assets/icon.png')}/>
              <DHallSelectionButton caption="De Neve" image={require('../assets/icon.png')}/>
              <DHallSelectionButton caption="Epicuria" image={require('../assets/icon.png')}/>
        </View>
    );
}