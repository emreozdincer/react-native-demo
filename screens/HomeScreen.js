import React from 'react';
import { Alert, FlatList, Button, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';
import ColorTheme from "../constants/Colors";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props);

    // Get the initial theme.
    const themeToGet = this.props.screenProps.theme ? this.props.screenProps.theme : '';
    const { colors, theme } = ColorTheme(themeToGet);

    this.state = {
      colors,
      theme,

      pizzaText: '',

      postingPhoto: false,

      movieDataSource: '',
      gettingMovies: false,

      cameraOn: false,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    };
  }

  /**
   * Creates a /photos directory if it doesn't exist.
   * Asks for CAMERA and CAMERA_ROLL permissions,
   * and sets the state accordingly.
   * 
   * Also, subscribes to theme 'store' (navigation/screenProps)
   */
  async componentDidMount() {
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => { });
    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);

    this.setState({ hasCameraPermission: status === 'granted' });
  }

  /**
   * Gets movies from external API; updates state to display response as list
   */
  async getMoviesFromApi() {
    try {
      console.debug('Getting movies...');
      let response = await fetch(
        'https://facebook.github.io/react-native/movies.json',
      );
      let responseJson = await response.json();
      this.setState({ movieDataSource: responseJson.movies, gettingMovies: false });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Calles internal method of Camera class with onPictureSaved function 
   * argument when user clicks to shoot.
   */
  takePicture = () => {
    console.debug('Taking Picture...');
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
  };

  /**
   * When the picture is cached, puts it into a FormData object.
   * And calls postPicture(formData) to initate post request.
   */
  onPictureSaved = async picture => {
    console.debug('In onPictureSaved...');
    let uri = picture.uri;
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    await formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    this.postPicture(formData);
  }

  /**
   * Makes the post request with FormData.
   * Alerts the result in mobile app, logs errors on the console if any. 
   */
  postPicture = async (formData) => {
    try {
      console.debug('Posting Picture...');
      this.setState({ postingPhoto: true });
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/form-data',
        },
      });
      this.setState({ postingPhoto: false });

      setTimeout(() => {
        if (response) {
          console.debug('Got response!');
          Alert.alert('Success!', 'Photo posted.');
        } else {
          console.debug('No response.');
          Alert.alert('???', 'Photo posted but no response.');
        }
      }, 100);

    } catch (error) {
      console.debug(error);
      Alert.alert('Error!', error);
    }
  };


  /**
   * Renders Camera view if has permmission.
   */
  renderCamera() {
    const Colors = this.state.colors;
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Button
            color={Colors.Primary}
            title="Toggle Camera"
            onPress={() => {
              this.setState({ cameraOn: !this.state.cameraOn })
            }}
          />
          {this.state.cameraOn &&
            <Camera
              ref={ref => {
                this.camera = ref;
              }}
              style={{ flex: 1 }}
              type={this.state.type}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.setState({
                      type: this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                    });
                  }}>
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                    {' '}Flip{' '}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    alignSelf: 'flex-start',
                    alignItems: 'center',
                  }}
                  onPress={() => { this.takePicture() }}>
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                    {' '}Shoot{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </Camera>
          }
        </View >
      );
    }
  }

  render() {
    const Colors = this.state.colors;

    return (
      <KeyboardAwareScrollView
        style={{ flex: 1, padding: 50, backgroundColor: Colors.PrimaryLighter }}
      >

        {/* Shows a spinner with backdrop if page is in loading state */}
        <Spinner
          visible={this.state.postingPhoto || this.state.gettingMovies}
          textContent={'Loading...'}
          textStyle={{ color: Colors.PrimaryLight }}
          color={Colors.PrimaryLight}
          overlayColor={Colors.PrimaryDarker}
        />

        {this.renderCamera()}

        {/* Displays fetched movies if any exist */}
        {this.state.movieDataSource !== '' &&
          <View style={{ paddingTop: 20, justifyContent: 'center' }}>
            <FlatList
              data={this.state.movieDataSource}
              renderItem={({ item }) => <Text style={{ color: Colors.Primary }}>{item.title}, {item.releaseYear}</Text>}
              keyExtractor={({ id }, index) => id}
            />
          </View>
        }

        {/* Displays a button to GET or trash movies */}
        <View style={{ flexDirection: 'column' }}>
          <Button
            color={Colors.Primary}
            onPress={() => {
              if (this.state.movieDataSource === '') {
                this.setState({ gettingMovies: true });
                this.getMoviesFromApi();
              } else {
                this.setState({ movieDataSource: '' });
              }
            }}
            title={this.state.movieDataSource === '' ? "Get me some movies!" : "Nevermind."}
          />
        </View>


        {/* Displays area for typing and pizzas */}
        <View style={{ padding: 10 }}>
          <TextInput
            style={{ height: 40, color: Colors.Primary }}
            placeholder="Type here to translate!"
            onChangeText={(pizzaText) => { this.setState({ pizzaText }) }}
          />
          <Text style={{ padding: 10, fontSize: 42 }}>
            {this.state.pizzaText.split(' ').map((word) => word && '🍕').join(' ')}
          </Text>
        </View>
      </KeyboardAwareScrollView >
    );
  }
}

export default HomeScreen;