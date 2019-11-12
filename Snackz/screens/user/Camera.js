import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, AppRegistry, PixelRatio, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Utility from '../../assets/Utility';




export default class camera extends Component {

  state = {

    ImageSource: null,

  };



  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 1000,
      maxHeight: 1000,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        debugger
        this.setState({

          ImageSource: source

        });
        Utility.sinstance.getLastUser().then((email) => {
          Utility.sinstance.setItemForKey("user_image" + email, source);
        })
      }
    });
  }


  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>

          <View style={styles.ImageContainer}>

            {this.state.ImageSource === null ? <Text>Select a Photo</Text> :
              <Image style={styles.ImageContainer} source={this.state.ImageSource} />
            }

          </View>

        </TouchableOpacity>

      </View>
    );
  }

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8E1'
  },

  ImageContainer: {
    borderRadius: 10,
    width: 250,
    height: 250,
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDDC39',

  },

});

AppRegistry.registerComponent('Snackz', () => Snackz);
