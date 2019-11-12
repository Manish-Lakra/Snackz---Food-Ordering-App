import React, { Component } from 'react';
import { Picker, Platform, StyleSheet, Text, View, FlatList, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import AsyncStorage from '@react-native-community/async-storage'
import { Dialog } from 'react-native-simple-dialogs';
import Utility from '../assets/Utility';
import  data from '../assets/products'

export default class FinalCart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            address: '',
            ListOfItems: [],
            dialogVisible: false,
            selectedIndex: 0,
            subTotal: 0,
            discount: 0,
            gst: 0
        }
    }

    componentDidMount() {
        var mList = []
        Utility.sinstance.getLastUser().then((email) => {

            AsyncStorage.getItem("list_of_items" + email).then((value) => {
                var mValue = JSON.parse(value);
                for (var i = 0; i < mValue.length; i++) {
                    if (mValue[i].qty > 0) {
                        mValue[i].value = mValue[i].Name
                        mList.push(mValue[i])
                    }
                }
                this.setState({ ListOfItems: mList }, () => { this.getSubTotal(this, mList) });
            })
        })

        AsyncStorage.getItem("address").then((value) => {
            this.setState({ address: value });
        })
    }

    clickedOnCheckout(mContext) {

        Utility.sinstance.getLastUser().then((email) => {
            
            Utility.sinstance.getItemForKey("order_" + email).then((mOrder) => {
                    
                if(mOrder==null||mOrder==undefined){
                        var mOrders_ = []
                        mOrders_.push(mContext.state.ListOfItems)
                        let mOrderOfUser = { "noOfOrders": 1, "listOfOrder": mOrders_}
                        Utility.sinstance.setItemForKey("order_" + email, JSON.stringify(mOrderOfUser));            
                    }else{
                        var mOrderOfUser = JSON.parse(mOrder);
                        var mListOrder = []
                        let mCountOfOrder = mOrderOfUser. noOfOrders
                        mCountOfOrder+=1;
                        mOrderOfUser.noOfOrders =  mCountOfOrder
                        mListOrder = mOrderOfUser.listOfOrder
                        mListOrder.push(mContext.state.ListOfItems)
                        mOrderOfUser.listOfOrder = mListOrder
                        Utility.sinstance.setItemForKey("order_" + email, JSON.stringify(mOrderOfUser));            
                    }
                    let mData = JSON.stringify(data.fooditems)
                    AsyncStorage.setItem("list_of_items"+email, mData)    
                    Alert.alert("Order placed")
                    this.props.navigation.navigate('OrderDeliveryBar')
            })
        })
    }


    getSubTotal(mContext, mList) {
        var subTotal = 0;
        var discount = 0;
        var gst = 0;
        for (var i = 0; i < mList.length; i++) {
            subTotal = subTotal + mList[i].Cost * mList[i].qty
            discount = discount + ((mList[i].Cost * mList[i].Discount) / 100) * mList[i].qty
        }
        gst = (subTotal * 5) / 100;
        mContext.setState({
            subTotal: subTotal,
            gst: gst,
            discount: discount
        })
    }

    selectedItem(mContext, value, index) {
        setTimeout(() => {
            mContext.setState({ dialogVisible: true, selectedIndex: index })
        }, 500);
    }


    orderPlaced() {
        AsyncStorage.setItem("isOrderPlaced", true);
    }

    render() {


        return (
            <View style={{ flexDirection: 'column', flex: 1 }}>

                <View style={{ margin: 10, width: '100%', flexDirection: 'column' }} >
                    <Text style={{ fontSize: 20 }}>Address:</Text>
                    <Text style={{ fontSize: 16, marginTop: 10, marginLeft: 20, marginRight: 20 }}>{this.state.address}</Text>
                </View>

                {/* <View style={{ margin: 10, width: '100%', flexDirection: 'row' }}>
                    <Text style={{ fontSize: 20, marginRight: 20, flex: 1 }}>{this.state.selectedIndex}</Text>
                </View> */}

                <Dropdown
                    label='Products'
                    data={this.state.ListOfItems}
                    containerStyle={{ marginLeft: 10, marginRight: 10 }}
                    onChangeText={(value, index, data) => { this.selectedItem(this, value, index, data) }}
                />


                <View style={{ margin: 10, width: '100%', flexDirection: 'row' }} >
                    <Text style={{ fontSize: 20 }}>Subtotal:</Text>
                    <Text style={{ fontSize: 20, marginLeft: 20, marginRight: 20 }}>{this.state.subTotal}</Text>
                </View>

                <View style={{ margin: 10, width: '100%', flexDirection: 'row' }} >
                    <Text style={{ fontSize: 20 }}>Discount:</Text>
                    <Text style={{ fontSize: 20, marginLeft: 20, marginRight: 20 }}>{this.state.discount}</Text>
                </View>

                <View style={{ margin: 10, width: '100%', flexDirection: 'row' }} >
                    <Text style={{ fontSize: 20 }}>GST:</Text>
                    <Text style={{ fontSize: 20, marginLeft: 20, marginRight: 20 }}>{this.state.gst}</Text>
                </View>

                <View style={{ margin: 10, width: '100%', flexDirection: 'row' }} >
                    <Text style={{ fontSize: 20 }}>Grand Total:</Text>
                    <Text style={{ fontSize: 20, marginLeft: 20, marginRight: 20 }}>{this.state.subTotal - this.state.discount + this.state.gst}</Text>
                </View>

                <Dialog
                    visible={this.state.dialogVisible}
                    title="Product Description"
                    onTouchOutside={() => this.setState({ dialogVisible: false })} >
                    {this.state.ListOfItems.length > 0 ?
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ flex: 1 }}>Name:</Text>
                                <Text style={{ flex: 1 }}>{this.state.ListOfItems[this.state.selectedIndex].value}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ flex: 1 }}>price:</Text>
                                <Text style={{ flex: 1 }}>{this.state.ListOfItems[this.state.selectedIndex].Cost}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ flex: 1 }}>Qty:</Text>
                                <Text style={{ flex: 1 }}>{this.state.ListOfItems[this.state.selectedIndex].qty}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ flex: 1 }}>Tax:</Text>
                                <Text style={{ flex: 1 }}>{(this.state.ListOfItems[this.state.selectedIndex].Discount) + "%"}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ flex: 1 }}>Total Price:</Text>
                                <Text style={{ flex: 1 }}>{(this.state.ListOfItems[this.state.selectedIndex].Cost) * (this.state.ListOfItems[this.state.selectedIndex].qty) - ((this.state.ListOfItems[this.state.selectedIndex].Cost) * (this.state.ListOfItems[this.state.selectedIndex].qty) * (this.state.ListOfItems[this.state.selectedIndex].Discount) / 100)}</Text>
                            </View>
                        </View>
                        :
                        null
                    }

                </Dialog>

                <TouchableOpacity onPress={() => { this.clickedOnCheckout(this) }} style={{ marginBottom: 20, position: 'absolute', bottom: 0, height: 50, width: '100%', backgroundColor: '#565656', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: '#FFFFFF' }}>Checkout</Text>
                </TouchableOpacity>

            </View>
        )
    }

}  