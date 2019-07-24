import React from 'react';
import {Text, StyleSheet, View, Alert, Button} from "react-native";
import {Icon, Image} from "react-native-elements"
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
      backgroundColor: '#CC6751',
      alignItems: 'center',
      justifyContent: 'center'
    }
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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowEditing: true,
      aspect: [4, 3]
    })
    console.log(result)
    if(!result.cancelled) {
      this.setState({image: result.uri})
    }
  }
  
  render() {
    const {navigate} = this.props.navigation;
    if(this.state.image) {
        return (
            <View>
                <Image style={this.styles.image} source={{uri: this.state.image}} style={{ width: 400, height: 400}} />
                <Button title="Hack it up" />
            </View>
        )
    }
    else return (
        <View style={this.styles.container}>
            <Text style={{fontSize: 40, fontWeight: "bold", color: "white"}}>Awesome App</Text>
            <View style={{marginTop: 25}}>
                <Icon name='camera' reverse reverseColor="white" size={40} type='font-awesome' raised onPress={() => navigate("Camera")} />
                <Icon name='search' reverse reverseColor="white" size={40} type='font-awesome' raised onPress={this.pickImage} />
            </View>
        </View>
    )
  }
}