import React, { Component } from 'react';
import { ScrollView, Platform, StyleSheet, Text, View, FlatList, TextInput, Image, TouchableOpacity } from 'react-native';
import Header from './Header';
import AsyncStorage from '@react-native-community/async-storage'
import data from '../assets/products'
import { Dialog } from 'react-native-simple-dialogs';
import Utility from '../assets/Utility';


export default class HomeView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isListType: 1,
            temp: 0,
            mListOfItems: [],
            dialogVisible: false,
            clickedItemIndex: 0,
            email: '',
            CartCounter: 0,
            searchBar : ''
        }
    }

    componentDidMount() {
        this._subscribe = this.props.myProps.navigation.addListener('didFocus', () => {
            Utility.sinstance.getLastUser().then((value) => {
                AsyncStorage.getItem("list_of_items" + value).then((mList) => {
                    var mValue = JSON.parse(mList);
                    this.setState({ mListOfItems: mValue });
                    let mCounter = 0;
                    for (var i = 0; i < this.state.mListOfItems.length; i++) {
                        if (this.state.mListOfItems[i].qty > 0) {
                            mCounter = mCounter + this.state.mListOfItems[i].qty
                        }
                    }
                    this.setState({
                        CartCounter: mCounter
                    })
                })
            })
        });
    }

   

    GetItem(context, index) {
        context.setState({
            clickedItemIndex: index,
            dialogVisible: true
        })
    }

    setListInAsynk(context) {
        var mList = JSON.stringify(context.state.mListOfItems);
        Utility.sinstance.getLastUser().then((email) => {
            AsyncStorage.setItem("list_of_items" + email, mList);
        })
        
        let mCounter = 0;
        for (var i = 0; i < this.state.mListOfItems.length; i++) {
            if (this.state.mListOfItems[i].qty > 0) {
                mCounter = mCounter + this.state.mListOfItems[i].qty
            }
        }
        this.setState({
            CartCounter: mCounter
        })

    }

    getListView(self) {

        return (

            <FlatList
                data={this.state.mListOfItems}
                ItemSeparatorComponent={self.FlatListItemSeparator}
                renderItem={({ item, index }) =>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', width: '100%', paddingRight: 5, height:270 }}>
                        <TouchableOpacity onPress={() => { this.GetItem(this, index) }} style={{ width: '100%', height: 180 }}>
                            <Image
                                source={data[item.Image]} resizeMethod='auto' style={styles.imageView} />
                        </TouchableOpacity>
                        <View style={{ paddingLeft: (self.state.isListType == 1 ? 10 : 0), flexDirection: 'row', marginTop: 15, width: '100%', marginLeft: 10 }}>
                            <View style={{ flex: 1 }}>
                                <Text onPress={self.GetItem.bind(self, item.Discription)} style={{ fontWeight: 'bold', fontSize: 16 }} >{item.Name}</Text>
                                <Text>Cost : {item.Cost}</ Text>
                                <Text>Discount:{item.Discount}%</Text>
                            </View>

                            {this.state.mListOfItems[index].qty == 0 ?
                                <TouchableOpacity onPress={() => {
                                    item.qty = (item.qty + 1)
                                    this.state.mListOfItems[index] = item
                                    this.setState({ mListOfItems: this.state.mListOfItems })
                                    this.setListInAsynk(this)
                                }} style={{ flex: 1, backgroundColor: '#565656', justifyContent: 'center', alignItems: 'center', height: 60, width: 40}}>
                                    <View style={{ fontSize: '14', fontStyle: 'bold', height: 20, width: 30 }}>
                                        <Text>ADD</Text>
                                    </View>
                                </TouchableOpacity>
                                :
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => {
                                        item.qty = (item.qty - 1)
                                        this.state.mListOfItems[index] = item
                                        this.setState({ mListOfItems: this.state.mListOfItems })
                                        this.setListInAsynk(this)
                                    }}>
                                        <Image style={{ height: 25, width: 25, tintColor: 'red' }} source={require('../assets/Icons/subtr.png')} />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 18 }}>{self.state.mListOfItems[index].qty}</Text>
                                    <TouchableOpacity onPress={() => {
                                        item.qty = (item.qty + 1)
                                        self.state.mListOfItems[index] = item
                                        self.setState({ mListOfItems: self.state.mListOfItems })
                                        this.setListInAsynk(this)
                                    }}>
                                        <Image style={{ height: 25, width: 25, tintColor: 'green' }} source={require('../assets/Icons/add.png')} />
                                    </TouchableOpacity>
                                </View>
                            }

                        </View>

                    </View>

                }
                numColumns={self.state.isListType}
                key={(this.state.isListType + 1)}
                keyExtractor={(item, index) => index}
                extraData={this.state}
            />

        )
    }


    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 0.5,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    }

    changeListType(self, isList) {

        if (isList == true) {
            self.setState({
                isListType: 1
            })
        } else {
            self.setState({
                isListType: 2
            })
        }
    }

    render() {
        var context = this
        return (

            <View style={styles.container} >
                <Header myProps={this.props.myProps} mCounter={this.state.CartCounter}  viewType={(isList) => { this.changeListType(this, isList) }} />
                {this.getListView(this)}
                <Dialog
                    visible={this.state.dialogVisible}
                    title="Product Description"
                    onTouchOutside={() => this.setState({ dialogVisible: false })} >
                    <View>
                        {this.state.mListOfItems.length > 0 ? <Text>{this.state.mListOfItems[this.state.clickedItemIndex].Discription}</Text>
                            : null
                        }
                    </View>
                </Dialog>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

    },
    MainContainer: {

        justifyContent: 'center',
        flex: 1,
        margin: 7,


    },

    imageView: {
        marginTop: 15,
        width: '100%',
        height: 180,
        margin: 7,
        borderRadius: 7

    },

    textView: {

        width: '100%',
        textAlignVertical: 'center',
        padding: 10,
        color: '#000',
        marginTop: 20

    },
    button: {

        margin: 10,
        marginLeft: 19,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        backgroundColor: '#E8290B',
        borderRadius: 50,
        color: 'white'



    },
    qtyBar: {
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        backgroundColor: 'white'
    },
    ButtonStyle: {
        marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#FF9800',
        width: '100%',
        height: 50
    }

})