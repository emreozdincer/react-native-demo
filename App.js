import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SettingsScreen from "./screens/SettingsScreen";
import ColorTheme from './constants/Colors';

/**
 * Entry component to the program.
 * 
 * Has two state variables: theme and initialRouteName
 * These serve as app settings and are passed down in render method,
 * along wih an updateSettings function for the children to call.
 * 
 * This wraps AppContainer which then wraps BottomTabNavigator.
 */
class App extends React.Component {
  state = {
    theme: 'retro',
    initialRouteName: 'Home',
  }

  updateSettings = (settings) => {
    let newTheme = settings.theme;
    let newInitialRouteName = settings.initialRouteName; 

    this.setState({ 
      theme: newTheme ? newTheme : this.state.theme,
      initialRouteName: newInitialRouteName ? newInitialRouteName : this.state.initialRouteName,
    });
  }


  render() {
    console.debug('Rendering app');
    const { initialRouteName, theme } = this.state;
    const Colors = ColorTheme(theme).colors;

    const TabNavigator = createBottomTabNavigator(
      {
        Home: HomeScreen,
        Settings: SettingsScreen,
        Details: DetailsScreen,
      },
      {
        defaultNavigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Details') {
              iconName = `ios-information-circle${focused ? '' : '-outline'}`;
            } else if (routeName === 'Settings') {
              iconName = `ios-options`;
            } else if (routeName === 'Home') {
              iconName = `ios-home`;
            }
            return <Icon name={iconName} size={25} color={tintColor} />;
          },
        }),
        initialRouteName: initialRouteName,
        tabBarOptions: {
          activeTintColor: Colors.PrimaryDark,
          inactiveTintColor: Colors.Primary,
          activeBackgroundColor: Colors.PrimaryLight,
          inactiveBackgroundColor: Colors.PrimaryLighter,
        },
      }
    );

    const AppContainer = createAppContainer(TabNavigator);

    return <AppContainer screenProps={{ theme, updateSettings: this.updateSettings }} />
  }
}

export default App;