import React, { Component } from 'react';
import {
  View,
  Modal,
  ActivityIndicator,
  Text
} from 'react-native';

import { showMessage, hideMessage } from "react-native-flash-message";

class FlashMsg extends Component {

  static showError = (message) => {
    console.log("showError");
    showMessage({
      message: message,
      description: "",
      type: "danger",
      //color: '#000000',
      backgroundColor: 'red',
      duration: 2000
    });
  }

  static showSuccess = (message) => {
    console.log("showSuccess");
    showMessage({
      message: message,
      description: "",
      type: "success",
      //color: '#000000',
      backgroundColor: '#006400', //'#228B22',
      duration: 2000
    });
  }

}
export default FlashMsg;