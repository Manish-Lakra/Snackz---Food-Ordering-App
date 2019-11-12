import React, { Component } from 'react';
import { ScrollView,KeyboardAvoidingView,Platform, StyleSheet, Text, View, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import CustomText from '../../components/CustomText';
import { Icons as Icon } from '../../assets/Icons';
import Utility from '../../assets/Utility'
import {validEmail} from '../../components/Validation'

export default class Signup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      Uid: '',
      Name: '',
      Email: '',
      Password: '',
      Phone: '',
      Q1: '',
      A1: '',
      Q2: '',
      A1: '',
    }
  }



  render() {
    //const { navigate } = this.props.navigation;
    return (
    
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps='handled'
    >      
        <ImageBackground source={require("../../assets/banners/waffle.jpg")} style={{ width: '100%', height: '100%' }}>
          
    
          <View style={{ flex:1 }}>
          <View style={{ Flex: 0.2 }}>
            <Text style={styles.heading}>SignUp</Text>
          </View>


          <View style={{ flex: 0.8 }}>
            <CustomText style={styles.textinput}
              lefticon={{ source: Icon.email }}
              placeholder='Name '
              onChangeText={(Name) => this.setState({ Name })} />

            <CustomText style={styles.textinput}
              lefticon={{ source: Icon.email }}
              placeholder='Email '
              onChangeText={(Email) =>   this.setState({ Email })} 
              
              />


            <CustomText secureTextEntry={true} style={styles.textinput}
              lefticon={{ source: Icon.email }}
              placeholder='Password '
              onChangeText={(Password) => this.setState({ Password })} />

            <CustomText style={styles.textinput}
              lefticon={{ source: Icon.email }}
              placeholder='Phone '
              onChangeText={(Phone) => this.setState({ Phone })} />




            <View style={{ flex: 0.2 }}>
              <TouchableOpacity style={styles.button}

                onPress={() => {

                  if (!this.checkValidation()) {
                    Alert.alert('All Fields are Mandatory')
                    return
                  }
                  if(validEmail(this.state.Email)){
                    this.props.navigation.navigate('SecurityQuestions', {
                      Name: this.state.Name,
                      Email: this.state.Email,
                      Password: this.state.Password,
                      Phone: this.state.Phone
                    })

                  }
                  
                }}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>SignUp</Text>
              </TouchableOpacity>

            </View>

          </View>
          </View>
     
        </ImageBackground>
   
      </ScrollView>
   
    
    );
  }
  checkValidation = () => {
    const { Name, Email, Password, Phone } = this.state
    if (!Name || !Email || !Password || !Phone) {
      return false;
    } else
      return true;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  textinput: {

    paddingLeft: 10,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'black',
    marginTop: 20,
    marginBottom: 15,
    margin: 20,
    backgroundColor: '#FFFFFF50',
    width: '80%',
    height: 55,
    borderRadius: 10,
    alignSelf: 'center'

  },

  heading: {
    color: '#777E8B99',
    fontSize: 40,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20
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
  }

});
