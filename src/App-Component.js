import React from "react";

import "./App.css";
import { useSearchParams } from "react-router-dom";
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";

import { generateSignature } from "./signature";

function App() {
  const client = ZoomMtgEmbedded.createClient();

  let [searchParams] = useSearchParams();
  let meetingId = searchParams.get("meetingId");
  let password = searchParams.get("password");
  let token = searchParams.get('jwt');
  let userName = searchParams.get('userName');
  console.log(`meetingId: ${meetingId}`);
  console.log(`token: ${token}`);
  console.log(`password: ${password}`);

  const env = require("./env.json");

  //https://intrivo.zoom.us/j/87187651454?pwd=SjBsdTlzUEhXNEs1U0tHc1AzMkl4dz09
  console.log(`key: ${env.ZOOM_SDK_KEY}`);

  // This Sample App has been updated to use SDK App type credentials https://marketplace.zoom.us/docs/guides/build/sdk-app
  var sdkKey = env.ZOOM_SDK_KEY;
  var meetingNumber = meetingId;
  var role = 0;
  // var leaveUrl = `https://192.168.0.24:3000?meetingId=${meetingId}&token=${token}`;
  // var userName = "React";
  var userEmail = "";
  // pass in the registrant's token if your meeting or webinar requires registration. More info here:
  // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/component-view/meetings#join-registered
  // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/component-view/webinars#join-registered
  var registrantToken = "";

  function startMeeting() {
    // const signature = generateSignature(meetingNumber, role);
    const signature = token;

    let meetingSDKElement = document.getElementById("meetingSDKElement");
    const { innerWidth: width, innerHeight: height } = window;
    console.log(`${width}x${height}`);

    client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement,
      language: "en-US",
      customize: {
        meetingInfo: [
          "mn",
          "pwd",
          "telPwd",
          "participant",
          "dc",
          "enctype",
        ],
        video: {
          popper: {
            disableDraggable: true,
          },
          isResizable: true,
          viewSizes: {
            default: {
              width: width - 4,
              height: height - 60,
            },
          },
        },
      },
    });

    client.on("connection-change", (payload) => {
      console.log("*** connection-change");
      console.log(payload);
      window.ReactNativeWebView?.postMessage(`zoom-meeting-${payload.state.toLowerCase()}`);
    });

    client.join({
      sdkKey: sdkKey,
      signature: signature,
      meetingNumber: meetingNumber,
      password: password,
      userName: userName,
      userEmail: userEmail,
      tk: registrantToken,
    }).then((res) => {
      console.log("joined: " + res);
      if (document.getElementsByClassName('zmwebsdk-makeStyles-root-28')[4]) {
        document.getElementsByClassName('zmwebsdk-makeStyles-root-28')[4].style.display = 'none';
      }
      if (document.getElementsByClassName('zmwebsdk-makeStyles-root-28')[5]) {
        document.getElementsByClassName('zmwebsdk-makeStyles-root-28')[5].style.display = 'none';
      }
      if (document.getElementsByClassName('zmwebsdk-makeStyles-root-28')[6]) {
        document.getElementsByClassName('zmwebsdk-makeStyles-root-28')[6].style.display = 'none';
      }
      if (document.getElementsByClassName('zmwebsdk-makeStyles-root-28')[7]) {
        document.getElementsByClassName('zmwebsdk-makeStyles-root-28')[7].style.display = 'none';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    startMeeting();
 }, false);

  return (
    <div className="App">
      <main>
        {/* For Component View */}
        <div id="meetingSDKElement">
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>

        {/* <button onClick={startMeeting}>Join Meeting</button> */}
      </main>
    </div>
  );
}

export default App;
