import React, {Component} from 'react';
import {
  Platform,
  Text,
  View,
  Image,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  BackHandler,
  DeviceEventEmitter,
  Modal,
} from 'react-native';

import pagestyles from '../styles/setting.style';
import {ThemeColors} from '../styles/main.style';
import FlashMsg from '../utils/FlashMsg';
import {Apis} from '../utils/Apis';
import Loader from '../utils/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SetFindMeetingURLDialog from './SetFindMeetingURLDialog';
import SetSobrietyDateDialog from './SetSobrietyDateDialog';
import SetSponsorDialog from './SetSponsorDialog';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

class SettingScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      showDialog: false,
      showSetSponsorDialog: false,
      showSetMeetingURLDialog: false,
      showSetSobrietyDateDialog: false,
      contactForm: false,
      contactName: '',
      contactNo: '',
      meetingUrl: '',
      buttonPressed: false,
      sobrietyDate: '',
      showclock: false,
      sdate: '',
    };
    this.backPressSubscriptions = new Set();
  }

  handleHardwareBack = () => {
    console.log('handleHardwareBack');
    return true;
  };

  componentDidMount() {
    this.props.navigation.addListener('willFocus', async () => {
      this.homeApi();
    });

    DeviceEventEmitter.removeAllListeners('hardwareBackPress');
    DeviceEventEmitter.addListener('hardwareBackPress', () => {
      let invokeDefault = true;
      const subscriptions = [];

      this.backPressSubscriptions.forEach(sub => subscriptions.push(sub));

      for (let i = 0; i < subscriptions.reverse().length; i += 1) {
        if (subscriptions[i]()) {
          invokeDefault = false;
          break;
        }
      }

      if (invokeDefault) {
        Alert.alert('Alert!', 'Are you sure you want to exit app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        // BackHandler.exitApp();
      }
    });
    this.homeApi();
    this.backPressSubscriptions.add(this.handleHardwareBack);
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners('hardwareBackPress');
    this.backPressSubscriptions.clear();
  }

  hideLoading(from) {
    console.log('hideLoading from ' + from);
    this.setState({loading: false});
  }
  showLoading(from) {
    console.log('showLoading from ' + from);
    this.setState({loading: true});
  }

  homeApi = () => {
    console.log('homeApi has been called...');
    var that = this;
    let api = 'page/home-page/list';
    Apis.callGetApis(api).then(
      function (result) {
        if (result.status) {
          console.log('homeApi result.message:: ', result);
          // if (result.data.show_clock == "true") {
          this.setState({
            showclock: true,
            sobrietyDate: result.data.sobriety_date,
            meetingUrl: result.data.findMeetingURL,
            sponsorName: result.data.sponsor_name,
          });
          // }
        }
      }.bind(this),
      function () {
        console.log('There was an error fetching home page list.');
      }.bind(this),
    );
  };

  getMeetingURL = () => {
    var that = this;
    let api = 'meeting/urllist';
    this.showLoading('getMeetingURL');
    Apis.callGetApis(api).then(
      function (result) {
        that.hideLoading('getMeetingURL result');
        console.log("Retreived url ",result.data[0].url);
        that.setState({
            meetingUrl: result.data[0].url,
            showSetMeetingURLDialog: true,
        });
      }.bind(this),
      function () {
        this.hideLoading('getMeetingURL bind result');
        let msg = 'There was an error fetching the meeting URL.';
        FlashMsg.showError(msg);
      }.bind(this),
    );
  };

  showProfile() {
    this.props.navigation.navigate('ProfileScreen');
  }

  showChangePhotoScreen() {
    this.props.navigation.navigate('ChangePhotoScreen');
  }

  setSponsor() {
    if (
      this.state.contactNo == '' ||
      this.state.contactNo.length < 10 ||
      this.state.contactName == ''
    ) {
      <Text>PLACEHOLDER</Text>; //FlashMsg.showError("Enter a valid number or name");
    } else {
      this.setState({
        contactForm: false,
      });
      this.invertVisibilitySetSponsor();
      var that = this;
      var myData = JSON.stringify({
        device_name: Platform.OS,
        contact_name: this.state.contactName,
        contact_number: this.state.contactNo,
        device_token: global.fcmToken,
      });
      this.showLoader('set sponsor');
      let api = 'sponsor/set';
      Apis.callFormDataApis(api, null, myData).then(
        function (result) {
          this.hideLoader('set sponsor');
          if (result.status == true) {
            console.log("Setting state.sponsorName to " + result.data.sponsor_name);
            that.setState({
              sponsorSet: true,
              sponsorName: result.data.sponsor_name
            });
          }
        }.bind(this),
        function () {
          console.log('There was an error setting sponsor');
          this.hideLoader('set sponsor');
          FlashMsg.showError("There was an error setting sponsor");
        }.bind(this),
      );
    }
  }

  showSetMeetingURLModal() {
    this.getMeetingURL();
  }

  closeSetURLDialog = () => {
    console.log("closeSetURLDialog.............");
    this.homeApi();
    this.setState({
        showSetMeetingURLDialog: false,
    });
  }

  logoutApi = () => {
    let api = 'logout';
    this.showLoader('logoutApi');
    Apis.callApi(api).then(
      function (result) {
        console.log('Your data: ' + JSON.stringify(result));
        this.hideLoader('logoutApi');

        if (result.status) {
          console.log('result.message:: ', result.message);
          FlashMsg.showSuccess(result.message);
          this.logoutAction();
        } else {
          FlashMsg.showError(result.message);
          console.log('result.message:: ', result.message);
        }
      }.bind(this),
      function () {
        let msg = 'There was an error logging out.';
        console.log(msg);
        this.hideLoader('logoutApi');
        FlashMsg.showError(msg);
      }.bind(this),
    );
  };

  logoutAction = () => {
    console.log('logging out');
    AsyncStorage.clear();
    /*NAVIGATE TO LOGINActions.loginScreen();*/
  };
  setDialog() {
    this.setState({
      showDialog: !this.state.showDialog,
    });
  }
  invertVisibilitySetSponsor() {
    this.setState({
      showSetSponsorDialog: !this.state.showSetSponsorDialog,
    });
  }

  closeSetSponsorDialog = action => {
    this.setState({
      showSetSponsorDialog: false,
    });
    if (action === 'ContactScreen') {
      this.props.navigation.navigate('ContactScreen');
    }
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
          console.log("SETTING SOBRIETY DATE TO " + date);
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
        {this.state.loading ? <Loader /> : null}
        <ScrollView style={{flex: 1}}>
          <View style={pagestyles.container}>
            <View style={pagestyles.loginHeader}>
              <Image
                source={require('../images/top-round.png')}
                style={{
                  resizeMode: 'cover',
                  width: '100%',
                  position: 'absolute',
                  top: -950,
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
                <Text style={pagestyles.brandtxt}>Settings</Text>
              </View>
            </View>
            <View style={pagestyles.mainContainer}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => this.showProfile()}>
                <View style={pagestyles.row}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../images/user-icon-red.png')}
                      style={{width: 16, height: 16, tintColor: '#20a4d4'}}
                    />
                    <Text style={pagestyles.nameTxt}>Profile</Text>
                  </View>
                  <View>
                    <View style={pagestyles.end}>
                      <Image
                        style={[pagestyles.icon, {width: 10, height: 18}]}
                        source={require('../images/arrow-forward.png')}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => this.setState({ showSetSobrietyDateDialog: true })}>
                <View style={pagestyles.row}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../images/calendar-icon.png')}
                      style={{width: 20, height: 22}}
                    />
                    <Text style={pagestyles.nameTxt}>Set Sobriety Date</Text>
                  </View>
                  <View>
                    <View style={pagestyles.end}>
                      <Image
                        style={[pagestyles.icon, {width: 10, height: 18}]}
                        source={require('../images/arrow-forward.png')}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => this.invertVisibilitySetSponsor()}>
                <View style={pagestyles.row}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../images/sponser-icon.png')}
                      style={{width: 22, height: 18}}
                    />
                    <Text style={pagestyles.nameTxt}>Set Sponsor</Text>
                  </View>
                  <View>
                    <View style={pagestyles.end}>
                      <Image
                        style={[pagestyles.icon, {width: 10, height: 18}]}
                        source={require('../images/arrow-forward.png')}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => this.showSetMeetingURLModal()}>
                <View style={pagestyles.row}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../images/meeting.png')}
                      style={{width: 21, height: 21, tintColor: '#20a4d4'}}
                    />
                    <Text style={pagestyles.nameTxt}>
                      Set Find a Meeting URL
                    </Text>
                  </View>
                  <View>
                    <View style={pagestyles.end}>
                      <Image
                        style={[pagestyles.icon, {width: 10, height: 18}]}
                        source={require('../images/arrow-forward.png')}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => this.props.navigation.navigate('AboutScreen')}>
                <View style={pagestyles.row}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../images/about-icon.png')}
                      style={{width: 24, height: 24}}
                    />
                    <Text style={pagestyles.nameTxt}>About 4Today</Text>
                  </View>
                  <View>
                    <View style={pagestyles.end}>
                      <Image
                        style={[pagestyles.icon, {width: 10, height: 18}]}
                        source={require('../images/arrow-forward.png')}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => this.props.navigation.navigate('ContactUsScreen')}>
                <View style={pagestyles.row}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../images/contact-icon.png')}
                      style={{width: 24, height: 27}}
                    />
                    <Text style={pagestyles.nameTxt}>Contact Us</Text>
                  </View>
                  <View>
                    <View style={pagestyles.end}>
                      <Image
                        style={[pagestyles.icon, {width: 10, height: 18}]}
                        source={require('../images/arrow-forward.png')}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  this.setDialog();
                }}>
                <View style={pagestyles.row}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../images/logout-icon.png')}
                      style={{width: 22, height: 24}}
                    />
                    <Text style={pagestyles.nameTxt}>Logout</Text>
                  </View>
                  <View>
                    <View style={pagestyles.end}>
                      <Image
                        style={[pagestyles.icon, {width: 10, height: 18}]}
                        source={require('../images/arrow-forward.png')}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              {this.state.showDialog ? (
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.showDialog}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    this.setDialog();
                  }}>
                  <View style={pagestyles.centeredView}>
                    <View style={pagestyles.modalView}>
                      <Text style={pagestyles.modalText}>Logout</Text>
                      <Text>Are you sure you want to log out of 4Today?</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: wp(70),
                          justifyContent: 'space-between',
                          marginTop: hp(3),
                        }}>
                        <TouchableOpacity
                          style={{}}
                          onPress={() =>
                            this.setState({
                              showDialog: !this.state.showDialog,
                            })
                          }>
                          <Text
                            style={{
                              fontSize: wp(5),
                              color: 'grey',
                              fontWeight: '500',
                            }}>
                            Cancel
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            this.setDialog();
                            this.logoutAction();
                          }}>
                          <Text
                            style={{
                              fontSize: wp(5),
                              color: '#1FA2D0',
                              fontWeight: '500',
                            }}>
                            Logout
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
              ) : null}
              {
                this.state.showSetMeetingURLDialog ? (
                <SetFindMeetingURLDialog closeFunction={this.closeSetURLDialog} currentURL={this.state.meetingUrl}/>
                ) : null
              }
              {this.state.showSetSponsorDialog ? (
                <SetSponsorDialog closeFunction={this.closeSetSponsorDialog} />
              ) : null}
            </View>
            {this.state.showSetSobrietyDateDialog ? (
            <SetSobrietyDateDialog
              closeFunction={this.closeSetSobrietyDateDialog}
              sobrietyDate={this.state.sobrietyDate}
            />
          ) : null}
          </View>
        </ScrollView>
        
      </>
    );
  }
}

export default SettingScreen;
