import * as React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


function DHallSelectionButton({caption, image, onPress})
{
    return (
        <TouchableOpacity onPress={onPress} style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <Image source={image} resizeMode='cover' style={styles.dhallButtonImage} />
            <View style={styles.centeredText}>
                <Text style={styles.dhallButtonFont}>{caption}</Text>
            </View>
        </TouchableOpacity>
    );
}

const BOTTOM_APPBAR_HEIGHT = 80;
function BottomBar()
{
    const { bottom } = useSafeAreaInsets();

    return (
        <Appbar style={[styles.bottom, { height: BOTTOM_APPBAR_HEIGHT + bottom }]} safeAreaInsets={{ bottom }}>
            <Appbar.Action icon={require('../assets/search-icon.png')} onPress={() => {}} style={{ marginRight: 10 }} size={40} />
            <Appbar.Action icon={require('../assets/add-icon.png')} onPress={() => {}} style={{ marginLeft: 10 }} size={40} />
        </Appbar>
    );
};

export default function HomePage()
{
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 60 }}>
              <DHallSelectionButton caption="BPlate" image={require('../assets/bplate-icon.png')}/>
              <DHallSelectionButton caption="De Neve" image={require('../assets/deneve-icon.png')}/>
              <DHallSelectionButton caption="Epicuria" image={require('../assets/epicuria-icon.png')}/>
            </View>
            <BottomBar />
        </View>
    );
}

const styles = StyleSheet.create(
{
    bottom: {
        backgroundColor: '#FAE2F0',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    centeredText: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    dhallButtonFont: {
        fontSize: 40, 
        color: 'white'
    },
    dhallButtonImage: {
        width: 300, 
        height: 100
    }
});