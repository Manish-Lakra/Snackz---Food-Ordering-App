import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, TextInput, Image, TouchableOpacity } from 'react-native';
import SearchBar from 'react-native-searchbar'
import data from '../assets/products'

export default class Header extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isListView: false,
            results: '',
            CardCounter: 0
        }
    }

    onChangeTextSearchBar = (text) => {

        let products = [];
        if (text.length > 0) products = Data.products.filter(obj => obj.name.toLowerCase().includes(text.toLowerCase()))
        if (text.length == 0 && products.length == 0) products = Data.products
        this.setState({ name: text, data: products })

    }

    static getDerivedStateFromProps(props, state) {
        debugger
        return {
            CardCounter: props.mCounter
        }
    }

    componentDidMount() {
        this.searchBar.hide()
    }

    clickedOnSearchIcon(self) {

        this.searchBar.show()

    }
    clickedOnCart() {

    }
    clickedOnGrid(self) {
        self.setState({
            isListView: false
        })
        self.props.viewType(true)
    }
    clickOnList(self) {
        self.setState({
            isListView: true
        })
        self.props.viewType(false)
    }

    _handleResults(results, self) {
        self.setState({ results });
    }



    render() {

        const items = [data.fooditems];

        return (
            <View style={styles.container} >
                <SearchBar
                    ref={(ref) => this.searchBar = ref}
                    data={items}
                    handleChangeText={(input) => {
                        console.log(input)
                    }}
                    handleSearch={(input) => {

                        let products = [];
                        if (input.length > 0) products = data.fooditems.filter(obj => obj.Name.toLowerCase().includes(input.toLowerCase()))
                        if (input.length == 0 && products.length == 0) products = data
                        // this.setState({ name: text, data: products })
                        this._handleResults(products, this)
                    }}
                    // handleResults={this._handleResults([], this)}
                    showOnLoad

                />
                <Text style={styles.title}>Food Menu</Text>
                <View style={styles.icons}>
                    <TouchableOpacity onPress={() => { this.clickedOnSearchIcon(this) }} style={{ marginRight: 10 }}>
                        <Image source={require('../assets/Icons/search.png')} />
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => {
                        this.props.myProps.navigation.navigate('Cart')
                    }} style={{ marginRight: 10 }}>
                        <Text style={{ zIndex: 1, position: 'absolute', right: 0, top: -5, color: '#FAFAFA', fontSize: 16, backgroundColor: '#D2691E', fontWeight: 'bold' }}>{this.state.CardCounter}</Text>
                        <Image source={require('../assets/Icons/cart.png')} />
                    </TouchableOpacity >
                    {
                        this.state.isListView === true ?
                            <TouchableOpacity onPress={() => { this.clickedOnGrid(this) }}>
                                <Image source={require('../assets/Icons/icon_List.png')} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { this.clickOnList(this) }}>
                                <Image source={require('../assets/Icons/grid.png')} />
                            </TouchableOpacity>
                    }
                </View>
            </View>
        )


    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 35,
        height: 56,
        width: '100%',
        backgroundColor: '#D2691E',
        alignItems: 'center',

    },
    title: {
        marginLeft: 20,
        fontSize: 16,
        flex: 3
    },
    icons: {
        flex: 2,
        flexDirection: 'row'
    }
})