import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import SecurityQues from '../../components/SecurityQues';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Utility from '../../assets/Utility'



export default class SecurityQuestions extends Component {

  constructor(props) {
    super(props)
    this.state = {
      Uid: '',
      Name: this.props.navigation.state.params.Name,
      Email: this.props.navigation.state.params.Email,
      Password: this.props.navigation.state.params.Password,
      Phone: this.props.navigation.state.params.Phone,
      Q1: '',
      Q2: '',
      A1: '',
      A2: '',
    }

  }

  render() {
    return (

      <View style={styles.container}>
        <View style={styles.popup}>
          <SecurityQues style={styles.dropdown} onChangeQuestion={(Q1) => this.setState({ Q1 })} onChangeAnswer={(A1) => this.setState({ A1 })} />
          <SecurityQues style={styles.dropdown} onChangeQuestion={(Q2) => this.setState({ Q2 })} onChangeAnswer={(A2) => this.setState({ A2 })} />
        </View>
        <TouchableOpacity onPress={async () => {
          Utility.sinstance.saveUser(this.state.Email, this.state);
          var mData = JSON.stringify(data.fooditems)
          debugger
          // Utility.sinstance.setCart(Utility.sinstance.saveLastUser(this.props.state), mData).then()
          AsyncStorage.setItem("list_of_items" + this.state.Email , mData, () => {
            Utility.sinstance.setSession(this.state.Email, true);
            Utility.sinstance.saveLastUser(this.state.Email);
            this.props.navigation.navigate('Home');
          })

        }}>
          <Text style={styles.button}  > Submit </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  dropdown: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 40
  },
  popup: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#e67e2299',
    height: '60%',
    width: '80%',
    shadowOpacity: 1.0,
    shadowColor: 'gray',
    borderRadius: 20

  },
  button: {
    height: 30,
    width: 60,
    backgroundColor: 'white',
    color: '#e67e22',
    marginTop: 50,
    alignSelf: 'center',
    borderRadius: 6,
    fontSize: 15
  }
});
