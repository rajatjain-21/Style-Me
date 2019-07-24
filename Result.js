import React from 'react';
import {StyleSheet, View, ActivityIndicator, Alert, Share} from "react-native";
import {Image, Icon} from "react-native-elements"
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
  
//   download = () => {
//     const { navigation } = this.props;
//     var date      = new Date();
//     var url       = "http://www.clker.com/cliparts/B/B/1/E/y/r/marker-pin-google-md.png";
//     var ext       = this.extention(url);
//     ext = "."+ext[0];
//     const { config, fs } = RNFetchBlob
//     let PictureDir = fs.dirs.PictureDir
//     let options = {
//       fileCache: true,
//       addAndroidDownloads : {
//         useDownloadManager : true,
//         notification : true,
//         path:  PictureDir + "/image_"+Math.floor(date.getTime() + date.getSeconds() / 2)+ext,
//         description : 'Image'
//       }
//     }
//     config(options).fetch('GET', navigation.getParam('uri3')).then((res) => {
//       Alert.alert("Success Downloaded");
//     });
//   }

//    extention(filename){
//     return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
//   }

  render() {
    const { navigation } = this.props;
    return (
        <View style={this.styles.topContainer}>
        <View style={this.styles.container}>
            <View><Image source={{uri: navigation.getParam('uri1')}} style={{ width: 175, height: 175}} PlaceholderContent={<ActivityIndicator />}/></View>
            <View style={{marginTop: 30}}><Icon name='plus' reverse reverseColor="white" size={30} type='font-awesome' raised onPress={() => navigate("Camera")}/></View>
            <View><Image source={{uri: navigation.getParam('uri2')}} style={{ width: 175, height: 175}} PlaceholderContent={<ActivityIndicator />}/></View>
        </View>
        <View style={{marginTop: 30}}><Image source={{uri: navigation.getParam('uri3')}} style={{ width: 400, height: 400}} PlaceholderContent={<ActivityIndicator />}/></View>
        {/* <View><Button title="Share" onPress={this.onShare} /></View> */}
        <View style={{marginTop: 30}}><Icon name="share" type='font-awesome' reverse raised onPress={this.onShare} /></View>
        </View>
    )
  }
}