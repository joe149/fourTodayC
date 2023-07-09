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
    backgroundColor: '#F5F6FA',
    //marginTop: StatusBar.currentHeight || 0,
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
    // marginBottom:5,
  },

  mainContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    paddingHorizontal: 25,
    paddingVertical: 15,
    justifyContent: 'space-between',
    marginBottom: 15,
    borderRadius: 6,
    //     shadowColor: "#000",
    // shadowOffset: {
    // 	width: 0,
    // 	height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    //  elevation: 5,
  },
  nameContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // width: 270,
  },
  nameTxt: {
    fontWeight: '600',
    color: '#000',
    fontSize: 16,
  },
});
