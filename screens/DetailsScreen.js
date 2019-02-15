import React from "react";
import { Button, View, Text } from 'react-native';
import ColorTheme from "../constants/Colors";

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Details #${navigation.getParam('id', '1').toString()}`,
    };
  };
  render() {
    const { navigation } = this.props;
    const id = navigation.getParam('id', '1');
    const Colors = ColorTheme(this.props.screenProps.theme).colors;
    return (
      <View style={{ backgroundColor: Colors.PrimaryLighter, flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{color: Colors.Primary}}>Details Screen: {id}</Text>
        <Button
          title="Update id"
          onPress={() => this.props.navigation.setParams({ id: Math.floor(Math.random() * 100) })}
          color={Colors.PrimaryDark}
        />
      </View>
    );
  }
}

export default DetailsScreen;