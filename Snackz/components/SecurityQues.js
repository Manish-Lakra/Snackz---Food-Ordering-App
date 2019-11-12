import React, { Component } from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import { View, StyleSheet} from 'react-native';
import CustomText from './CustomText'
 //import Question from '../components/Question'
 export default class SecurityQues extends Component {
    constructor(props){
        super(props)
        this.state = {
          
          Q1:'',
          A1:'',

        }
      }
  
  
    render() {

      let Question = [{
        "value": "What Is your Novel ?",
      }, {
        "value": "What is the name of the city you grew on ?",
      }, {
        "value": "What is your Sister’s  name?",
      }, {
        "value": "What was the name of your first pet?",
      }, {
        "value": "What was the first School that you Studied ?",
      }, {
        "value": "Where did you meet your girlFriend ?",
      }, {
        "value": "Where did you go to high college?",
      }, {
        "value": "What is your favorite Timepass Activity ?",
      }, {
        "value": "What city were you born in?",
      }, {
        "value": "Where you spent your last vacation?",
      }];
 
    return (
      <View>
      <Dropdown
        label='Security Question'
        data={Question}
        onChangeText = {(Q1)=>this.props.onChangeQuestion(Q1) }
      />
      <CustomText style={styles.textinput}
      placeholder = 'Answer'
      onChangeText = {(A1) => {
        this.props.onChangeAnswer(A1)
      }}>
      </CustomText>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  textinput: {
    width:'80%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderRadius: 10
  }
});