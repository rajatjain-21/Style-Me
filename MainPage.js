import React from 'react';
import {Text, StyleSheet, View, Alert, Button} from "react-native";
import {Icon} from "react-native-elements"
import {ImagePicker, Constants} from "expo";
import * as Permissions from 'expo-permissions';
export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        image: null
    }
  }
  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#201f45',
      alignItems: 'center',
      justifyContent: 'center'
    },
    baseText: {
      fontFamily: 'Cochin',
    },
  });
  componentDidMount() {
    this.getGalleryPermissionAsync()
  }

  getGalleryPermissionAsync = async() => {
    if(Constants.platform.android) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if(status!=="granted") {
        Alert.alert("Sorry, we could not access permissions")
      }
    }
  }

  pickImage = async() => {
    const {navigate} = this.props.navigation;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowEditing: true,
      aspect: [4, 3],
      base64: true
    })
    if(!result.cancelled) {
      this.setState({image: result.uri}, () => navigate('FromGallery', {
          image: result
      }))
    }
  }
  
  render() {
    const {navigate} = this.props.navigation;
    return (
        <View style={this.styles.container}>
            <Text style={{fontSize: 60, fontWeight: "bold", color: "white",fontFamily: "sans-serif-condensed"}}>Style Me</Text>
            <Text style={{fontSize: 20, fontStyle: "italic", color: "white"}}>A solution to your styling needs</Text>
            <View style={{marginTop: 60, flexDirection: "row"}}>
                <View><Icon name='camera' size={40} type='font-awesome' color="#fff" onPress={() => navigate("Camera")} /></View>
                <View style={{marginLeft: 50}}><Icon name='file' size={40} color="#fff" type='font-awesome'  onPress={this.pickImage} /></View>
                {/* <Button icon="add-a-photo" /> */}
            </View>
        </View>
    )
  }
}