import React, {Component} from 'react';
import {View, Modal, ActivityIndicator, Image, Text} from 'react-native';
import styles from '../styles/main.style';

const Loader = props => {
  const {loading} = props;

  return (
    // <View style={styles.Loader}>
    //   <Image
    //     style={styles.LoaderImg}
    //     source={require('../images/spinning-cheeseburger.gif')}
    //   />
    //   <Text style={styles.TextMuted}>Loading...</Text>
    // </View>
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'space-around',
          backgroundColor: '#00000040',
        }}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            height: 100,
            width: 100,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          {/* <Image
            // style={styles.LoaderImg}
            source={require('../images/spinning-cheeseburger.gif')}
          /> */}
          <ActivityIndicator
            color="#8CC63F" //'#0137FF'
            animating={loading}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
