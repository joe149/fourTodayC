import {StyleSheet, PixelRatio, Dimensions} from 'react-native';
import {ThemeColors} from './main.style';
//import {Fonts} from '../utils/Fonts';
let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

// screen sizing
const {width, height} = Dimensions.get('window');
// orientation must fixed
const Screen_Width = width < height ? width : height;

const MenuColums = 3;
const Menu_Margin = 10;

export default StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#fff',
    // flexDirection:'column'
  },

  loginHeader: {
    // flex:1,
    justifyContent: 'center',
    // backgroundColor: ThemeColors.primaryColor,
    //  paddingHorizontal:40,
    paddingVertical: 35,
    alignItems: 'center',
    // paddingTop:50,
    // paddingBottom:50,
    //borderBottomStartRadius:60,
    // borderBottomEndRadius:60,
    position: 'relative',
  },
  brandtxt: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  shortinfo: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  logincontainer: {
    // flex:1,
    justifyContent: 'center',
    paddingVertical: 20,
    // paddingTop:20,
    // paddingBottom:10,
    paddingHorizontal: 30,
  },
  titletxt: {
    fontSize: 28,
    color: '#1FA2D0',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bodytxt: {
    fontSize: 16,
    color: '#1D2226',
  },
  formsection: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
    borderColor: ThemeColors.lightgreyColor,
    borderWidth: 1,
    borderRadius: 26,
    marginTop: 15,
    position: 'relative',
    overflow: 'hidden',
  },
  Formicon: {
    position: 'absolute',
    right: 25,
  },
  input: {
    // flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 18,
    // backgroundColor: 'red',
    color: '#1A1A1A',
    width: '85%',
    height: 45,
    fontSize: 16,
  },
  loginBtn: {
    width: '100%',
    borderRadius: 26,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    backgroundColor: ThemeColors.secondaryColor,
  },
  buttonPrimaryText: {
    color: ThemeColors.whiteColor,
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  TextSeondary: {
    color: '#239AA4',
  },
  socialLogin: {
    // flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  DontAccount: {
    backgroundColor: '#fff',
    // flex:1,
    // justifyContent:'space-between'
    // minHeight:ScreenHeight,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
    color: '#fff',
  },
});
