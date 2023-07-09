import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import styles, { ThemeColors } from "../styles/main.style";
import pagestyles from "../styles/about.style";
import { Apis } from "../utils/Apis";
import Loader from "../utils/Loader";
import { heightPercentageToDP } from "react-native-responsive-screen";

import { ABOUT_CONTENT } from './resources/AboutContent';

class AboutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutTitle: "",
      aboutContent: "",
      loading: false,
    };
    this.backPressSubscriptions = new Set();
  }

  loaderShowHide = (status) => {
    this.setState({
      loading: status,
    });
  };
  getAboutApi = () => {
    var myData = JSON.stringify({
      slug: "about-4today",
    });
    this.loaderShowHide(true);

    let api = "page/details";
    Apis.callFormDataApis(api, null, myData).then(
      function (result) {
        console.log("Your data: " + JSON.stringify(result));
        this.loaderShowHide(false);
        if (result.status) {
          console.log("result.message:: ", result.message);
          this.setState({ aboutTitle: result.data.title });
          this.setState({ aboutContent: result.data.content });
        } else {
          //Alert.alert('Sorry!',result.message);
          FlushMsg.showError(result.message);
          console.log("result.message:: ", result.message);
        }
      }.bind(this),
      function () {
        console.log("There was an error fetching the time");
        this.loaderShowHide(false);
        FlushMsg.showError(
          "There was an error fetching the time, please try again later."
        );
      }.bind(this)
    );
  };
  componentDidMount() {
    //this.getAboutApi();
  }

  renderItems() {
    return ABOUT_CONTENT.map((item, key) => 
      <View style={ 
        {marginBottom: 20}
      }>
      <Text style={ 
        { fontSize: 18,
          color:'#2B6A63',
          marginBottom: 10,
        }
      }>{item.title}</Text>
      <Text>{item.content}</Text>
      </View>);
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
        {this.state.loading && <Loader />}
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={[
              styles.Header,
              {
                paddingLeft: 0,
                paddingRight: 0,
                position: "absolute",
                top: 10,
                left: 15,
                width: "92%",
                zIndex: 2,
              },
            ]}
          >
            <View style={styles.HeaderLeft}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.props.navigation.goBack()}
                style={{
                  // backgroundColor: "green",
                  paddingVertical: heightPercentageToDP(2),
                }}
              >
                <Image
                  style={{ width: 10, height: 18 }}
                  source={require("../images/icon-back.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={pagestyles.container}>
            <View style={pagestyles.loginHeader}>
              <Image
                source={require("../images/top-round.png")}
                style={{
                  resizeMode: "cover",
                  width: "100%",
                  position: "absolute",
                  top: -950,
                  zIndex: 3,
                }}
              />
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 40,
                  position: "relative",
                  zIndex: 3,
                }}
              >
                <Text style={pagestyles.brandtxt}>About 4Today</Text>
              </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View 
              style={
                {marginTop: 40, marginLeft: 40, marginRight: 40}
              }
            >
            {this.renderItems()}
           </View>
           </ScrollView>
            {/* <ScrollView showsVerticalScrollIndicator={false}>
              <View style={pagestyles.mainContainer}>
                <Text style={pagestyles.nameTxt}>{this.state.aboutTitle}</Text>
                <Text style={pagestyles.bodyTxt}>
                  {this.state.aboutContent}
                </Text>
              </View>
            </ScrollView> */}
          </View>
        </SafeAreaView>
      </>
    );
  }
}
export default AboutScreen;
