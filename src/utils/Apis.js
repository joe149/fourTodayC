import { Platform } from "react-native";

//const iosURL = "http://localhost:8000/";
//const iosURL = "http://192.168.1.162:80/";
const iosURL = "http://localhost/";

const androidEmulatorURL = "http://10.0.2.2:8000/"
const liveUrl = "";
const apiPrefix = "api/v1/";

function getApiBaseURL() {
  switch (Platform.OS) {
    case "ios":
      return iosURL + apiPrefix;
      break;
    case "android":
      return androidEmulatorURL + apiPrefix;
      break;
    default:
      return ""
  }
}

function getAPIURL(apiName) {
  return this.getApiBaseURL() + apiName;
}

/* api call for raw data */
var callApis = function (apiName, myData) {
  var apiUrl = getApiBaseURL() + apiName;
  console.log("apiUrl:: ", apiUrl);
  console.log("myData:: ", myData);
  return new Promise(function (onSuccess, onFail) {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: myData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson:: ", JSON.stringify(responseJson));
        onSuccess(responseJson);
      })
      .catch((error) => {
        console.log(error);
        onFail(error);
      });
  });
};

const createFormData = (photo, body) => {
  console.log("bodybody:: ", body);
  const data = new FormData();
  if (photo != null) {
    console.log("photophoto:: ", photo);
    if (photo.length > 0) {
      for (var i = 0; i < photo.length; i++) {
        console.log("photo.fileName:: ", photo[i].fileName);
        console.log("photo.type:: ", photo[i].type);
        data.append(photo[i].serverFileName, {
          name: photo[i].fileName,
          type: photo[i].type,
          uri:
            Platform.OS === "android"
              ? photo[i].uri
              : photo[i].uri.replace("file://", ""),
        });
      }
    }
  }
  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });
  return data;
};

var callFormDataApis = function (apiName, fileData, myData) {
 
  var apiUrl = getApiBaseURL() + apiName;
  console.log("apiUrl:: ", apiUrl);
  console.log("myData:: ", myData);
  console.log("myData.length:: ", myData.length);
  console.log("global.loginUserTokenType:: ", global.loginUserTokenType);
  console.log("global.loginUserAccessToken:: ", global.loginUserAccessToken);

  return new Promise(function (onSuccess, onFail) {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization:
          global.loginUserTokenType + " " + global.loginUserAccessToken,
      },
      body: createFormData(fileData, JSON.parse(myData)),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson:: ", JSON.stringify(responseJson));
        onSuccess(responseJson);
      })
      .catch((error) => {
        console.log("error::", error);
        onFail(error);
      });
  });
};

var callApi = function (apiName) {
  var apiUrl = getApiBaseURL() + apiName;
  console.log("yes");

  console.log("apiUrl:: ", apiUrl);
  // console.log('myData:: ', myData);
  return new Promise(function (onSuccess, onFail) {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization:
          global.loginUserTokenType + " " + global.loginUserAccessToken,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson:: ", JSON.stringify(responseJson));
        onSuccess(responseJson);
      })
      .catch((error) => {
        console.log(error);
        onFail(error);
      });
  });
};

var callGetApis = function (apiName, token) {
  var apiUrl = getApiBaseURL() + apiName;
  if (
    apiName ==
    "https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,email-address,profilePicture(displayImage~:playableStreams))"
  ) {
    var apiUrl = apiName;
  } else if (
    apiName ==
    "https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))"
  ) {
    var apiUrl = apiName;
  }

  console.log("apiUrl:: ", apiUrl);
  var tokenToUse = token != null ? "Bearer " + token : global.loginUserTokenType + " " + global.loginUserAccessToken;
  console.log("Using token: ", tokenToUse);
  return new Promise(function (onSuccess, onFail) {
    fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: tokenToUse
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson:: ", JSON.stringify(responseJson));
        onSuccess(responseJson);
      })
      .catch((error) => {
        console.log("error::", error);
        onFail(error);
      });
  });
};

export const Apis = {
  callApi,
  callApis,
  callFormDataApis,
  callGetApis,
  getApiBaseURL,
  getAPIURL
};
