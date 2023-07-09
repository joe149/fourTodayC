import React, {Component} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import pagestyles from '../styles/home.style';
import Loader from '../utils/Loader';
import FlashMsg from '../utils/FlashMsg';
import {Apis} from '../utils/Apis';

class SetSponsorDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closeFunction: props.closeFunction,
      showSetSponsorContact: true,
      showAddNewSponsorContact: false,
      sponsorName: '',
      sponsorNumber: '',
      addButtonDisabled: true,
      loading: false,
    };
   // this.homeApi();
   // console.log("SetSponsorDialog called with " + this.state.sponsorName);
  }

  componentDidMount = () => {
    this.homeApi();
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
    Apis.callGetApis(api).then(
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

  setSponsorAPI() {
    console.log("setSponsorAPI -------------- to add new sponsor");
    var that = this;
    var user = this.state.currentUser;
    var myData = JSON.stringify({
      device_name: Platform.OS,
      sponsor_name: this.state.sponsorName,
      sponsor_number: this.state.sponsorNumber,
      device_token: global.fcmToken,
    });
    let api = "sponsor/set";
    Apis.callFormDataApis(api, null, myData).then (
      function (result) {
        this.setState({loading: false});
        if (result.status == true) {
          FlashMsg.showSuccess("Sponsor has been set");
        } else {
          FlashMsg.showError(result.message);
        }
        this.state.closeFunction("AddSponsor");
      }.bind(this),
      function () {
        console.log("There was an error setting sponsor");
        this.setState({loading: false});
        FlashMsg.showError("There was an error setting sponsor");
        this.state.closeFunction("AddSponsor");
      }.bind(this)
    );
  ;} 

  nameUpdated = name => {
    this.setState({sponsorName: name});
    this.checkEnableAddButton();
  };

  numberUpdated = number => {
    this.setState({sponsorNumber: number});
    this.checkEnableAddButton();
  };

  checkEnableAddButton = () => {
    
    disable = !this.state.sponsorName.trim() || !this.state.sponsorNumber.trim()
    this.setState({addButtonDisabled: disable});
  };

  addNewSponsorIfValid = () => {
    const regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if (!regex.test(this.state.sponsorNumber)) {
      Alert.alert(
        'Invalid Phone Number',
        'Please enter a valid US phone number (e.g. 650-269-9999)',
        [{text: 'OK'}],
      );
    } else {
      this.setSponsorAPI()
    }
  };
  
  addButtonTextStyle = () => {
    if (this.state.addButtonDisabled) {
      return {
        borderRadius: 8,
        padding: 6,
        backgroundColor: 'transparent',
        borderColor: '#888888',
        borderWidth: 1,
        width: 80,
        alignItems: 'center',
        color: '#888888',
        textAlign: 'center',
        fontSize: 20,
      };
    } else {
      return {
        borderRadius: 8,
        padding: 6,
        backgroundColor: 'transparent',
        borderColor: '#1FA2D0',
        borderWidth: 1,
        width: 80,
        alignItems: 'center',
        color: '#000',
        textAlign: 'center',
        fontSize: 20,
      };
    }
  };
//        {this.state.loading && <Loader />}

  render() {
    return (
      <Modal animationType="slide" transparent={true} onRequestClose={() => {}}>
        {/* Select Sponsor or Create New Contact */}
        {this.state.showSetSponsorContact ? (
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
                    this.state.closeFunction('');
                    }}>                  
                  <Image
                    source={require('../images/close.png')}
                    style={{width: 10, height: 10}}
                  />
                </TouchableOpacity>
              </View>
              {this.state.sponsorName !== undefined && this.state.sponsorName !== '' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Text style={{color: '#000', fontSize: 16, marginBottom: 15,}}>Your sponsor is currently: </Text>
                  <Text style={{color: '#000', fontSize: 16, marginBottom: 15, fontWeight: "bold"}}>{this.state.sponsorName}</Text>
                </View>
              ) : 
              <Text style={{color: '#000', fontSize: 16, marginBottom: 15,}}>You have not set your sponsor yet.</Text>
             }
              <TouchableOpacity
                style={pagestyles.buttonModel}
                activeOpacity={0.5}
                onPress={() => {
                  this.state.closeFunction('ContactScreen');
                }}>
                <Text style={{color: '#000', fontSize: 16}}>
                  Select Sponsor from Contacts
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={pagestyles.buttonModel}
                activeOpacity={0.5}
                onPress={() => {
                  this.setState({
                    showSetSponsorContact: false,
                    showAddNewSponsorContact: true,
                  });
                }}>
                <Text style={{color: '#000', fontSize: 16}}>
                  Create New Contact for Sponsor
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {/* Add New Sponsor Contact */}

        {this.state.showAddNewSponsorContact ? (
          <View style={pagestyles.centeredView}>
            <View style={pagestyles.modalView}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={pagestyles.modalText}>
                  Add New Sponsor Contact
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      contactForm: false,
                    })
                  }>
                  <Image
                    style={{
                      width: 9,
                      height: 9,
                    }}
                    source={require('../images/close.png')}
                  />
                </TouchableOpacity>
              </View>

              <TextInput
                onChangeText={text => this.nameUpdated(text)}
                value={this.state.cname}
                placeholderTextColor="grey"
                placeholder="Sponsor's name"
                style={pagestyles.textbox}
                autoFocus={true}
              />

              <TextInput
                style={pagestyles.textbox}
                onChangeText={text => this.numberUpdated(text)}
                value={this.state.cno}
                placeholderTextColor="grey"
                placeholder="Sponsor's number"
              />

              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={() => {
                  this.addNewSponsorIfValid();
                }}
                disabled={this.state.addButtonDisabled}
                activeOpacity={1.0}>
                <Text style={this.addButtonTextStyle()}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </Modal>
    );
  }
}

export default SetSponsorDialog;
