import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import styles, {ThemeColors} from '../styles/main.style';
import pagestyles from '../styles/contact.style';
import FlashMsg from '../utils/FlashMsg';
import {Apis} from '../utils/Apis';
import axios from "axios";
import Loader from '../utils/Loader';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import call from 'react-native-phone-call';
import SendSMS from 'react-native-sms';
import Dialog from 'react-native-dialog';

class SponsorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sponsorId: props.route.params.sponsorID,
      userID: props.route.params.userID,
      loading: false,
      showDeleteConfirmDialog: false,
      showOk: false,
    };
  }

  loaderShowHide = status => {
    this.setState({
      loading: status,
    });
  };

  componentDidMount() {
  }

  callSponsor(phoneNumber) {
    const args = {
      number: phoneNumber, 
    };

    call(args).catch(console.error);
  }

  textSponsor(phoneNumber) {
    SendSMS.send(
      {
        body: 'Greetings from 4Today! You have been set as a Sponsor. ',
        recipients: [phoneNumber],
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
      },
    );
  }

  deleteSponsor() {
    var FormData = require("form-data");
    var data = new FormData();
    var that = this;

    var config = {
      method: 'get',
      url: Apis.getAPIURL("sponsor/delete/") + this.state.userID,
      headers: {
        Authorization: 'Bearer ' + global.loginUserAccessToken,
        Accept: 'application/json',
      },
      data: data,
    };
    console.log("DELETE SPONSOR URL: " + config.url);
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.data.status) {
          that.setState({
            showOk: true,
          });
        } else {
          //
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getSponsor() {
    var axios = require('axios');
    var FormData = require('form-data');
    var data = new FormData();
    var that = this;

    var config = {
      method: 'get',
      url: Apis.getAPIURL("sponsor/list"),
      headers: {
        Authorization: 'Bearer ' + global.loginUserAccessToken,
        Accept: 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));

        that.setState({
          sponsors: response.data.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  popScreen() {
    this.loaderShowHide(false);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={pagestyles.centeredView}>
      <View style={pagestyles.modalView}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={pagestyles.modalText}>Set Sponsor Contact</Text>
          <TouchableOpacity
            onPress={() => {
              this.setState({modalVisible: !modalVisible});
            }}>
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
            this.props.navigation.navigate('ContactScreen');
            this.setState({modalVisible: !modalVisible});
          }}>
          <Text style={{color: '#000', fontSize: 16}}>
            Select Sponsor from Contacts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={pagestyles.buttonModel}
          activeOpacity={0.5}
          onPress={() => {
            this.setState({contactForm: true});
          }}>
          <Text style={{color: '#000', fontSize: 16}}>
            Create New Contact for Sponsor
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    )
  }
}
export default SponsorScreen;
