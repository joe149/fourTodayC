import { StyleSheet, PixelRatio, Dimensions } from "react-native";
import { ThemeColors } from "./main.style";
//import {Fonts} from '../utils/Fonts';
let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

// screen sizing
const { width, height } = Dimensions.get("window");
// orientation must fixed
const Screen_Width = width < height ? width : height;

const MenuColums = 2;
const Menu_Margin = 15;

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
  },

  mainContainer: {
    flex: 1,
    paddingTop: 30,
    alignItems: "center",
  },
  nameTxt: {
    fontWeight: "600",
    color: "#1FA2D0",
    fontSize: 18,
  },
  ImageContainer: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    paddingTop: 20,
  },

  GalleryImg: {
    width: (Screen_Width - (MenuColums + 1) * Menu_Margin) / MenuColums,
    marginLeft: Menu_Margin,
    marginTop: 15,
    position: "relative",
  },
  ImgFluid: {
    width: "100%",
    height: (Screen_Width - (MenuColums + 1) * Menu_Margin) / MenuColums,
    resizeMode: "cover",
    borderRadius: 6,
  },
  checkphoto: {
    position: "absolute",
    top: -25,
    right: -30,
    zIndex: 99,
    width: 82,
    height: 82,
  },
});
