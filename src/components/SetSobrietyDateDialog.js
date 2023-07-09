import React, {Component} from 'react';
import {View, Text, Modal, TouchableOpacity, Image} from 'react-native';

import pagestyles from '../styles/home.style';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';

const dateFormat = 'MMMM Do YYYY';

class SetSobrietyDateDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sobrietyDate: props.sobrietyDate,
      closeFunction: props.closeFunction,
    };
  }

  onChange = (event, selectedDate) => {
    this.setState({
      sobrietyDate: Moment(selectedDate).format(dateFormat),
    });
  };

  render() {
    return (
      <Modal animationType="slide" transparent={true} onRequestClose={() => {this.state.closeFunction()}}>
        <View style={pagestyles.centeredView}>
          <View style={pagestyles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={pagestyles.modalTextCentered}>Set Sobriety Date</Text>
              <TouchableOpacity
                onPress={() => {
                  this.state.closeFunction();
                }}>
                <Image
                  source={require('../images/close.png')}
                  style={{width: 10, height: 10}}
                />
              </TouchableOpacity>
            </View>
            <Text style={{paddingTop: 5,paddingBottom: 12, color: '#000', fontSize: 16, fontWeight: '600',textAlign: "center"}}>Select your sobriety date below:</Text>
            <View style={{borderColor: '#999999',  borderWidth: 1, borderRadius: 8, padding: 2}}>
                <DateTimePicker
                    style={{backgroundColor: '#fff',borderRadius: 8}}
                    testID="dateTimePicker"
                    value={
                    this.state.sobrietyDate === '' ? new Date()
                     : Moment(this.state.sobrietyDate, dateFormat).toDate()}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, date) => this.onChange(event, date)}
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
                  Set Date
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
          </View>
        </View>
      </Modal>
    );
  }
}

export default SetSobrietyDateDialog;
