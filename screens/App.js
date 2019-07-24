import {createStackNavigator, createAppContainer} from 'react-navigation';
import MainPage from "./MainPage"
import Camera from "./Camera"
import Result from './Result'
import FromGallery from './FromGallery'
const MainNavigator = createStackNavigator({
  Home: {screen: MainPage, navigationOptions: {header: null}},
  Camera: {screen: Camera, navigationOptions: {headerStyle: {backgroundColor: '#201f45',},headerTintColor: '#fff',}},
  Result: {screen: Result, navigationOptions: {headerStyle: {backgroundColor: '#201f45',},headerTintColor: '#fff',}},
  FromGallery: {screen: FromGallery, navigationOptions: {headerStyle: {backgroundColor: '#201f45',},headerTintColor: '#fff',}}
});

const App = createAppContainer(MainNavigator);

export default App;