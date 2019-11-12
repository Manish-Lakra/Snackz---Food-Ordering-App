import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, TextInput, Image } from 'react-native';


import { Swiper, TitleBar, TabBar } from 'react-native-awesome-viewpager';
import HomeView from '../../components/HomeView';
import OrderView from '../../components/OrderView';
import Login from '../user/Login';
import Profile from '../user/Profile';


export default class Home extends Component {


  componentWillMount() {
    const { navigation } = this.props;
    // const emailid = navigation.getParam('emailid', 'null')
    // this.setState({ emailid })



    // Utility.sinstance.getItemForKey('EMAIL_ID').then((emailid) => {
    //   if (emailid) {
    //     Utility.sinstance.authenticateUser(emailid)
    //   }
    // })


    
  }



  constructor(props) {
    super(props)
    this.state = {
      rowView: 'true',
      columnView: 'false',
      noOfColumns: '',
      count: 0,
      emailid: ''

    }
  }

  
  

  render() {
    return (
      <View style={styles.container}>
        <TabBar
          style={styles.container}
          tabs={[{
            text: 'Home',
            icon: require('../../assets/Icons/home.png'),
            selectedIcon: require('../../assets/Icons/home.png')
          }, {
            text: 'Order',
            icon: require('../../assets/Icons/order.png'),
            selectedIcon: require('../../assets/Icons/order.png')
          }, {
            text: 'Profile',
            icon: require('../../assets/Icons/profile.png'),
            selectedIcon: require('../../assets/Icons/profile.png')
          }
          ]}>
          <View>
            <HomeView myProps = {this.props} />
          </View>
          <View>
            <OrderView myProps = {this.props}/>
          </View>
          <View>
            <Profile myProps = {this.props}/>
          </View>
          
        </TabBar>
      </View>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom:10,
    
  },
  footer: {
    backgroundColor: 'brown'
  }
})