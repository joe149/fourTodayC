import React, {Component} from 'react';
import {
  Platform,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Keyboard,
  ActivityIndicator,
  Modal,
  StyleSheet,
} from 'react-native';

import styles, {ThemeColors} from '../styles/main.style';
import pagestyles from '../styles/profile.style';
import FlashMsg from '../utils/FlashMsg';
import {Apis} from '../utils/Apis';
import Loader from '../utils/Loader';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const TextField = {
  Name: 'Name',
  Email: 'Email',
  Password: 'Password',
  Phone: 'Phone',
};

const stylesX = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 0,
  },
});

class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmedPassword: '',
      initialName: '',
      initialEmail: '',
      initialPhone: '',
      loading: false,
      disableUpdateButton: true,
      showConfirmPasswordModal: false,
    };
    this.backPressSubscriptions = new Set();
  }

  componentDidMount() {
    this.getProfileInfo();
  }

  checkEnableUpdateButton(textfield, newValue) {
    switch (textfield) {
      case TextField.Name:
        this.setState({name: newValue});
        break;
      case TextField.Email:
        this.setState({email: newValue});
        break;
      case TextField.Password:
        this.setState({password: newValue});
        break;
      case TextField.Phone:
        this.setState({phone: newValue});
        break;
      default:
        break;
    }
    if (
      this.state.name != this.state.initialName ||
      this.state.email != this.state.initialEmail ||
      this.state.password != '' ||
      this.state.phone != this.state.initialPhone
    ) {
      console.log('Enabling button');
      this.setState({disableUpdateButton: false});
    }
  }

  getProfileInfo = () => {
    var that = this;
    this.loaderShowHide(true);
    let api = 'my/profile';
    Apis.callGetApis(api).then(
      function (result) {
        console.log('Your data: ' + JSON.stringify(result));

        if (result.status) {
          console.log('result.message:: ', result.message);
          that.setState({
            name: result.data.name,
            email: result.data.email,
            phone: result.data.phone,
            currentName: result.data.name,
            currentEmail: result.data.email,
            currentPhone: result.data.phone,
          });

          this.loaderShowHide(false);
        } else {
          //Alert.alert('Sorry!',result.message);
          FlashMsg.showError(result.message);
          console.log('result.message:: ', result.message);
          this.loaderShowHide(false);
        }
      }.bind(this),
      function () {
        let msg = 'There was an error fetching your profile information.';
        console.log(msg);
        that.loaderShowHide(false);
        FlashMsg.showError(msg);
      }.bind(this),
    );
  };

  updateProfileAction = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (this.state.password != '') {
      this.setState({showConfirmPasswordModal: true});
      return;
    }

    if (this.state.name == '') {
      FlashMsg.showError('Please enter your name');
    } else if (this.state.email == '') {
      FlashMsg.showError('Please enter your email');
    } else if (reg.test(this.state.email) === false) {
      FlashMsg.showError('Please enter proper Email');
    } else if (this.state.queryMessage == '') {
      FlashMsg.showError('Please enter your queryMessage');
    } else {
      Keyboard.dismiss();
      this.updateProfileAPI();
    }
  };

  loaderShowHide = status => {
    this.setState({
      loading: status,
    });
  };

  updateProfileAPI = () => {
    if (this.state.name == '' || this.phone == '') {
      FlashMsg.showError('Please enter full profile information');
    } else {
      var myData = JSON.stringify({
        name: this.state.name,
        phone: this.state.phone,
        password: this.state.password,
        device_name: Platform.OS,
        device_token: 12345,
        status: 1,
      });
      this.loaderShowHide(true);
      this.setState({password: ''});
      let api = 'my/profile/update';
      Apis.callFormDataApis(api, null, myData).then(
        function (result) {
          if (result.status) {
            FlashMsg.showSuccess(result.message);
          } else {
            FlashMsg.showError(result.message);
          }
          this.loaderShowHide(false);
        }.bind(this),
        function () {
          let msg = 'There was an error updating your profile information.';
          console.log(msg);
          that.loaderShowHide(false);
          FlashMsg.showError(msg);
        }.bind(this),
      );
    }
  };

  showConfirmPasswordDialog(show) {
    this.setState({isConfirmPasswordDialogVisible: show});
  }

  closeAndConfirmPassword() {
    console.log("closeAndConfirmPassword");
    this.setState({
      showConfirmPasswordModal: false,
    });
    this.updateProfileAPI();
  }
  handlePassword = (text) => {
    this.setState({ confirmedPassword: text })
  }


  render() {
    return (
      <>
        <SafeAreaView
          style={{
            flex: 0,
            backgroundColor: ThemeColors.primaryColor,
          }}
        />
        <SafeAreaView style={{flex: 1}}>
          <View
            style={[
              styles.Header,
              {
                paddingLeft: 0,
                paddingRight: 0,
                position: 'absolute',
                top: 10,
                left: 15,
                width: '92%',
                zIndex: 2,
              },
            ]}>
            {this.state.showConfirmPasswordModal ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showConfirmPasswordModal}
                onShow={() => { this.textInput.focus(); }}
                onRequestClose={() => {
                  this.setState({showConfirmPasswordModal: false});
                }}>
                <View style={pagestyles.centeredView}>
                  <View style={pagestyles.modalView}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={pagestyles.modalTitleText}>
                        Change Password
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({showConfirmPasswordModal: false});
                        }}>
                        <Image
                          source={require('../images/close.png')}
                          style={{width: 10, height: 10}}
                        />
                      </TouchableOpacity>
                    </View>

                    <Text style={{textAlign: 'left'}}>
                      Enter your new password again.
                    </Text>
                    <View
                      style={{
                        width: '100%',
                        height: hp(4),
                        backgroundColor: 'white',
                        marginTop: hp(2.5),
                        justifyContent: 'center',
                        paddingHorizontal: wp(2),
                      }}>
                      <TextInput
                        value={this.state.confirmedPassword}
                        placeholderTextColor="grey"
                        placeholder=""
                        secureTextEntry={true}
                        onChangeText = {this.handlePassword}
                        ref={(input) => { this.textInput = input; }}
                      />
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        this.closeAndConfirmPassword();
                      }}
                      activeOpacity={0.5}
                      style={{alignItems: 'center', justifyContent: 'center'}}>
                      <Text
                        style={{
                          marginTop: hp(2),
                          color: '#1FA2D0',
                          fontSize: 18,
                        }}>
                        OK
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            ) : null}
            <View style={styles.HeaderLeft}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  paddingVertical: hp(2),
                }}
                onPress={() => this.props.navigation.goBack()}>
                <Image
                  style={{width: 10, height: 18}}
                  source={require('../images/icon-back.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
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
                <Text style={pagestyles.brandtxt}>Profile</Text>
              </View>
            </View>
            <View style={pagestyles.mainContainer}>
              <View style={pagestyles.logincontainer}>
                <Text style={{color: 'darkgrey'}}>
                  All fields are editable except Email
                </Text>
                <View style={pagestyles.formsection}>
                  <Text style={pagestyles.heading}>Name</Text>
                  <TextInput
                    style={pagestyles.input}
                    placeholder="Name"
                    placeholderTextColor={ThemeColors.blackColor}
                    underlineColorAndroid="transparent"
                    returnKeyType="next"
                    keyboardType="default"
                    autoCapitalize="none"
                    onChangeText={text =>
                      this.checkEnableUpdateButton(TextField.Name, text)
                    }
                    value={this.state.name}
                  />
                </View>
                {this.state.loading && 
                  <View style={[stylesX.container, stylesX.horizontal]}><ActivityIndicator color='#4f98a2' size="large"/></View>  
                }
                <View style={pagestyles.formsection}>
                  <Text style={pagestyles.heading}>Email</Text>
                  <TextInput
                    editable={false}
                    style={pagestyles.input2}
                    placeholder="Email"
                    underlineColorAndroid="transparent"
                    returnKeyType="done"
                    keyboardType="email-address"
                    value={this.state.email}
                    onChangeText={text =>
                      this.checkEnableUpdateButton(TextField.Email, text)
                    }
                  />
                </View>

                <View style={pagestyles.formsection}>
                  <Text style={pagestyles.heading}>Password</Text>
                  <TextInput
                    style={pagestyles.input}
                    placeholder="Change password"
                    underlineColorAndroid="transparent"
                    returnKeyType="done"
                    secureTextEntry={true}
                    onChangeText={text =>
                      this.checkEnableUpdateButton(TextField.Password, text)
                    }
                    value={this.state.password}
                  />
                </View>

                <View style={pagestyles.formsection}>
                  <Text style={pagestyles.heading}>Phone</Text>
                  <TextInput
                    style={pagestyles.input}
                    placeholder="Phone"
                    placeholderTextColor={ThemeColors.blackColor}
                    underlineColorAndroid="transparent"
                    returnKeyType="next"
                    keyboardType="default"
                    autoCapitalize="none"
                    onChangeText={text =>
                      this.checkEnableUpdateButton(TextField.Phone, text)
                    }
                    value={this.state.phone}
                  />
                </View>
                <View>
                  <TouchableOpacity
                    disabled={this.state.disableUpdateButton}
                    style={
                      this.state.disableUpdateButton
                        ? pagestyles.updateBtnDisabled
                        : pagestyles.updateBtn
                    }
                    activeOpacity={1.0}
                    onPress={() => {
                      this.updateProfileAction();
                    }}>
                    <Text style={pagestyles.buttonPrimaryText}>Update</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}
export default ProfileScreen;
