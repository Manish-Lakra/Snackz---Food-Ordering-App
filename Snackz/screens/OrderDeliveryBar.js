import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackActions, NavigationActions } from 'react-navigation';

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'OrderDeliveryBar' })],
});



export default class OrderDeliveryBar extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require("../assets/banners/berryWaffles.jpg")} style={{ width: '100%', height: '100%' }}>

                    <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF99' }}>
                        <Text style={{ fontSize: 30, fontStyle: 'italic', color: '#1BCA9B', fontWeight: 'bold' }}>Order Confirmed!</Text>


                    </View>



                    <View style={{ flex: 0.7, flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
                        <View style={{ height: 50, width: 50, borderRadius: 100, backgroundColor: '#1BCA9B', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <Text>Packed</Text>
                        </View>
                        <View style={{ height: 30, width: 5, backgroundColor: '#1BCA9B' }}></View>
                        <View style={styles.trackCircle}></View>
                        <View style={styles.trackerLine}></View>
                        <View style={styles.trackCircle}></View>
                        <View style={styles.trackerLine}></View>
                        <View style={styles.trackCircle}>
                            <Text>Reach</Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                        <TouchableOpacity style={styles.button} onPress={() => {
                            
                            this.props.navigation.navigate('Home')
                        }} s>
                            <Text style={styles.buttonText} >Home</Text>
                        </TouchableOpacity>
                    </View>

                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',


    },
    trackCircle: {
        height: 50,
        width: 50,
        borderRadius: 100,
        backgroundColor: '#777E8B',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },

    trackerLine: {
        height: 30,
        width: 5,
        backgroundColor: '#777E8B',
    },
    button: {
        width: 200,
        height: 55,
        backgroundColor: '#EA7773',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 30,
        color: 'white'

    }

});
