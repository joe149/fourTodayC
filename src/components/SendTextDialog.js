import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
} from 'react-native';

import SendSMS from "react-native-sms";

import pagestyles from '../styles/home.style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

class SendTextDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closeFunction: props.closeFunction,
      sponsorName: props.sponsorName,
      sponsorNumber: props.sponsorNumber,
      sendButtonDisabled: true,
      textToSend: '',
    };
  }

  sendButtonTextStyle = () => {
    if (this.state.sendButtonDisabled) {
      return {
        borderRadius: 8,
        padding: 6,
        backgroundColor: 'transparent',
        borderColor: '#888888',
        borderWidth: 1,
        width: 80,
        alignItems: 'center',
        color: '#888888',
        textAlign: 'center',
        fontSize: 20,
      };
    } else {
      return {
        borderRadius: 8,
        padding: 6,
        backgroundColor: 'transparent',
        borderColor: '#1FA2D0',
        borderWidth: 1,
        width: 80,
        alignItems: 'center',
        color: '#000',
        textAlign: 'center',
        fontSize: 20,
      };
    }
  };

  textUpdated = text => {
    this.setState({textToSend: text});

    if (text.trim()) {
      this.setState({sendButtonDisabled: false});
    }
  };

  sendMessage = () => {
    SendSMS.send(
      {
        body: this.state.textToSend,
        recipients: [this.state.sponsorNumber],
        successTypes: ['sent', 'queued'],
        allowAndroidSendWithoutReadPermission: true,
      },
      (completed, cancelled, error) => {
        console.log(
          'SMS Callback: completed: ' +
            completed +
            ' cancelled: ' +
            cancelled +
            ' error: ' +
            error,
        );
        this.state.closeFunction();
      },
    );
  }
  render() {
    return (
      <Modal animationType="slide" transparent={true} onRequestClose={() => {}}>
        <View style={pagestyles.centeredView}>
          <View style={pagestyles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={pagestyles.modalText}>
                Send text to {this.state.sponsorName}
              </Text>
              <TouchableOpacity onPress={() => {this.state.closeFunction()}}>
                <Image
                  source={require('../images/close.png')}
                  style={{width: 10, height: 10}}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              style={{
                textAlignVertical: 'top',
                textAlign: 'left',
                backgroundColor: 'white',
                height: hp(5),
                padding: 6,
              }}               
              autoFocus={true}
              placeholder="<Enter message here>"
              multiline={true}
              onChangeText={text => this.textUpdated(text)}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: hp(1),
              }}>
              <TouchableOpacity
                style={{alignItems: 'center'}}
                disabled={this.state.sendButtonDisabled}
                onPress={() => {
                  this.sendMessage();
                }}
                activeOpacity={0.5}>
                <Text style={this.sendButtonTextStyle()}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
export default SendTextDialog;
