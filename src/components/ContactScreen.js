import React, { Component, useReducer } from "react";
import {
  Platform,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
  PermissionsAndroid,
  Modal,
} from "react-native";
import styles, { ThemeColors } from "../styles/main.style";
import pagestyles from "../styles/contact.style";
import Loader from "../utils/Loader";
import FlashMsg from "../utils/FlashMsg";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Contacts from "react-native-contacts";
import { Apis } from "../utils/Apis";

class ContactScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: null,
      visibleCross: false,
      arrayholder: [],
      sText: "",
      selectnumber: false,
      numberList: [],
      selected: {},
      currentUser: {},
    };
  }
  componentDidMount() {
    console.log("ContactScreen mounted.");
  //  if (Platform.OS === "android") {
  //     PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
  //       title: "Contacts",
  //       message: " This app would like to see your contacts",
  //     }).then(() => {
  //       this.getContacts();
  //     });
  //   } else if (Platform.OS === "ios") {
  //     this.getContacts();
  //   }
  }

  getContacts = () => {
    Contacts.getAll()
    .then((contacts) => {
      console.log(contacts);
      contacts.sort((a, b) => {
        if (b.familyName > a.familyName) {
          return -1;
        } else {
          return 1;
        }
      });
      this.setState({
        contacts: contacts,
        arrayholder: contacts,
      });
    });
  };

  setSponsor(user) {
    this.setState({
      currentUser: user,
    });
    if (user.phoneNumbers.length > 1) {
      this.setState({
        selectnumber: true,
        numberList: user.phoneNumbers,
      });
      console.log("number list", this.state.numberList);
    } else {
      this.setState({loading: true});
      this.setState({selected: user.phoneNumbers[0]});

      setTimeout(() => {
        this.sponsorApicall();
      }, 1500);
    }
  }
  sponsorApicall() {
    console.log("sponsorApicall -------------- api call function", this.state.selected);
    if (!this.state.selected.number) {
      FlashMsg.showError("Please select a number");
      this.setState({loading: false});
    } else {
      this.setState({selectnumber: false});
      var that = this;
      var user = this.state.currentUser;
      var myData = JSON.stringify({
        device_name: Platform.OS,
        contact_name: user.givenName + " " + user.familyName,
        contact_number: this.state.selected.number,
        device_token: global.fcmToken,
      });
      let api = "sponsor/set";
      Apis.callFormDataApis(api, null, myData).then (
        function (result) {
          this.setState({loading: false});
          if (result.status == true) {
            FlashMsg.showSuccess("Sponsor has been set");
            that.props.navigation.goBack();
          } else {
            FlashMsg.showError(result.message);
          }
        }.bind(this),
        function () {
          console.log("There was an error setting sponsor");
          this.setState({loading: false});
          FlashMsg.showError("There was an error setting sponsor");
        }.bind(this)
      );
    }
  }

  searchFilterFunction = (text) => {
    const res = "";
    const newData = this.state.arrayholder.filter((item) => {
      const itemData = `${item.givenName.toUpperCase()}`;
      const textData = text.toUpperCase();
      const res = itemData.indexOf(textData);
      return itemData.indexOf(textData) > -1;
    });
    if (res > -1) {
      this.setState({ contacts: newData });
    }
  };

  renderItem(item) {
    return item.givenName != "" ? (
      <TouchableOpacity
        style={pagestyles.listItem}
        onPress={() => this.setSponsor(item)}
      >
        <Image
          source={
            item.thumbnailPath
              ? { uri: item.thumbnailPath }
              : require("../images/user-icon.png")
          }
          style={
            item.thumbnailPath
              ? { width: 60, height: 60, borderRadius: 30 }
              : {
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "#f4f4f4",
                  borderWidth: 1,
                  borderColor: "#f4f4f4",
                }
          }
        />
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
            flex: 1,
            marginLeft: 12,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            {Platform.OS == "android"
              ? item.displayName
              : item.familyName + " " + item.givenName}
          </Text>
          {item.phoneNumbers
            ? item.phoneNumbers.map((ph, ind) => {
                return <Text key={ind}>{ph.number}</Text>;
              })
            : null}
        </View>
       {/* <TouchableOpacity
          style={{
            height: 50,
            width: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 4, height: 19 }}
            source={require("../images/dotted-bar.png")}
          />
        </TouchableOpacity> */}
      </TouchableOpacity>
    ) : null;
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
            <View style={styles.HeaderRight}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={{
                  paddingVertical: hp(2)
                }}
              >
                <Text style={pagestyles.buttonPrimaryText}>Cancel</Text>
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
                  paddingHorizontal: 0,
                  position: "relative",
                  zIndex: 3,
                }}
              >
                <Text style={pagestyles.brandtxt}>Contacts</Text>
              </View>
            </View>

            <View style={pagestyles.mainContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: hp(1),
                  marginHorizontal: wp(5),
                  height: hp(4),
                  //backgroundColor: "red",
                }}
              >
                <TextInput
                  style={{
                    fontSize: wp(4.5),
                    width: "90%",
                    height: Platform.OS == "android" ? hp(6) : hp(3.5),
                    color: "darkgrey",
                    marginBottom: hp(2),
                  }}
                  placeholder="Search..."
                  placeholderTextColor={"darkgrey"}
                  value={this.state.sText}
                  onChangeText={(text) => {
                    if (text.length > 0) {
                      this.setState({ sText: text, visibleCross: true });
                      this.searchFilterFunction(text);
                    } else {
                      this.setState({
                        //users: this.arrayholder,
                        sText: "",
                        visibleCross: false,
                      });
                    }
                  }}
                />
                {this.state.visibleCross ? (
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          users: this.state.arrayholder,
                          sText: "",
                          visibleCross: false,
                        });
                        this.getList();
                      }}
                    >
                      <Image
                        source={require("../images/close.png")}
                        style={{
                          width: wp(4),
                          height: wp(4),
                          marginRight: wp(4),
                          marginTop: wp(2),
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          users: this.state.arrayholder,
                          sText: "",
                          visibleCross: false,
                        });
                        this.getList();
                      }}
                    >
                      <Image
                        source={require("../images/refresh.png")}
                        style={{
                          width: wp(4),
                          height: wp(4),
                          marginTop: wp(2),
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text>.</Text>
                )}
              </View>
              <FlatList
                style={{ flex: 1 }}
                data={this.state.contacts}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={(item) => item.recordID}
              />
            </View>
          </View>
          {this.state.selectnumber ? (
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.showDialog3}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                this.setMeeting();
              }}
            >
              <View style={pagestyles.centeredView}>
                <View style={pagestyles.modalView}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={pagestyles.modalText}>Select number</Text>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          selectnumber: false,
                        });
                      }}
                    >
                      <Image
                        source={require("../images/close.png")}
                        style={{ width: 10, height: 10 }}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text>Choose the correct number from the list</Text>
                  {this.state.numberList.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ selected: item });
                        }}
                        key={index}
                        style={{ flexDirection: "row", marginTop: 10 }}
                      >
                        {this.state.selected &&
                        this.state.selected.number == item.number ? (
                          <Image
                            source={require("../images/tick2.png")}
                            style={{
                              width: 15,
                              marginTop: 3,
                              height: 15,
                              marginRight: 10,
                            }}
                          />
                        ) : (
                          <Image
                            source={require("../images/square.png")}
                            style={{
                              width: 15,
                              marginTop: 3,
                              height: 15,
                              marginRight: 10,
                            }}
                          />
                        )}
                        <Text style={{ fontSize: 16 }}>{item.number}</Text>
                      </TouchableOpacity>
                    );
                  })}
                  <TouchableOpacity
                    onPress={() => {
                      this.sponsorApicall();
                    }}
                    activeOpacity={0.5}
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Text
                      style={{
                        marginTop: hp(2),
                        color: "#1FA2D0",
                        fontSize: 18,
                      }}
                    >
                      SET
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          ) : null}
        </SafeAreaView>
      </>
    );
  }
}
export default ContactScreen;
