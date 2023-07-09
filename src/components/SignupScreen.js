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
  ScrollView,
} from 'react-native';

import pagestyles from '../styles/signup.style';
import CheckBox from '@react-native-community/checkbox';
import ThemeColors from '../styles/main.style';
import FlashMsg from '../utils/FlashMsg';
import {Apis} from '../utils/Apis';
import Loader from '../utils/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      mobileNo: '',
      password: '',
      cPassword: '',
      isAccept: false,
      loading: false,
    };
    this.backPressSubscriptions = new Set();
  }
  registerAction = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (this.state.name == '') {
      FlashMsg.showError('Please enter your name');
    }
    if (this.state.email == '') {
      FlashMsg.showError('Please enter your email');
    } else if (reg.test(this.state.email) === false) {
      FlashMsg.showError('Please enter proper Email');
    }
    if (this.state.mobileNo == '') {
      FlashMsg.showError('Please enter your mobile no');
    } else if (this.state.password < 8) {
      FlashMsg.showError('Please enter your password');
    } else if (this.state.cPassword < 8) {
      FlashMsg.showError('Please confirm your Password');
    } else if (this.state.password != this.state.cPassword) {
      FlashMsg.showError('Password mismatch');
    } else if (this.state.isAccept == false) {
      FlashMsg.showError('Please accept the terms and conditions to proceed');
    } else {
      Keyboard.dismiss();
      this.registerUserApi();
    }
  };

  loaderShowHide = status => {
    this.setState({
      loading: status,
    });
  };

  registerUserApi = () => {
    console.log('this.state.email', this.state.email);
    console.log('this.state.password', this.state.password);
    global.fcmToken = '1234';

    var myData = JSON.stringify({
      name: this.state.name,
      email: this.state.email,
      phone: this.state.mobileNo,
      password: this.state.password,
      c_password: this.state.cPassword,
      device_name: Platform.OS,
      device_token: global.fcmToken,
      status: '1',
      terms_condition: '1',
    });
    this.loaderShowHide(true);

    let api = 'auth/register';
    Apis.callFormDataApis(api, null, myData).then(
      function (result) {
        console.log('Your data: ' + JSON.stringify(result));
        this.loaderShowHide(false);
        if (result.status) {
          console.log('result.message:', result.message);
          FlashMsg.showSuccess(result.message);

          global.loginUserTokenType = result.data.token_type;
          global.loginUserAccessToken = result.data.access_token;
          AsyncStorage.setItem('@4todayData', JSON.stringify(result.data));
          AsyncStorage.getItem('@4todayData')
            .then(value => {
              console.log('value:', value);
              global.loginUserData = value;
              //Actions.reset("tabbar");
            })
            .catch(error => {
              console.log(error);
            });
          // }
        } else {
          FlashMsg.showError(result.message);
          console.log('result.message:: ', result.message);
        }
      }.bind(this),
      function () {
        let msg = 'There was an error attempting to register.';
        console.log(msg);
        this.loaderShowHide(false);
        FlashMsg.showError(msg);
      }.bind(this),
    );
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
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Brand View */}
            <View style={pagestyles.container}>
              <View style={pagestyles.loginHeader}>
                <Image
                  source={require('../images/top-round.png')}
                  style={{
                    resizeMode: 'cover',
                    width: '100%',
                    position: 'absolute',
                    top: -890,
                  }}
                />

                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 40,
                  }}>
                  <Text style={pagestyles.brandtxt}>4Today</Text>
                  <Text style={pagestyles.shortinfo}>
                    Track your recovery & connect to resources one day at a time
                  </Text>
                </View>
              </View>
              <View style={pagestyles.logincontainer}>
                <Text style={pagestyles.titletxt}>Sign Up</Text>
                <Text style={pagestyles.bodytxt}>
                  Add your details to sign up
                </Text>
                <View style={pagestyles.formsection}>
                  <TextInput
                    style={pagestyles.input}
                    placeholder="Name"
                    placeholderTextColor={ThemeColors.blackColor}
                    underlineColorAndroid="transparent"
                    autoCapitalize="words"
                    returnKeyType="next"
                    onChangeText={text => this.setState({name: text})}
                    value={this.state.name}
                    keyboardType="default"
                  />
                  <Image
                    source={require('../images/user.png')}
                    style={{
                      width: 20,
                      height: 22,
                      position: 'absolute',
                      right: 15,
                      resizeMode: 'cover',
                    }}
                  />
                </View>
                <View style={pagestyles.formsection}>
                  <TextInput
                    style={pagestyles.input}
                    placeholder="Email Address"
                    placeholderTextColor={ThemeColors.blackColor}
                    underlineColorAndroid="transparent"
                    returnKeyType="next"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={text => this.setState({email: text})}
                    value={this.state.email}
                  />
                  <Image
                    source={require('../images/feather-mail.png')}
                    style={{
                      width: 28,
                      height: 20,
                      position: 'absolute',
                      right: 15,
                      resizeMode: 'cover',
                    }}
                  />
                </View>
                <View style={pagestyles.formsection}>
                  <TextInput
                    style={pagestyles.input}
                    placeholder="Mobile No"
                    placeholderTextColor={ThemeColors.blackColor}
                    underlineColorAndroid="transparent"
                    returnKeyType="next"
                    keyboardType="numeric"
                    autoCapitalize="none"
                    onChangeText={text => this.setState({mobileNo: text})}
                    value={this.state.mobileNo}
                  />
                  <Image
                    source={require('../images/phone.png')}
                    style={{
                      width: 16,
                      height: 24,
                      position: 'absolute',
                      right: 18,
                      resizeMode: 'cover',
                    }}
                  />
                </View>
                <View style={pagestyles.formsection}>
                  <TextInput
                    secureTextEntry={true}
                    style={pagestyles.input}
                    placeholder="Password"
                    underlineColorAndroid="transparent"
                    placeholderTextColor={ThemeColors.blackColor}
                    returnKeyType="next"
                    onChangeText={text => this.setState({password: text})}
                    value={this.state.password}
                  />
                  <Image
                    source={require('../images/feather-lock.png')}
                    style={{
                      width: 25,
                      height: 25,
                      position: 'absolute',
                      right: 15,
                      resizeMode: 'cover',
                    }}
                  />
                </View>
                <View style={pagestyles.formsection}>
                  <TextInput
                    secureTextEntry={true}
                    style={pagestyles.input}
                    placeholder="Confirm Password"
                    underlineColorAndroid="transparent"
                    placeholderTextColor={ThemeColors.blackColor}
                    returnKeyType="done"
                    onChangeText={text => this.setState({cPassword: text})}
                    value={this.state.cPassword}
                  />
                  <Image
                    source={require('../images/feather-lock.png')}
                    style={{
                      width: 25,
                      height: 25,
                      position: 'absolute',
                      right: 15,
                      resizeMode: 'cover',
                    }}
                  />
                </View>
                <View>
                  <TouchableOpacity
                    style={pagestyles.loginBtn}
                    activeOpacity={0.5}
                    onPress={() => {
                      this.registerAction();
                    }}>
                    <Text style={pagestyles.buttonPrimaryText}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    marginTop: 10,
                  }}>
                  <Text style={{color: '#000'}}>Already have an Account?</Text>
                  <TouchableOpacity
                    style={{marginLeft: 7}}
                    activeOpacity={0.7}
                    onPress={() =>
                      this.props.navigation.navigate('LoginScreen')
                    }>
                    <Text style={{color: '#90C457'}}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={pagestyles.DontAccount}>
              <Image
                source={require('../images/bottom-round.png')}
                style={{resizeMode: 'cover', width: '100%'}}
              />
              <View
                style={{
                  color: '#fff',
                  position: 'absolute',
                  top: 20,
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <View style={pagestyles.checkboxContainer}>
                  <CheckBox
                    style={pagestyles.checkbox}
                    disabled={false}
                    value={this.state.isAccept}
                    onValueChange={newValue =>
                      this.setState({isAccept: newValue})
                    }
                  />
                  <Text style={pagestyles.label}>You agree our</Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('PrivacyScreen')
                    }>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: '600',
                        textDecorationLine: 'underline',
                        marginTop: '4.5%',
                      }}
                      // style={{
                      //   marginTop: "8%",
                      //   fontWeight: "600",
                      // }}
                    >
                      Terms and Privacy Policy
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
export default SignupScreen;
