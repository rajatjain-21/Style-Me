import {createStackNavigator, createAppContainer} from 'react-navigation';
import MainPage from "./MainPage"
import Camera from "./Camera"
import Result from './Result'
const MainNavigator = createStackNavigator({
  Home: {screen: MainPage, navigationOptions: {header: null}},
  Camera: {screen: Camera},
  Result: {screen: Result}
});

const App = createAppContainer(MainNavigator);

export default App;