import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  AsyncStorage
} from 'react-native';
import Utility from '../../assets/Utility';
import data from '../../assets/products'
import { StackActions, NavigationActions } from 'react-navigation';

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Login' })],
});

const resetActionForHome = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

export default class Splash extends Component {

  constructor(props) {
    super(props)
  }

  // componentDidMount(){
  //     this.function2(2,(mNew)=>{alert(mNew)})
  // }

  // function2(mTemp,fun){
  //   var mNewTemp = mTemp+10
  //   fun(mNewTemp);
  // }

  componentWillMount() {

    setTimeout(() => {
      Utility.sinstance.getLastUser().then((emailid) => {
        if (emailid != undefined && emailid != null) {
          Utility.sinstance.getSession(emailid).then((isSessionActive) => {
            if (isSessionActive) {
              this.props.navigation.dispatch(resetActionForHome);
            } else {
              this.props.navigation.dispatch(resetAction);
            }
          })
        } else {
          this.props.navigation.dispatch(resetAction);
        }
      })
    }, 3000);
  }

 

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#4F6D7A"
        />
        <ImageBackground source={require("../../assets/banners/CarimalValilaIcecream.jpg")} style={{ width: '100%', height: '100%' }}>
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

  },
  welcome: {
    fontSize: 40,

    textAlign: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    fontStyle: 'italic',
    margin: 15,
    color: 'white',
    marginTop: 120,
  },
  instructions: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
  }
});