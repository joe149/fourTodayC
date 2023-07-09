import {StyleSheet, PixelRatio, Dimensions} from 'react-native';
import {ThemeColors} from './main.style';
//import {Fonts} from '../utils/Fonts';
let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

// screen sizing
const {width, height} = Dimensions.get('window');
// orientation must fixed
const Screen_Width = width < height ? width : height;

const MenuColums = 2;
const Menu_Margin = 15;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },

  loginHeader: {
    justifyContent: 'center',
    paddingVertical: 30,
    alignItems: 'center',
    position: 'relative',
  },
  brandtxt: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },

  mainContainer: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  nameTxt: {
    fontWeight: '600',
    color: '#1FA2D0',
    fontSize: 24,
    marginBottom: 15,
  },
  bodyTxt: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
});
