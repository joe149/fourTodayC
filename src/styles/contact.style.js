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
  buttonPrimaryText: {
    color: ThemeColors.whiteColor,
    fontSize: 18,
    fontWeight: "normal",
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
  listItem: {
    margin: 10,
    padding: 13,
    backgroundColor: "#FFF",
    width: "88%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 6,
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
});
