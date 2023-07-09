import React, { Component } from "react";
import { View, 
		Text, 
		TextInput,
		SafeAreaView, 
		ScrollView,
		TouchableOpacity, 
		Image,
		Keyboard
	   } 
		from "react-native";

import pagestyles from "../styles/login.style";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
 } from "react-native-responsive-screen";
 
import FlashMsg from "../utils/FlashMsg";
import Loader from "../utils/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemeColors from '../styles/main.style';

import { Apis } from "../utils/Apis";

// import {
// 	LoginButton,
// 	AccessToken,
// 	LoginManager,
// 	GraphRequest,
// 	GraphRequestManager,
//   } from "react-native-fbsdk";
//   import {
// 	GoogleSignin,
// 	GoogleSigninButton,
// 	statusCodes,
//   } from "@react-native-google-signin/google-signin";
  
// GoogleSignin.configure({
// 	scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
// 	webClientId:
// 	  '418977770929-g9ou7r9eva1u78a3anassxxxxxxx.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
// 	offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//   });

class LoginScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			loading: false,
		};
	}

    componentDidMount() {
		this.getPersistentData();
	}

	loaderShowHide = (status) => {
		this.setState({
			loading: status,
		});
	};

	getPersistentData = async () => {
		var appData = await AsyncStorage.getItem("@4TodayData");
		console.log("Persistent storage is:", appData);
		if (appData != null) {
			var data = JSON.parse(appData);
			console.log("at", data.access_token);
			global.loginUserTokenType = data.token_type;
			global.loginUserAccessToken = data.access_token;
			global.loginUserData = data;
			console.log("Will navigate to HomeScreen (via TabScreens");
	        this.props.navigation.navigate('TabScreens')
		}
	};

	// signInGoogle = async () => {
	// 	try {
	// 	  await GoogleSignin.hasPlayServices();
	// 	  const userInfo = await GoogleSignin.signIn();
	// 	  console.log("GoogleSignin result:", userInfo);
	// 	  if (userInfo.user.id != "") {
	// 		this.loaderShowHide(true);
	// 		var myData = JSON.stringify({
	// 		  device_name: Platform.OS,
	// 		  provider_name: "google",
	// 		  provider_id: userInfo.user.id,
	// 		  device_token: global.fcmToken,
	// 		  name: userInfo.user.givenName,
	// 		  email: userInfo.user.email,
	// 		});
	// 		let api = "auth/social/login";
	// 		Apis.callFormDataApis(api, null, myData).then(
	// 		  function (result) {
	// 			// console.log("Your data: " + JSON.stringify(result));
	// 			this.loaderShowHide(false);
	// 			if (result.status) {
	// 			  // console.log("result.message:: ", result.message);
	// 			  FlashMsg.showSuccess(result.message);
	
	// 			  global.loginUserTokenType = result.data.token_type;
	// 			  global.loginUserAccessToken = result.data.access_token;
	// 			  AsyncStorage.setItem("@4todayData", JSON.stringify(result.data));
	// 			  AsyncStorage.getItem("@4todayData")
	// 				.then((value) => {
	// 				  console.log("setting async storage ", value);
	// 				  global.loginUserData = value;
	// 				  Actions.reset("tabbar");
	// 				})
	// 				.catch((error) => {
	// 				  // console.log(error);
	// 				  //alert('ERROR GETTING DATA FROM FACEBOOK')
	// 				});
	// 			  // }
	// 			} else {
	// 			  //Alert.alert('Sorry!',result.message);
	// 			  FlashMsg.showError(result.message);
	// 			  // console.log("result.message:: ", result.message);
	// 			}
	// 		  }.bind(this),
	// 		  function () {
	// 			// console.log("There was an error fetching the time");
	// 			this.loaderShowHide(false);
	// 			FlashMsg.showError(
	// 			  "There was an error fetching the time, please try again later."
	// 			);
	// 		  }.bind(this)
	// 		);
	// 	  }
	// 	} catch (error) {
	// 	  if (error.code === statusCodes.SIGN_IN_CANCELLED) {
	// 		// user cancelled the login flow
	// 	  } else if (error.code === statusCodes.IN_PROGRESS) {
	// 		// operation (e.g. sign in) is in progress already
	// 	  } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
	// 		// play services not available or outdated
	// 	  } else {
	// 		// some other error happened
	// 	  }
	// 	}
	//   };
	//   facebookSignin = async () => {
	// 	LoginManager.logInWithPermissions(["public_profile"]).then(
	// 	  function (result) {
	// 		if (result.isCancelled) {
	// 		  console.log("Login cancelled");
	// 		} else {
	// 		  console.log(
	// 			"Login success with permissions: " +
	// 			  result.grantedPermissions.toString()
	// 		  );
	// 		  AccessToken.getCurrentAccessToken().then((data) => {
	// 			const { accessToken } = data;
	// 			// console.log(accessToken)
	// 			// this.initUser(accessToken)
	// 			//Create response callback.
	// 			const responseInfoCallback = (error, result) => {
	// 			  if (error) {
	// 				// alert('Error fetching data: ' + error.toString());
	// 				console.log("error ", error.toString());
	// 			  } else {
	// 				console.log("success ", result);
	// 				//api call
	// 				this.loaderShowHide(true);
	// 				var myData = JSON.stringify({
	// 				  device_name: Platform.OS,
	// 				  provider_name: "google",
	// 				  provider_id: result.id,
	// 				  device_token: global.fcmToken,
	// 				  name: result.name,
	// 				  email: "email@email.com",
	// 				});
	// 				let api = "auth/social/login";
	// 				Apis.callFormDataApis(api, null, myData).then(
	// 				  function (result) {
	// 					// console.log("Your data: " + JSON.stringify(result));
	// 					this.loaderShowHide(false);
	// 					if (result.status) {
	// 					  // console.log("result.message:: ", result.message);
	// 					  FlushMsg.showSuccess(result.message);
	
	// 					  global.loginUserTokenType = result.data.token_type;
	// 					  global.loginUserAccessToken = result.data.access_token;
	// 					  AsyncStorage.setItem(
	// 						"@4todayData",
	// 						JSON.stringify(result.data)
	// 					  );
	// 					  AsyncStorage.getItem("@4todayData")
	// 						.then((value) => {
	// 						  console.log("setting async storage ", value);
	// 						  global.loginUserData = value;
	// 						  Actions.reset("tabbar");
	// 						})
	// 						.catch((error) => {
	// 						  // console.log(error);
	// 						  //alert('ERROR GETTING DATA FROM FACEBOOK')
	// 						});
	// 					  // }
	// 					} else {
	// 					  //Alert.alert('Sorry!',result.message);
	// 					  FlashMsg.showError(result.message);
	// 					  // console.log("result.message:: ", result.message);
	// 					}
	// 				  }.bind(this),
	// 				  function () {
	// 					// console.log("There was an error fetching the time");
	// 					this.loaderShowHide(false);
	// 					FlashMsg.showError(
	// 					  "There was an error fetching the time, please try again later."
	// 					);
	// 				  }.bind(this)
	// 				);
	// 			  }
	// 			};
	
	// 			// the famous params object...
	// 			const profileRequestParams = {
	// 			  fields: {
	// 				string:
	// 				  "id, name, email, first_name, last_name, gender, picture.type(large)",
	// 			  },
	// 			};
	// 			const profileRequestConfig = {
	// 			  httpMethod: "GET",
	// 			  version: "v2.5",
	// 			  parameters: profileRequestParams,
	// 			  accessToken: accessToken.toString(),
	// 			};
	// 			const infoRequest = new GraphRequest(
	// 			  "/me",
	// 			  profileRequestConfig,
	// 			  responseInfoCallback
	// 			);
	// 			// Start the graph request.
	// 			new GraphRequestManager().addRequest(infoRequest).start();
	// 		  });
	// 		}
	// 	  }.bind(this),
	// 	  function (error) {
	// 		console.log("Login fail with error: " + error);
	// 	  }
	// 	);
	//  };

	loginApi = () => {
		console.log("this.state.email:: ", this.state.email);
		console.log("this.state.password:: ", this.state.password);
		global.fcmToken = "1234";
	
		var myData = JSON.stringify({
		  email: this.state.email,
		  password: this.state.password,
		  device_token: global.fcmToken,
		});
		this.loaderShowHide(true);
	
		let api = "auth/login";
		Apis.callFormDataApis(api, null, myData).then(
		  function (result) {
			console.log("Login returned: " + JSON.stringify(result));
			this.loaderShowHide(false);
			if (result.status) {
			   FlashMsg.showSuccess(result.message);
			   console.log("result.data ",result.data);
			   console.log("data.token_type",result.data.token_type)
			   console.log("data.access_token",result.data.access_token)
			   global.loginUserTokenType = result.data.token_type;
			   global.loginUserAccessToken = result.data.access_token;
			   AsyncStorage.setItem("@4TodayData", JSON.stringify(result.data));
			   this.getPersistentData();
			} else {
			    FlashMsg.showError(result.message);
			    console.log("Login failed: result.message:: ",result.message);
			}
		  }.bind(this),
		  function () {
			console.log("Login error.");
			this.loaderShowHide(false);
			FlashMsg.showError(
			  "There was an error logging in, please try again later."
			);
		  }.bind(this)
		);
	  };

	loginAction = () => {
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
		if (this.state.email == "") {
			FlashMsg.showError("Please enter your email");
		} else if (reg.test(this.state.email) === false) {
			FlashMsg.showError("Please enter proper Email");
		} else if (this.state.password < 8) {
			FlashMsg.showError("Please enter your password");
		} else {
			Keyboard.dismiss();
			this.loginApi();
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
			{this.state.loading && <Loader/>}
			<SafeAreaView style={{}}>
			  <ScrollView
				showsVerticalScrollIndicator={false}
				style={{ height: hp(110) }}
			  >
				{/* Brand View */}
				<View style={pagestyles.container}>
				  <View style={pagestyles.loginHeader}>
					<Image
					  source={require("../images/top-round.png")}
					  style={{
						resizeMode: "cover",
						width: "100%",
						position: "absolute",
						top: -840,
					  }}
					/>
	
					<View
					  style={{
						alignItems: "center",
						justifyContent: "center",
						paddingHorizontal: 40,
					  }}
					>
					  <Text style={pagestyles.brandtxt}>4Today</Text>
					  <Text style={pagestyles.shortinfo}>
						Track your recovery & connect to resources one day at a time
					  </Text>
					</View>
				  </View>
				  <View style={pagestyles.logincontainer}>
					<Text style={pagestyles.titletxt}>Login</Text>
					<Text style={pagestyles.bodytxt}>
					  Please login to your account.
					</Text>
					<View style={pagestyles.formsection}>
					  <TextInput
						style={pagestyles.input}
						placeholder="Email Address"
						placeholderTextColor={ThemeColors.blackColor}
						underlineColorAndroid="transparent"
						returnKeyType="next"
						keyboardType="email-address"
						autoCapitalize="none"
						onChangeText={(text) => this.setState({ email: text })}
						value={this.state.email}
						onSubmitEditing={() => {
						  this.password.focus();
						}}
					  />
					  <Image
						source={require("../images/feather-mail.png")}
						style={{
						  width: 28,
						  height: 20,
						  position: "absolute",
						  right: 15,
						  resizeMode: "cover",
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
						returnKeyType="done"
						ref={(input) => {
						  this.password = input;
						}}
						onChangeText={(text) => this.setState({ password: text })}
						value={this.state.password}
						onSubmitEditing={() => {
						  this.loginAction();
						}}
					  />
					  <Image
						source={require("../images/feather-lock.png")}
						style={{
						  width: 25,
						  height: 25,
						  position: "absolute",
						  right: 15,
						  resizeMode: "cover",
						}}
					  />
					</View>
					<View>
					  <TouchableOpacity
						style={pagestyles.loginBtn}
						activeOpacity={0.5}
						onPress={() => {
						  this.loginAction();
						}}
					  >
						<Text style={pagestyles.buttonPrimaryText}>Login</Text>
					  </TouchableOpacity>
					</View>
					<View>
					  <TouchableOpacity
						style={{ marginTop: 10, alignItems: "flex-end" }}
						activeOpacity={0.5}
						onPress={() => Actions.forgotScreen()}
					  >
						<Text style={pagestyles.TextSeondary}>
						  Forgot Password?
						</Text>
					  </TouchableOpacity>
					</View>
				  </View>
				  <View style={{ alignItems: "center", marginBottom: 10 }}>
					<Text style={{ color: "#1FA2D0" }}>or Login With</Text>
				  </View>
				  <View style={pagestyles.socialLogin}>
					<TouchableOpacity onPress={() => this.facebookSignin()}>
					  <Image
						source={require("../images/facebook.png")}
						style={{ width: 32, height: 32, resizeMode: "cover" }}
					  />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.signInGoogle()}>
					  <Image
						source={require("../images/gmail.png")}
						style={{
						  width: 32,
						  height: 32,
						  resizeMode: "cover",
						  marginLeft: 10,
						}}
					  />
					</TouchableOpacity>
				  </View>
				</View>
	
				<View style={pagestyles.DontAccount}>
				  <Image
					source={require("../images/bottom-round.png")}
					style={{ resizeMode: "cover", width: "100%", height: hp(90) }}
				  />
				  <View
					style={{
					  color: "#fff",
					  position: "absolute",
					  top: 30,
					  width: "100%",
					  flexDirection: "row",
					  justifyContent: "center",
					  alignItems: "flex-end",
					}}
				  >
					<Text style={{ color: "#fff" }}>Don't have an Account?</Text>
					<TouchableOpacity
					  style={{ marginLeft: 7 }}
					  activeOpacity={0.7}
					  onPress={() => this.props.navigation.navigate('SignUpScreen')}
					>
					  <Text style={{ color: "#90C457" }}>Sign Up</Text>
					</TouchableOpacity>
				  </View>
				</View>
			  </ScrollView>
			</SafeAreaView>
		  </>
		);
	  }

}
export default LoginScreen;