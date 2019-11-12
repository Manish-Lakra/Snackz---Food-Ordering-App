import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert,TextInput} from 'react-native';
import SecurityQues from '../../components/SecurityQues';
import {  TouchableOpacity } from 'react-native-gesture-handler';
import Utility from '../../assets/Utility';



type Props = {};
export default class ForgetPassword extends Component<Props> {
 
    constructor(props) {
      super(props)
      this.state = {
        Email: '',
        Q1 : '',
        Q2 :'',
        A1 : '',
        A2 : ''
      }
      
    }
    
    render() {
    return (
      <View style={styles.container}>
      <View style={styles.popup}>
      <Text>Enter Your Email Address</Text>
      <TextInput style={styles.textInput}
        placeholder="Email"
        onChangeText={(Email) => this.setState({Email})}
      />

        <SecurityQues  style={styles.dropdown} onChangeQuestion={(Q1) => this.setState({Q1})} onChangeAnswer={(A1) => this.setState({A1})}  />
        <SecurityQues style={styles.dropdown} onChangeQuestion={(Q2) => this.setState({Q2})} onChangeAnswer={(A2) => this.setState({A2})}  />

       
        </View>
<View>
        <TouchableOpacity style={styles.button} onPress={async() =>{
         
        fetchedData= await Utility.sinstance.getItemForKey(this.state.Email)
         if(fetchedData.Q1 == this.state.Q1 && 
          fetchedData.A1 == this.state.A1 && 
          fetchedData.Q2 == this.state.Q2 && 
          fetchedData.A2 == this.state.A2 )
          
          
          {
          Alert.alert('Your Password  : '+ fetchedData.Password);
         }else{
              Alert.alert('Please enter correct data')
         }
        }}>
          <Text style={{fontSize:20, color:'white'}}  > Submit </Text>
        </TouchableOpacity>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  dropdown:{
    justifyContent: 'center',
    alignItems: 'center',
    width:'80%',
    height:40
  },
  popup: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    backgroundColor: '#e67e2299',
    height: '60%',
    width: '80%',
    shadowOpacity: 1.0,
    shadowColor: 'gray',
    borderRadius: 20
    
  }, 
  button:{
    width: 200,
        height: 55,
        backgroundColor:'#e67e22',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 40,
        marginLeft:80
  },
  textInput: {
    backgroundColor: 'white',
    width:200,
    height:40,
    borderRadius: 8
  }
});
