import React from 'react';
import { StyleSheet, Text, View, Dimensions, Picker } from 'react-native';
import {Image} from "react-native-elements"
import {ImagePicker, Constants} from "expo";
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import Toolbar from './Toolbar';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

const { width: winWidth, height: winHeight } = Dimensions.get('window');
const url = "http://shahidikram0701.pythonanywhere.com/style_image_with_emotion"

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
        loading: false,
        mood: "Choose any emotion",
        uri1: "",
        uri2: "",
        uri3: ""
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
    },
    pickerStyle:{  
        height: 150,  
        width: "80%",  
        color: '#344953',  
        justifyContent: 'center',  
    }  
  });

  componentDidMount() {
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

  async hackItUp(data) {
    console.log("Clicked", data.emotion)
    const {navigate} = this.props.navigation;
    this.setState({loading: true})
    // const response = await fetch(url).then(res => res.json()).then(res => console.log(res))
    const response = await fetch(url,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    this.setState({loading: false}, () => navigate("Result",{
      uri1: `http://shahidikram0701.pythonanywhere.com/static/content_image.jpg?query=${Math.random()}`,
      uri2: `http://shahidikram0701.pythonanywhere.com/static/style.jpg?query=${Math.random()}`,
      uri3: `http://shahidikram0701.pythonanywhere.com/static/generated_image.jpg?query=${Math.random()}`
    }))
  }

  render() {
    const { hasCameraPermission, flashMode, cameraType, capturing } = this.state;
    if (hasCameraPermission === null) {
        return <View />;
    } else if (hasCameraPermission === false) {
        return <Text>Access to camera has been denied.</Text>;
    }
    else if(this.state.capturedPhoto) {
      if(this.state.loading) {
        return (
        <View style={this.styles.container}>
          <Text style={{fontSize: 20, fontStyle: "italic", fontWeight: "bold"}}>Hacking it up for you...</Text>
          <PacmanIndicator color="#201f45" />
        </View>)
      }
      else return (
        <View style={this.styles.container}>
          <Image source={{uri: this.state.capturedPhoto}} style={{ width: 400, height: 400}} PlaceholderContent={<SkypeIndicator color="#201f45" />}/>
          <View style={{marginTop: 20}}>
          <Text style={{fontSize: 20}}>Pick an emotion</Text>
            <Picker
                style={this.styles.pickerStyle} 
                selectedValue={this.state.mood}
                style={{height: 50, width: 100}}
                onValueChange={(itemValue) =>
                    this.setState({mood: ""}, () => this.setState({mood: itemValue}, () => this.hackItUp({image: this.state.captures[0].base64, emotion: this.state.mood})))
                }>
                <Picker.Item label="🎈 Choose an emotion" value="choose" />
                <Picker.Item label="😡 anger" value="anger" />
                <Picker.Item label="🙄 contempt" value="contempt" />
                <Picker.Item label="😣 disgust" value="disgust" />
                <Picker.Item label="😨 fear" value="fear" />
                <Picker.Item label="😱 surprise" value="surprise" />
                <Picker.Item label="😶 neutral" value="neutral" />
                <Picker.Item label="😢 sadness" value="sadness" />
                <Picker.Item label="😀 happiness" value="happiness" />
                <Picker.Item label="🎰 random" value="random" />
            </Picker>
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
