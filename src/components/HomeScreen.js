import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Linking,
} from 'react-native';

import styles, {ThemeColors} from '../styles/main.style';
import pagestyles from '../styles/home.style';
import FlashMsg from '../utils/FlashMsg';
import {Apis} from '../utils/Apis';
import Loader from '../utils/Loader';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import SetFindMeetingURLDialog from './SetFindMeetingURLDialog';
import SetSponsorDialog from './SetSponsorDialog';
import ContactSponsorDialog from './ContactSponsorDialog';
import SendTextDialog from './SendTextDialog';
import SetSobrietyDateDialog from './SetSobrietyDateDialog';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSetSponsorDialog: false,
      showContactSponsorDialog: false,
      showSendTextDialog: false,
      showSetSobrietyDateDialog: false,
      backgroundImageUrl: '',
      contactForm: false,
      sponsorName: '',
      sponsorNumber: '',
      cname: '',
      cno: '',
      sm: false,
      sobrietyDate: '',
      loading: false,
      meetingUrl: '',
      showSetMeetingURLModal: false,
      userid: 0,
      gotolist: false,
      sponsors: [],
    };
  }

  componentDidMount = () => {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.homeApi();
    });
  };

  hideLoading(from) {
    console.log('hideLoading from ' + from);
    this.setState({loading: false});
  }
  showLoading(from) {
    console.log('showLoading from ' + from);
    this.setState({loading: true});
  }

  homeApi = () => {
    var that = this;
    this.showLoading('homeApi');

    let api = 'page/home-page/list';
    Apis.callGetApis(api, ).then(
      function (result) {
        this.hideLoading('HomeAPI result');
        if (result.data == undefined) {
          that.setState({
            notVerified: true,
          });
        }
        if (result.status) {
          console.log('Home api result.data: ', JSON.stringify(result.data));
          that.setState({
            userid: result.data.user_id,
            sobrietyDate: result.data.sobriety_date,
            sponsorName: result.data.sponsor_name,
            sponsorNumber: result.data.sponsor_number,
          });
          if (result.data.upload_device == 'true') {
            const tempUrl = 'https://4todayapp.myvtd.site/' + result.data.photo;
            that.setState({backgroundImageUrl: tempUrl});
          } else {
            const tempUrl = result.data.photo;
            that.setState({backgroundImageUrl: tempUrl});
          }
        } else {
          FlashMsg.showError(result.message);
          this.hideLoading('HomeAPI result');
          console.log('result.status:', result.status);
          console.log('result.message:', result.message);
        }
      }.bind(this),
      function () {
        this.hideLoading('HomeAPI bind result');
        let msg = 'There was an error fetching the home screen data.';
        console.log(msg);
        FlashMsg.showError(msg);
      }.bind(this),
    );
  };

  sponsorButtonTapped() {
    var FormData = require('form-data');
    var data = new FormData();
    var that = this;

    let api = 'sponsor/get';
    this.showLoading('sponsorButtonTapped');
    Apis.callGetApis(api, ).then(
      function (result) {
        this.hideLoading('sponsor/get result');
        if (
          result.status == true &&
          result.sponsor_name != '' &&
          result.sponsor_number != ''
        ) {
          that.setState( {
            showContactSponsorDialog: true,
            sponsorName: result.sponsor_name,
            sponsorNumber: result.sponsor_number,
          })
        } else {
          that.setState({showSetSponsorDialog: true});
        }
      }.bind(this),
      function () {
        this.hideLoading('sponsor/get bind result - 2');
        let msg = 'There was an error fetching the sponsor data.';
        console.log(msg);
        FlashMsg.showError(msg);
      }.bind(this),
    );
  }

  sobrietyDateButtonTapped() {
    this.setState({showSetSobrietyDateDialog: true});
  }

  findMeetingButtonTapped = () => {
    var that = this;
    let api = 'meeting/urllist';
    this.showLoading('findMeetingButtonTapped');
    Apis.callGetApis(api).then(
      function (result) {
        this.hideLoading('findMeetingButtonTapped result');
        if (result.data.length != 0) {
          that.setState({
            meetingUrl: result.data[0].url,
          });
          console.log("FindMeeting list url result is ",this.state.meetingUrl);
          Linking.openURL('https://' + that.state.meetingUrl);
        } else {
          this.setState({
            showSetMeetingURLModal: true,
          });
        }
      }.bind(this),
      function () {
        this.hideLoading('findMeetingButtonTapped bind result');
        let msg = 'There was an error fetching the meeting URL.';
        FlashMsg.showError(msg);
      }.bind(this),
    );
  };

  setSobrietyDate = (date) => {
    var myData = JSON.stringify({
      sobriety_date: date,
    });
    console.log('Sending data for setSobrietyDate: ' + JSON.stringify(myData));
    this.showLoading('setSobrietyDate');

    let apiEndpoint = 'sobriety-date/set';
    Apis.callFormDataApis(apiEndpoint, null, myData).then(
      function (result) {
        console.log('Your data: ' + JSON.stringify(result));
        this.hideLoading('setSobrietyDate result');
        let success = false;
        if (result.status) {
          success = true;
          console.log('setSobrietyDate result.message:: ', result.message);
          FlashMsg.showSuccess(result.message);
        } else {
          FlashMsg.showError(result.message);
          console.log('setSobrietyDate result.message:: ', result.message);
        }
        if (success) {
          this.setState({ sobrietyDate: date, showSetSobrietyDateDialog: false})
        } else {
          this.setState({ showSetSobrietyDateDialog: false})
        }
      }.bind(this),
      function () {
        let msg = 'There was an error setting your sobriety date.';
        console.log(msg);
        this.hideLoading('setSobrietyDate final bind');
        FlashMsg.showError(msg);
      }.bind(this),
    );
  };

  closeSetURLDialog = (url) => {
    this.setState({
      showSetMeetingURLModal: false,
    });
    this.set
  };

  closeSetSponsorDialog = action => {
    this.setState({
      showSetSponsorDialog: false,
    });
    console.log("closeSetSponsorDialog, action = " . action);
    if (action === 'ContactScreen') {
      this.props.navigation.navigate('ContactScreen');
    }
    if (action === 'AddSponsor') {
      console.log("Add sponsor closed.")
    }
  };

  closeContactSponsorDialog = action => {
    this.setState({showContactSponsorDialog: false});
    if (action === 'SendTextDialog') {
      this.setState({showSendTextDialog: true});
    }
  };

  closeSendTextDialog = () => {
    this.setState({showSendTextDialog: false});
  };

  closeSetSobrietyDateDialog = (action, date) => {
    if (action === 'SetDate') {
      this.setSobrietyDate(date);
    } else {
      this.setState({showSetSobrietyDateDialog: false})
    }
  };

  render() {
    return (
      <>
        <SafeAreaView
          style={{
            flex: 0,
            backgroundColor: ThemeColors.primaryColor,
          }}
        />
        {this.state.loading && <Loader />}
        <SafeAreaView style={{flex: 1}}>
          <View style={pagestyles.container}>
            <View style={pagestyles.loginHeader}>
              <Image
                source={require('../images/top-round.png')}
                style={{
                  resizeMode: 'cover',
                  width: '100%',
                  position: 'absolute',
                  top: -920,
                  zIndex: 3,
                }}
              />
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 40,
                  position: 'relative',
                  zIndex: 3,
                }}>
                <Text style={pagestyles.brandtxt}>4Today</Text>
              </View>
            </View>
            <View style={pagestyles.homeHeader}>
              <View style={pagestyles.homeHeaderLeft}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    this.sponsorButtonTapped();
                  }}>
                  <Image
                    style={{width: 42, height: 42}}
                    source={require('../images/user-icon.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={pagestyles.homeHeaderMiddle}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => this.sobrietyDateButtonTapped()}>
                  <Text style={{color: '#fff', fontSize: 18}}>
                    {this.state.sobrietyDate === ''
                      ? 'Tap to set Sobriety Date'
                      : this.state.sobrietyDate}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={pagestyles.homeHeaderRight}>
                <View style={styles.Row}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => this.findMeetingButtonTapped()}>
                    <Image
                      style={{width: 42, height: 42}}
                      source={require('../images/metting-icon.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/*Main Container*/}

            <View style={pagestyles.mainContainer}>
              <ImageBackground
                source={
                  this.state.backgroundImageUrl
                    ? {uri: this.state.backgroundImageUrl}
                    : require('../images/home.png')
                }
                resizeMode="cover"
                style={pagestyles.backgroundImage}>
                {this.state.notVerified ? (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: hp(20),
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: 18,
                      }}>
                      Please verify your account by clicking on the link
                      provided in the mail to continue using 4Today
                    </Text>
                  </View>
                ) : null}
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 15,
                    top: 40,
                  }}>
                  <Image
                    style={{
                      tintColor: 'white',
                      width: 15,
                      height: 15,
                    }}
                    source={require('../images/edit-icon.png')}
                  />
                </TouchableOpacity>
              </ImageBackground>
            </View>

            {/*Optional Dialogs*/}

            {this.state.showSetMeetingURLModal ? (
              <SetFindMeetingURLDialog
                closeFunction={this.closeSetURLDialog}
                currentURL={this.state.meetingUrl}
              />
            ) : null}
            {this.state.showSetSponsorDialog ? (
              <SetSponsorDialog closeFunction={this.closeSetSponsorDialog} />
            ) : null}
          </View>

          {this.state.showContactSponsorDialog ? (
            <ContactSponsorDialog
              closeFunction={this.closeContactSponsorDialog}
              sponsorName={this.state.sponsorName}
              sponsorNumber={this.state.sponsorNumber}
            />
          ) : null}
          {this.state.showSendTextDialog ? (
            <SendTextDialog
              closeFunction={this.closeSendTextDialog}
              sponsorName={this.state.sponsorName}
              sponsorNumber={this.state.sponsorNumber}
            />
          ) : null}
          {this.state.showSetSobrietyDateDialog ? (
            <SetSobrietyDateDialog
              closeFunction={this.closeSetSobrietyDateDialog}
              sobrietyDate={this.state.sobrietyDate}
            />
          ) : null}
        </SafeAreaView>
      </>
    );
  }
}
export default HomeScreen;
