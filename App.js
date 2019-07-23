import {createStackNavigator, createAppContainer} from 'react-navigation';
import MainPage from "./MainPage"
import Camera from "./Camera"
const MainNavigator = createStackNavigator({
  Home: {screen: MainPage, navigationOptions: {header: null}},
  Camera: {screen: Camera},
});

const App = createAppContainer(MainNavigator);

export default App;