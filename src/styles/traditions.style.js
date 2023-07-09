import { StyleSheet, PixelRatio, Dimensions } from "react-native";
import { ThemeColors } from "./main.style";
//import {Fonts} from '../utils/Fonts';
let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

// screen sizing
const { width, height } = Dimensions.get("window");
// orientation must fixed
const Screen_Width = width < height ? width : height;

const MenuColums = 3;
const Menu_Margin = 10;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    //marginTop: StatusBar.currentHeight || 0,
  },

  loginHeader: {
    justifyContent: "center",
    paddingVertical: 30,
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },
  brandtxt: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    // marginBottom:5,
  },

  mainContainer: {
    paddingVertical: 20,
    paddingHorizontal: 0,
    flex: 1,
  },

  textcontainer: {
    // alignItems: 'center',
    borderColor: "#dcdcdc",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    padding: 0,
    // marginBottom: 15,
    borderRadius: 6,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  textcontainer2: {
    // alignItems: 'center',
    borderColor: "#dcdcdc",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    padding: 20,
    // marginBottom: 15,
    borderRadius: 6,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
  },
  titleTxt: {
    fontWeight: "bold",
    color: "#1FA2D0",
    fontSize: 20,
    marginBottom: 10,
  },
  bodytxt: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },

  // container: {
  //   flex: 1,
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   marginTop: 25,
  // },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
