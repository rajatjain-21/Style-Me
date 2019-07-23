import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Dimensions, ActivityIndicator } from 'react-native';
import {Image} from "react-native-elements"
import {ImagePicker, Constants} from "expo";
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import Toolbar from './Toolbar';

const { width: winWidth, height: winHeight } = Dimensions.get('window');
const url = "http://shahidikram0701.pythonanywhere.com/style_image"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    camera = null
    this.state = {
      captures: [],
        // setting flash to be turned off by default
        flashMode: Camera.Constants.FlashMode.off,
        capturing: null,
        // start the back camera by default
        cameraType: Camera.Constants.Type.back,
        hasCameraPermission: null,
        capturedPhoto: null,
        loading: false
    };
  }
  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    preview: {
      height: winHeight,
      width: winWidth,
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    buttonContainer: {
      flexDirection: "row",
      marginTop: 15
    },
    button: {
      // width: "40%"
    }
  });

  componentDidMount() {
    this.getGalleryPermissionAsync()
    this.getCameraPermissionAsync()
  }
    setFlashMode = (flashMode) => {
      this.setState({ flashMode })
    };
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });

    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    };

    handleShortCapture = async () => {
      this.setState({capturing: false})
        const photoData = await this.camera.takePictureAsync({base64: true, skipProcessing: true});
        this.setState({ capturedPhoto: photoData.uri, captures: [photoData, ...this.state.captures] }, () => {
          
        })
    };

    handleLongCapture = async () => {
        const videoData = await this.camera.recordAsync();
        this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
    };

  getCameraPermissionAsync = async() => {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');
    this.setState({ hasCameraPermission });
  }
  getGalleryPermissionAsync = async() => {
    if(Constants.platform.android) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if(status!=="granted") {
        Alert.alert("Sorry, we could not access permissions")
      }
    }
  }

  async hackItUp(data) {
    console.log("Clicked")
    this.setState({loading: true})
    // const response = await fetch(url).then(res => res.json()).then(res => console.log(res))
    const response = await fetch(url,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((resp) => console.log(resp))
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
    const { hasCameraPermission, flashMode, cameraType, capturing } = this.state;
    if (hasCameraPermission === null) {
        return <View />;
    } else if (hasCameraPermission === false) {
        return <Text>Access to camera has been denied.</Text>;
    }
    else if(this.state.capturedPhoto) {
      return (
        <View style={this.styles.container}>
          <Image source={{uri: this.state.capturedPhoto}} style={{ width: 400, height: 400}} PlaceholderContent={<ActivityIndicator />}/>
          <View style={this.styles.buttonContainer}>
            <View><Button style={this.styles.button} title="Go back to camera" onPress={() => this.setState({capturedPhoto: null})} /></View>
            <View style={{marginLeft: 10}}><Button style={this.styles.button} title="Hack it up" onPress={() => this.hackItUp({image: this.state.captures[0].base64})} /></View>
          </View>
        </View>
      )
    }
    else return (
      <React.Fragment>
      <View style={this.styles.container}>
        {/* <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        /> */}
        {/* <Text>{this.state.text.split(' ').map((word) => word && '🍕').join(' ')}</Text> */}
        {/* <Button
          onPress={this.pickImage}
          title="Pick an image from camera roll"
        />
        {this.state.image && <Image style={this.styles.image} source={{uri: this.state.image}} style={{ width: 200, height: 200}} />} */}
        <Camera
          type={cameraType}
          flashMode={flashMode}
          style={this.styles.preview}
          ref={camera => this.camera = camera}
        />
        {/* <Button title="Generate Mood" /> */}
      </View>
      <Toolbar 
          capturing={capturing}
          flashMode={flashMode}
          cameraType={cameraType}
          setFlashMode={this.setFlashMode}
          setCameraType={this.setCameraType}
          onCaptureIn={this.handleCaptureIn}
          onCaptureOut={this.handleCaptureOut}
          onLongCapture={this.handleLongCapture}
          onShortCapture={this.handleShortCapture}
      />
      </React.Fragment>
    );
  }
}
