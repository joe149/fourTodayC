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
  },

  loginHeader: {
    justifyContent: "center",
    paddingVertical: 30,
    alignItems: "center",
    position: "relative",
  },
  brandtxt: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    // marginBottom:5,
  },

  mainContainer: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    marginTop: 40,
  },
  logincontainer: {
    // flex:1,
    justifyContent: "center",
    // paddingVertical: 40,
    paddingHorizontal: 30,
  },
  titletxt: {
    fontSize: 28,
    color: "#1FA2D0",
    fontWeight: "bold",
    marginBottom: 5,
  },
  bodytxt: {
    fontSize: 16,
    color: "#1D2226",
  },
  formsection: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: ThemeColors.lightgreyColor,
    borderWidth: 1,
    borderRadius: 26,
    marginTop: 20,
    position: "relative",
    overflow: "hidden",
  },
  Formicon: {
    position: "absolute",
    right: 25,
  },
  input: {
    // flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 18,
    // backgroundColor: 'red',
    color: "#1A1A1A",
    width: "85%",
    height: 45,
    // fontSize: 16,
  },
  input2: {
    // flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 18,
    backgroundColor: "lightgrey",
    color: "#1A1A1A",
    width: "85%",
    height: 45,
    marginLeft: 5,
    // fontSize: 16,
  },
  updateBtn: {
    width: "100%",
    borderRadius: 26,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    opacity: 1.0,
    backgroundColor: '#5ba829',
  },
  updateBtnDisabled: {
    width: "100%",
    borderRadius: 26,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    opacity: 0.5,
    backgroundColor: '#5ba829',
  },
  buttonPrimaryText: {
    color: ThemeColors.whiteColor,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  textareacontainer: {
    borderRadius: 6,
    borderColor: "#dcdcdc",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    // flex: 1,
    padding: 15,
    justifyContent: "flex-start",
    // height: 150,
    borderColor: ThemeColors.lightgreyColor,
    borderWidth: 1,
    borderRadius: 26,
    marginTop: 20,
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
    textAlignVertical: "top",
  },
  heading: {
    fontSize: 14,
    marginLeft: 15,
    fontWeight: "700",
    color: "darkgrey",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
    fontSize: 20,
    color: "#1FA2D0",
    fontWeight: "bold",
  },
  modalTitleText: {
    marginBottom: 15,
    alignItems: "center",
    fontSize: 20,
    color: "#1FA2D0",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  buttonModel: {
    width: "100%",
    borderRadius: 6,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 15,
  },
  textbox: {
    width: "100%",
    backgroundColor: "white",
    height: 40,
    padding: 5,
    marginBottom: 15,
  }, 
  modalView: {
    margin: 20,
    backgroundColor: "#eaeaeb",
    borderRadius: 6,
    padding: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
