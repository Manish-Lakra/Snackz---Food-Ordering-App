import React from "react";
import { View } from "react-native";
import {
  createAppContainer,
  TabNavigator,
  TabBarBottom,
  createStackNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";

import CustomHeader from "../components/CustomHeader";
import HeaderStyles from "../headerStyles";
import Login from '../screens/user/Login';
import Splash from '../screens/user/Splash';
import Signup from '../screens/user/Signup';
import Profile from '../screens/user/Profile';
import ForgetPassword from '../screens/user/ForgetPassword';
import Camera from '../screens/user/Camera';
import Home from '../screens/Home/Home';
import Cart from '../screens/Home/Cart';
import FinalCart from '../screens/FinalCart'
import OrderDeliveryBar from '../screens/OrderDeliveryBar'
import SecurityQuestions from '../screens/user/SecurityQuestions';


let headerDefaultNavigationConfig = {
  header: props => <CustomHeader {...props} />,
  ...HeaderStyles
};

const MainNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerLeft: null,
        headerTitle: "Login"
      }
    },
    Signup: {
      screen: Signup,
      navigationOptions: {
        headerTitle: "Signup"
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        headerTitle: "Profile"
      }
    },
    ForgetPassword: {
      screen: ForgetPassword,
      navigationOptions: {
        headerTitle: "Reset Password"
      }
    },
    Home: {
      screen: Home,
      navigationOptions: {
        headerTitle: "HOME",
        header: null,

      }
    },
    Splash: {
      screen: Splash,
      navigationOptions: {
        headerLeft: null,
        headerTitle: null
      }
    },
    Cart: {
      screen: Cart,
      navigationOptions: {
        
        headerTitle: "Cart"
      }
    },
    Camera: {
      screen: Camera,
      navigationOptions: {
        
        headerTitle: "Camera"
      }
    },
    FinalCart: {
      screen: FinalCart,
      navigationOptions: {
        headerTitle: "Order Summery"
      }
    },
    OrderDeliveryBar: {
      screen: OrderDeliveryBar,
      navigationOptions: {
        headerTitle: "Order Status"
      }
    },

    SecurityQuestions: {
      screen: SecurityQuestions,
      navigationOptions: {
        headerLeft: null,
        headerTitle: "Security Questions"
      }
    }
  },
  
  
  {
    initialRouteName:'Splash',
    navigationOptions: {
      ...headerDefaultNavigationConfig
    }
  }
);



export default createAppContainer (MainNavigator);
