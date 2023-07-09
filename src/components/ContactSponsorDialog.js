import React, {Component} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import call from "react-native-phone-call";

import pagestyles from '../styles/home.style';

class ContactSponsorDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sponsorName: props.sponsorName,
      sponsorNumber: props.sponsorNumber,
      showSendTextDialog: false,
      closeFunction: props.closeFunction,
    };
  }
  closeSendTextDialog = () => {
    this.setState( {
      showSendTextDialog: false,
    })
    this.closeFunction('None')
  }
  callSponsor() {
      const args = {
        number: this.state.sponsorNumber, // String value with the number to call
        prompt: true, // Optional boolean property. Determines if the user should be prompt prior to the call
      };
      call(args).catch(console.error);
  }

  sendSMSMessage(message) {
    this.setState( {
      showSendTextDialog: true,
    })
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
              <Text style={pagestyles.modalText}>Contact Sponsor {this.state.sponsorName} </Text>
              <TouchableOpacity onPress={() => {this.state.closeFunction()}}>
                <Image
                  source={require('../images/close.png')}
                  style={{width: 10, height: 10}}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={pagestyles.buttonModel}
              activeOpacity={0.5}
              onPress={() => {
                this.callSponsor();
              }}>
              <Text style={{color: '#000', fontSize: 16}}>
                Call
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={pagestyles.buttonModel}
              activeOpacity={0.5}
              onPress={() => {
                this.state.closeFunction('SendTextDialog')
              }}>
              <Text style={{color: '#000', fontSize: 16}}>
                Send Text
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ContactSponsorDialog;
