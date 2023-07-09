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
  },

  loginHeader: {
    justifyContent: "center",
    // backgroundColor: ThemeColors.primaryColor,
    paddingVertical: 15,
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
  homeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: ThemeColors.blackColor,
    paddingHorizontal: 20,
    alignItems: "center",
    height: 66,
    position: "absolute",
    top: 50,
    zIndex: 3,
  },
  homeHeaderLeft: {
    width: "12%",
  },
  homeHeaderMiddle: {
    width: "76%",
    alignItems: "center",
  },
  homeHeaderRight: {
    width: "12%",
    alignItems: "flex-end",
  },
  mainContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    width: ScreenWidth,
    paddingHorizontal: 25,
    paddingBottom: 50,
    justifyContent: "flex-end",
  },
  checkinBtn: {
    width: "100%",
    borderRadius: 26,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 15,
    backgroundColor: ThemeColors.secondaryColor,
    position: "relative",
    zIndex: 9,
  },
  buttonPrimaryText: {
    color: ThemeColors.whiteColor,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
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
  modalViewThinBottom: {
    margin: 20,
    backgroundColor: "#eaeaeb",
    borderRadius: 6,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
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
  buttonclose: {
    borderRadius: 26,
    padding: 10,
    backgroundColor: "transparent",
    borderColor: "#1FA2D0",
    borderWidth: 1,
    width: 80,
    alignItems: "center",
    //color: '#f00',
  },
  buttonclose1: {
    borderRadius: 26,
    padding: 10,
    backgroundColor: "transparent",
    borderColor: "#1FA2D0",
    borderWidth: 1,
    width: 80,
    alignItems: "center",
    //color: '#f00',
  },
  buttonClose2: {
    borderRadius: 26,
    padding: 10,
    borderColor: "#1FA2D0",
    borderWidth: 1,
    width: 80,
    alignItems: "center",
    backgroundColor: "#1FA2D0",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
    fontSize: 20,
    color: "#1FA2D0",
    fontWeight: "bold",
  },
  modalTextCentered: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 20,
    color: "#1FA2D0",
    fontWeight: "bold",
  },
  modalTextRight: {
    marginBottom: 10,
    textAlign: "right",
    fontSize: 20,
    color: "#1FA2D0",
    fontWeight: "bold",
  },
  boldText14: {
    textAlign: "center",
    fontSize: 14,
    color: "#111111",
    fontWeight: "bold",
    height: 20
  },
  closeButton: {
    flexDirection: 'row-reverse',
    right: 0,
  },
  modalButtonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    marginTop: 10,
  },
  modalButtonContainer: {
    height: 30,
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
});
