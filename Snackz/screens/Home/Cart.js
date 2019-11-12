import React, { Component } from 'react';
import { Platform, KeyboardAvoidingView, StyleSheet, Text, View, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { Dialog } from 'react-native-simple-dialogs';
import Utility from '../../assets/Utility';



export default class ForgetPassword extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ListOfItems: [],
      isItemSelected: false,
      dialogVisible: false,
      address: '',
      email: ''
    }
  }

  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      Utility.sinstance.getLastUser().then((value) => {
        AsyncStorage.getItem("list_of_items" + value).then((mList) => {
          var mValue = JSON.parse(mList);
          this.setState({ ListOfItems: mValue });
          this.isItemAvailable(mValue, this);
        })
      })
    })
  }

  setListInAsynk(context) {
    Utility.sinstance.getLastUser().then((value) => {
      var mList = JSON.stringify(context.state.ListOfItems);
      AsyncStorage.setItem("list_of_items" + value, mList);
      context.isItemAvailable(context.state.ListOfItems, context);
    })
  }

  isItemAvailable(mValue, context) {
    for (var i = 0; i < mValue.length; i++) {
      if (mValue[i].qty > 0) {
        context.setState({ isItemSelected: true })
        break
      }
    }
    if (i == mValue.length) {
      context.setState({ isItemSelected: false })
    }
  }


  openFinalCart() {
    if (this.state.address.length > 0) {
      AsyncStorage.setItem("address", this.state.address)
      this.setState({ dialogVisible: false }, () => {
        this.props.navigation.navigate('FinalCart')
      })

    } else {
      alert("Please provide address.")
    }
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <View style={{ marginBottom: 76, flex: 1 }}>
          {this.state.isItemSelected == true ?
            <FlatList
              data={this.state.ListOfItems}
              renderItem={({ item, index }) =>
                this.state.ListOfItems[index].qty > 0 ?
                  <View style={{ paddingLeft: 10, paddingRight: 10, width: '100%', height: 75, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ height: 70, width: 70 }} resizeMethod='contain' source={data[item.Image]} />
                    <Text style={{ fontSize: 16, flex: 2, paddingLeft: 10 }}>{item.Name}</Text>

                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity onPress={() => {
                        item.qty = (item.qty - 1)
                        this.state.ListOfItems[index] = item
                        this.setState({ ListOfItems: this.state.ListOfItems })
                        this.setListInAsynk(this)
                      }}>
                        <Image style={{ height: 25, width: 25, tintColor: 'red' }} source={require('../../assets/Icons/subtr.png')} />
                      </TouchableOpacity>
                      <Text style={{ fontSize: 18 }}>{this.state.ListOfItems[index].qty}</Text>
                      <TouchableOpacity onPress={() => {
                        item.qty = (item.qty + 1)
                        this.state.ListOfItems[index] = item
                        this.setState({ ListOfItems: this.state.ListOfItems })
                        this.setListInAsynk(this)
                      }}>
                        <Image style={{ height: 25, width: 25, tintColor: 'green' }} source={require('../../assets/Icons/add.png')} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  :
                  null
                // }
              }
              key={(this.state.isListType + 1)}
              keyExtractor={(item, index) => index}
              extraData={this.state}
            />
            :
            <View>
              <Text style={{ fontSize: 20, color: '#000000' }}>No item has been selected</Text>
            </View>
          }

        </View>
        {this.state.isItemSelected == true ?
          <TouchableOpacity onPress={() => { this.setState({ dialogVisible: true }) }} style={{ marginBottom: 20, position: 'absolute', bottom: 0, height: 50, width: '100%', backgroundColor: '#565656', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Place Order</Text>
          </TouchableOpacity>
          : null
        }

        <Dialog
          visible={this.state.dialogVisible}
          title="Address"
          onTouchOutside={() => this.setState({ dialogVisible: false })} >
          <TextInput
            style={{ height: 200, borderColor: 'gray', borderWidth: 1, fontSize: 18 }}
            onChangeText={(text) => this.setState({ address: text })}
            value={this.state.address}
            multiline={true}

          />

          <TouchableOpacity onPress={() => { this.openFinalCart(this) }} style={{ width: '100%', marginTop: 10, height: 40, backgroundColor: '#565656', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' }}> NEXT</Text>
          </TouchableOpacity>
        </Dialog>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
