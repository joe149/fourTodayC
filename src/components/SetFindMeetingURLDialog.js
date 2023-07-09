import React, {Component, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

import FlashMsg from '../utils/FlashMsg';
import {Apis} from '../utils/Apis';

import pagestyles from '../styles/home.style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

let currentURLValue = '';
let newURLValue = '';

const URLAlreadySet = props => {
  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          height: hp(3),
        }}>
        The Find Meeting URL is currently set to:
      </Text>
      <Text style={pagestyles.boldText14}>https://{currentURLValue}</Text>
      <View style={{height: hp(1)}}></View>
      <Text
        style={{
          textAlign: 'center',
        }}>
        To change it, enter a new URL below,
      </Text>
      <Text
        style={{
          textAlign: 'center',
          height: hp(2),
        }}>
        and tap 'OK'.
      </Text>
    </View>
  );
};

const URLNotSet = () => {
  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
        }}>
        Enter a URL for your favorite meeting page:
      </Text>
    </View>
  );
};

class SetFindMeetingURLDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closeFunction: props.closeFunction,
      currentURL: props.currentURL,
    };
    currentURLValue = props.currentURL;
    newURLValue = '';
    console.log("SetFindMeetingURLDialog: url " +  props.currentURL + " close " + props.closeFunction);
  }

  setFindMeetingURL = () => {
    console.log('Called setFindMeetingURL, value is ' + newURLValue);
    if (newURLValue == '') {
      FlashMsg.showError('URL cannot be blank');
    } else {
      var that = this;
      
      const regex = /^([a-zA-Z0-9]+[a-zA-Z0-9-]*\.)+[a-zA-Z]{2,}$/;
      if (!regex.test(newURLValue)) {
        FlashMsg.showError('Please enter valid URL.');
        urlValue = '';
        return;
      }
      var myData = JSON.stringify({
        device_name: Platform.OS,
        meeting_url: newURLValue,
        device_token: global.fcmToken,
      });

      let api = 'meeting/addurl';
      Apis.callFormDataApis(api, null, myData).then(
        function (result) {
          if (result.status) {
            FlashMsg.showSuccess('Meeting URL is saved');
          } else {
            FlashMsg.showError(result.message);
          }
          that.closeMe();
        }.bind(this),
        function () {
          let msg = 'There was an error setting the meeting URL.';
          FlashMsg.showError(msg);
          that.closeMe();
        }.bind(this),
      );
    }
  };

  closeMe = () => {
    this.state.closeFunction();
  };

  updateText = text => {
    newURLValue = text;
  };

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
      >
        <View style={pagestyles.centeredView}>
          <View style={pagestyles.modalView}>
            <TouchableOpacity
                onPress={() => {
                  this.state.closeFunction();
                }}>
              style={pagestyles.closeButton}>
              <Image
                source={require('../images/close.png')}
                style={{width: 10, height: 10}}
              />
            </TouchableOpacity>
            <View>
              <Text style={pagestyles.modalTextCentered}>
                Set URL for Find Meeting
              </Text>
            </View>
            {this.state.currentURL != '' ? (
              <URLAlreadySet url={this.state.currentURL} />
            ) : (
              <URLNotSet />
            )}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
              }}>
              <Text style={{
                marginRight: 4,   
                fontSize: 16,
            }}>
                https://
              </Text>
              <TextInput
                 style={{
                    width: '79%',
                    height: hp(4),
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    fontSize: 14,
                }}
                placeholderTextColor="grey"
                placeholder="URL"
                autoFocus={true}
                onChangeText={newText => this.updateText(newText)}
                autoCapitalize="none"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                paddingTop: 20,
              }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  this.state.closeFunction('SetDate', this.state.sobrietyDate);
                }}>
                  <Text
                  style={{
                    color: '#1FA2D0',
                    fontSize: 18,
                    borderWidth: 1,
                    borderColor: '#1FA2D0',
                    padding: 8,
                    borderRadius: 4,
                  }}>
                  OK 
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  this.state.closeFunction();
                }}>
                <Text
                  style={{
                    color: '#1FA2D0',
                    fontSize: 18,
                    borderWidth: 1,
                    borderColor: '#1FA2D0',
                    padding: 8,
                    borderRadius: 4,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                height: hp(2),
              }}></View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default SetFindMeetingURLDialog;
