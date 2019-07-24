import React from 'react';
import {StyleSheet, View, ActivityIndicator, Share} from "react-native";
import {Image, Icon} from "react-native-elements"
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
// import {RNFetchBlob} from "rn-fetch-blob"
export default class Result extends React.Component {
  constructor(props) {
    super(props);
  }
  
  styles = StyleSheet.create({
    topContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
        flexDirection: "row",
        alignItems: 'center',
      justifyContent: 'center',
    }
  });

  onShare = () => {
    const { navigation } = this.props;
    const uri = navigation.getParam('uri3')

    Share.share(
      {
        message: uri,
        title: 'Hey this is your styled image',
        url: uri,
      },
      {
        excludedActivityTypes: [],
      }
    );
  };

  render() {
    const { navigation } = this.props;
    return (
        <View style={this.styles.topContainer}>
        <View style={this.styles.container}>
            <View><Image source={{uri: navigation.getParam('uri1')}} style={{ width: 175, height: 175}} PlaceholderContent={<SkypeIndicator />}/></View>
            <View style={{marginTop: 35}}><Icon name='plus'  size={30} type='font-awesome' raised color="#201f45" /></View>
            <View><Image source={{uri: navigation.getParam('uri2')}} style={{ width: 175, height: 175}} PlaceholderContent={<SkypeIndicator />}/></View>
        </View>
        <View style={{marginTop: 30}}><Image source={{uri: navigation.getParam('uri3')}} style={{ width: 400, height: 400}} PlaceholderContent={<SkypeIndicator />}/></View>
        {/* <View><Button title="Share" onPress={this.onShare} /></View> */}
        <View style={{marginTop: 30}}><Icon name="share" type='font-awesome' reverse raised onPress={this.onShare} color="#201f45" /></View>
        </View>
    )
  }
}