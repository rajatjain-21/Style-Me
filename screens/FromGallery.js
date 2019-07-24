import React from 'react';
import {StyleSheet, View, Picker, ActivityIndicator} from "react-native";
import {Image, Text} from "react-native-elements"
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

const url = "http://shahidikram0701.pythonanywhere.com/style_image_with_emotion"


export default class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        mood: "Choose any emotion",
        loading: false,
    }
  }

  
  styles = StyleSheet.create({
    topContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
        flexDirection: "row",
    },
    pickerStyle:{  
        height: 150,  
        width: "80%",  
        color: '#201f45',  
        justifyContent: 'center',  
    }  
  });

  hackItUp = async(data) => {
    this.setState({loading: true})
    console.log("Clicked", data.emotion)
    const {navigate} = this.props.navigation;
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
    const { navigation } = this.props;
    if(this.state.loading) {
        return (
            <View style={this.styles.topContainer}>
                <Text style={{fontSize: 20, fontStyle: "italic", fontWeight: "bold"}}>Hacking it up for you...</Text>
                <PacmanIndicator color="#201f45" />
            </View>
        )
      }
    else return (
        <View style={this.styles.topContainer}>
            <Image style={this.styles.image} source={{uri: navigation.getParam('image').uri}} style={{ width: 400, height: 400}} />
            <View style={{marginTop: 20}}>
            <Text style={{fontSize: 20}}>Pick an emotion</Text>
            <Picker
                style={this.styles.pickerStyle} 
                selectedValue={this.state.mood}
                style={{height: 50, width: 100}}
                onValueChange={(itemValue) =>
                    this.setState({mood: ""}, () => this.setState({mood: itemValue}, () => this.hackItUp({image: navigation.getParam("image").base64, emotion: this.state.mood})))
                }>
                <Picker.Item label="😡 Choose an emotion" value="choose" />
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
}