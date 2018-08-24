/**
 * Sample React Native Form
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Button
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import ImagePicker from "react-native-image-picker";

type Props = {};
export default class Form extends Component<Props> {
  state = {
    status: [{ label: "Active", value: 0 }, { label: "Inactive", value: 1 }],
    fields: { status: 0 }
  };

  uploadPic = () => {
    var options = {
      title: "Select Picture",
      customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info below in README)
     */
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          profilepic: source
        });
      }
    });
  };
  render() {
    let { status, fields, profilepic } = this.state;

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <RNPickerSelect
            items={status}
            value={fields.state_id}
            style={
              Platform.OS === "ios"
                ? { inputIOS: styles.input }
                : { inputAndroid: styles.input }
            }
            onValueChange={value => {
              this.setState({ fields: { ...fields, status: value } });
            }}
          />
        </KeyboardAvoidingView>
        <Button title="Upload Picture" onPress={this.uploadPic} />
        {profilepic ? (
          <Image source={profilepic} style={{ flex: 0.4, margin: 10 }} />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: Platform.OS === "ios" ? 1 : 0,
    marginVertical: 8,
    fontFamily: "TrebuchetMS",
    padding: 10,
    width: "100%"
  }
});
