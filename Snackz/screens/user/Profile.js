import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, Image, Button, TouchableOpacity } from 'react-native';
import Utility from '../../assets/Utility'
import { StackActions, NavigationActions } from 'react-navigation';

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Login' })],
});

export default class Profile extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      phone: '',
      userimage: '',
    }
  }

  static navigationOption = {
    title: "PhotoClicker"
  }


  componentDidMount() {

    var thispage = this
    Utility.sinstance.getLastUser().then((email) => {
      Utility.sinstance.getUser(email).then((mUser) => {
        console.log(mUser)

        thispage.setState({
          email: mUser.Email,
          name: mUser.Name,
          phone: mUser.Phone
        })
      })


    })

    this._subscribe = this.props.myProps.navigation.addListener('didFocus', () => {
      
      Utility.sinstance.getLastUser().then((email) => {
        Utility.sinstance.getItemForKey('user_image'+email).then((mUserImage) => {
          
          if(mUserImage!=undefined)
          thispage.setState({ userimage: mUserImage })
        })
      })
    })
  }

  render() {
   

    return (
      <View style={styles.container}>

        <ImageBackground source={require("../../assets/banners/waffle.jpg")} style={{ width: '100%', height: '100%' }}>
          <View style={styles.secondaryContainer}>
            <View style={{ flex: 0.4 }}>
              <Image style={{ width: 150, height: 150, borderRadius: 150 / 2, margin: 30, alignSelf: 'flex-start' }}
                source={
                  this.state.userimage == '' ? require('../../assets/Icons/user.png') : this.state.userimage
                }
              />
              <Button
                title="Take Photo"
                style={{ margin: 20 }}
                onPress={() => {
                  this.props.myProps.navigation.navigate('Camera')
                }}
              />
            </View>
            <View style={{ flex: 0.4, marginTop: 80 }}>
              <Text style={styles.text}> Name: {this.state.name}  .  </Text>
              <Text style={styles.text}> Email : {this.state.email}  .  </Text>
              <Text style={styles.text}> Phone : {this.state.phone} .  </Text>
            </View>
            <View style={{ flex: 0.2 }}>
              <TouchableOpacity style={styles.button}
                onPress={async () => {
                  Utility.sinstance.saveLastUser(null);
                  Utility.sinstance.setSession(this.state.email, false);
                  
                  this.props.myProps.navigation.dispatch(resetAction);

                }}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>Logout</Text>
              </TouchableOpacity>
              
            </View>

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
    backgroundColor: '#F5FCFF',
  },
  secondaryContainer: {
    flex: 0.8,
    height: 1200,
    width: 350,
    backgroundColor: '#FFFFFF99',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 70
  },
  button: {
    backgroundColor: '#777E8B',
    borderRadius: 10,
    width: 200,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    alignSelf: 'center',
    marginTop: 90
  },
  text: {
    fontSize: 18,
    padding: 5,
    marginTop: 20,
    justifyContent: 'space-between',
    marginTop: 5,
    alignSelf: 'center',


  }
});
