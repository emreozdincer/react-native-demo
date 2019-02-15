import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, View, Text } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ColorTheme from "../constants/Colors";

// TODO: Save the selection to memory somehow, and apply it app-wide, not only on this page. 
class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Settings',
    };
  };

  constructor(props) {
    super(props);

    // Get the initial theme.
    const themeToGet = this.props.screenProps.theme ? this.props.screenProps.theme : '';
    const { colors, theme } = ColorTheme(themeToGet);

    this.state = { colors, theme };
  }

  updateTheme(themeSelection = '') {
    const { colors, theme } = ColorTheme(themeSelection);
    this.props.navigation.setParams({ colors });

    this.setState({ colors, theme });
    this.props.screenProps.updateSettings({ theme, initialRouteName: 'Settings' });
  }

  render() {
    const Colors = this.state.colors;

    return (
      <KeyboardAwareScrollView
        style={{ flex: 1, padding: 50, backgroundColor: Colors.PrimaryLighter }}
      >

        {/* Displays theme colors */}
        <View style={{ padding: 10 }}>
          <Text style={{ color: Colors.Primary, fontSize: 20, textAlign: 'center' }}>
            Theme:
          </Text>
          <Text style={{ color: Colors.Primary, fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
            {this.state.theme.charAt(0).toUpperCase() + this.state.theme.slice(1)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 20 }}>
          <TouchableHighlight>
            <View style={{ width: 50, height: 50, backgroundColor: Colors.PrimaryLight }} />
          </TouchableHighlight>
          <TouchableHighlight>
            <View style={{ width: 50, height: 50, backgroundColor: Colors.Primary }} />
          </TouchableHighlight>
          <TouchableHighlight>
            <View style={{ width: 50, height: 50, backgroundColor: Colors.PrimaryDark }} />
          </TouchableHighlight>
        </View>

        {/* Choose theme */}
        <View style={{ padding: 10 }}>
          <Text style={{ color: Colors.Primary, fontSize: 20, textAlign: 'center' }}>Change Theme</Text>
        </View>
        <View style={{ color: Colors.Primary, flexDirection: 'row', justifyContent: 'center', paddingBottom: 20 }}>
          <TouchableOpacity onPress={() => this.updateTheme('retro')}>
            <View style={{ width: 40, height: 40, backgroundColor: '#ee6f57' }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.updateTheme('sugar')}>
            <View style={{ width: 40, height: 40, backgroundColor: '#ffc7c7' }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.updateTheme('wonderland')}>
            <View style={{ width: 40, height: 40, backgroundColor: '#a45c5c' }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.updateTheme('ice')}>
            <View style={{ width: 40, height: 40, backgroundColor: '#b9d7ea' }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.updateTheme('blues')}>
            <View style={{ width: 40, height: 40, backgroundColor: '#3f72af' }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.updateTheme('B&W')}>
            <View style={{ width: 40, height: 40, backgroundColor: '#393e46' }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.updateTheme('orange')}>
            <View style={{ width: 40, height: 40, backgroundColor: '#ffa45c' }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.updateTheme('choco')}>
            <View style={{ width: 40, height: 40, backgroundColor: '#6e4b1f' }} />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default SettingsScreen;