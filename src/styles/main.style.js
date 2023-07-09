import {StyleSheet, PixelRatio, Dimensions} from 'react-native';
//import {Fonts} from '../utils/Fonts';
let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

export const ThemeColors = {
  primaryColor: '#239AA4',
  secondaryColor: '#90c457',
  darkgreyColor: '#90C457',
  lightgreyColor: '#A8A8A8',
  offwhiteColor: '#cccccc',
  whiteColor: '#ffffff',
  blackColor: '#000000',
  redColor: '#e21313',
  greenColor: '#5ba829',
};

export default StyleSheet.create({
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor: ThemeColors.blackColor,
    //  borderBottomColor: ThemeColors.primaryColor,
    // borderBottomWidth: 1,
    //paddingLeft: 10,
    //  paddingRight: 10,
    alignItems: 'center',
    // height: 46,
  },
  HeaderLeft: {
    // backgroundColor: ThemeColors.darkgreyColor,
    width: '12%',
    paddingTop: 8,
    paddingBottom: 8,
  },
  HeaderMiddle: {
    width: '58%',
    alignItems: 'flex-start',
    //backgroundColor: ThemeColors.whiteColor,
  },
  HeaderRight: {
    width: '30%',
    alignItems: 'flex-start',
  },
  HeaderText: {
    color: ThemeColors.secondaryColor,
    fontSize: 15,
    fontWeight: 'bold',
  },
  Heading: {
    fontSize: 16,
    color: ThemeColors.blackColor,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  CloseButtonTextStyle: {
    color: ThemeColors.whiteColor,
    fontSize: 17,
  },
  cardViewStyle: {
    backgroundColor: ThemeColors.whiteColor,
    shadowColor: '#000000',
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    shadowOffset: {height: 2, width: 0},
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginTop: 10,
  },
  shadowStyle: {
    shadowColor: '#83A2CB',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 0,
  },
  buttonPrimary: {
    backgroundColor: ThemeColors.primaryColor,
    height: 44,
    borderRadius: 2,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 40,
  },
  buttonSecondary: {
    backgroundColor: ThemeColors.blueColor,
    height: 44,
    borderRadius: 2,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: ThemeColors.primaryColor,
    height: 44,
    borderRadius: 2,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  TextCenter: {
    alignItems: 'center',
  },
  TextWhite: {
    color: ThemeColors.whiteColor,
  },
  TextBlack: {
    color: ThemeColors.blackColor,
  },
  TextGreen: {
    color: ThemeColors.greenColor,
  },
  TextMuted: {
    color: ThemeColors.darkgreyColor,
  },
  TextPrimary: {
    color: ThemeColors.primaryColor,
  },
  TextSecondary: {
    color: ThemeColors.secondaryColor,
  },
  TextBlue: {
    color: ThemeColors.blueColor,
  },
  formControl: {
    height: 44,
    color: ThemeColors.blackColor,
    backgroundColor: ThemeColors.whiteColor,
    borderColor: ThemeColors.lightgreyColor,
    borderWidth: 1,
    borderRadius: 40,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 14,
  },
  FormControltextArea: {
    color: ThemeColors.secondaryColor,
    borderColor: ThemeColors.blueColor,
    borderWidth: 1,
    borderRadius: 22,
    marginBottom: 10,
    backgroundColor: ThemeColors.whiteColor,
    paddingLeft: 15,
    paddingRight: 15,
  },
  Row: {
    flexDirection: 'row',
  },
  Imgfluid: {
    width: '100%',
    height: '100%',
  },
  mt_15: {
    marginTop: 15,
  },
  mt_10: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  },
});
