import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, TextInput, Image, AsyncStorage } from 'react-native';
import Utility from '../assets/Utility'
export default class OrderView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOrderPlaced: false,
            UserOrders: null
        }
    }

    componentDidMount() {
        let mContext = this
        this._subscribe = this.props.myProps.navigation.addListener('didFocus', () => {
            Utility.sinstance.getLastUser().then((email) => {
                Utility.sinstance.getItemForKey("order_" + email).then((mOrder) => {
                    
                    if (mOrder == undefined || mOrder == null) {
                        mContext.setState({ isOrderPlaced: false });
                    } else {
                        var mOrde = JSON.parse(mOrder)
                        
                        mContext.setState({ UserOrders: mOrde, isOrderPlaced: true })
                    }
                })
            })
        })
    }


    render() {

        return (

            <View style={{ flex: 1, marginTop: 100, marginBottom: 20 }}>
                {this.state.isOrderPlaced == true ?
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <Text style={{ color: '#000000', fontSize: 18, fontWeight: 'bold' }} >Total number of order placed:{this.state.UserOrders.noOfOrders}</Text>

                        {this.state.UserOrders.listOfOrder.map((item, index) => {

                            return (
                                <View style={{marginTop:20}}>
                                 <Text style={{ color: '#000000', fontSize: 18, fontWeight: 'bold' }}>Summery of {index+1} order</Text> 
                                {item.map((item1, ind) => {
                                    return (
                                        <View style={{ flexDirection: 'column',marginTop:10 }}>
                                            {/* <Text style={{ color: '#000000', fontSize: 18, fontWeight: 'bold' }}>Summery of {ind} order</Text> */}
                                            <View style={{ flexDirection: 'row' ,width:'100%'}}>
                                                <Text style={{ color: '#000000', fontSize: 18, fontWeight: 'bold',flex:.5 }}> Name:{item1.Name} </Text>
                                                <Text style={{ color: '#000000', fontSize: 18, fontWeight: 'bold' ,flex:.5}}>Quantity:{item1.qty} </Text>
                                            </View>
                                        </View>
                                    )
                                })}
                                </View>
                            )
                            

                            
                        })}
                    </View>
                    :
                    <Text>No Order</Text>
                }
            </View>

        )
    }

}



