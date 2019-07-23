import React from 'react';
import {Text, StyleSheet, View, Button} from "react-native";
import {Icon} from "react-native-elements"
export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }
  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#CC6751',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
  render() {
    const {navigate} = this.props.navigation;
    return (
        <View style={this.styles.container}>
            <Text style={{fontSize: 40, fontWeight: "bold", color: "white"}}>Awesome App</Text>
            {/* <Button style={{marginTop: 20}} title="Click Photo" onPress={() => navigate("Camera")} /> */}
            <View style={{marginTop: 25}}>
                <Icon name='camera' reverse reverseColor="white" size={40} type='font-awesome' raised onPress={() => navigate("Camera")} />
            </View>
        </View>
    )
  }
}