import React, { Component } from 'react';
import { ScrollView, Platform, StyleSheet, Text, View, Button, ImageBackground, Alert, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomText from '../../components/CustomText';
import { Icons as Icon } from '../../assets/Icons';
import Utility from '../../assets/Utility'


export default class Login extends Component {




  constructor(props) {
    super(props)
    this.state = {
      Email: '',
      Password: ''
    }
  }


  loginPressed(thisPage) {
    if (this.state.Email != '') {
      if (this.state.Password != '') {
        Utility.sinstance.getUser(thisPage.state.Email).then((mUser) => {
          if (mUser != undefined && mUser != null) {
            Utility.sinstance.setSession(this.state.Email, true);
            Utility.sinstance.saveLastUser(this.state.Email);
            this.props.navigation.navigate('Home');
          } else {
            alert("Please enter correct user name and password.")
          }

        })
      } else {
        alert("Please enter password")
      }
    } else {
      alert("Please enter email id.")
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.container}>
          <ImageBackground source={require("../../assets/banners/waffle.jpg")} style={{ width: '100%', height: '100%' }}>


            <View style={{ flex: 0.4 }}></View>


            <View style={styles.lumoScreen}>

              <CustomText style={styles.textinput}
                lefticon={{ source: Icon.email }}
                placeholder='Email '
                onChangeText={(Email) => this.setState({ Email })} />

              <CustomText secureTextEntry={true} style={styles.textinput}
                lefticon={{ source: Icon.password }}
                placeholder='Password'
                onChangeText={(Password) => this.setState({ Password })} />

            </View>
            <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity style={styles.button}
                onPress={async () => {
                  this.loginPressed(this);
                }}>
                <Text style={{ color: 'white', fontSize: 20 }}>
                  Login</Text>
              </TouchableOpacity>
              <Button
                title='Forget Password'
                onPress={() => { this.props.navigation.navigate('ForgetPassword') }}
              />
              <Button
                title='Signup'
                onPress={() => { this.props.navigation.navigate('Signup') }}
              />
            </View>

          </ImageBackground>

          <View>

          </View>
        </View>
      </ScrollView>
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
  lumoScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF15',

  },
  textinput: {
    flex: 0.17,
    paddingLeft: 10,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'black',
    marginTop: 10,
    marginBottom: 15,
    margin: 20,
    backgroundColor: '#FFFFFF',
    width: '80%',
    height: 18,
    borderRadius: 10

  },

  button: {
    backgroundColor: '#777E8B',
    borderRadius: 10,
    width: 200,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'


  }

});
