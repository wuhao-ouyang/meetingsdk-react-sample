import React from 'react';
import { useSearchParams } from "react-router-dom";

import './App.css';
import { ZoomMtg } from '@zoomus/websdk';

import { generateSignature } from './signature'

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.5.0/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

function App() {

  let [searchParams, ] = useSearchParams();
  let meetingId = searchParams.get('meetingId');
  let password = searchParams.get('password');
  console.log(`meetingId: ${meetingId}`);
  console.log(`password: ${password}`);

  const env = require('./env.json');

  console.log(`key: ${env.ZOOM_SDK_KEY}`);

  // setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
  // var signatureEndpoint = 'https://192.168.0.24:4000'
  // This Sample App has been updated to use SDK App type credentials https://marketplace.zoom.us/docs/guides/build/sdk-app
  var sdkKey = env.ZOOM_SDK_KEY
  var meetingNumber = meetingId
  var role = 0
  var leaveUrl = 'https://192.168.0.24:3000'
  var userName = 'React'
  var userEmail = ''
  var passWord = password
  // pass in the registrant's token if your meeting or webinar requires registration. More info here:
  // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/meetings#join-registered
  // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/webinars#join-registered
  var registrantToken = ''

  function getSignature(e) {
    e.preventDefault();

    const signature = generateSignature(meetingNumber, role);
    startMeeting(signature);

    // fetch(signatureEndpoint, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     meetingNumber: meetingNumber,
    //     role: role
    //   })
    // }).then(res => res.json())
    // .then(response => {
    //   startMeeting(response.signature)
    // }).catch(error => {
    //   console.error(error)
    // })
  }

  function startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log('--------------------------')
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          sdkKey: sdkKey,
          userEmail: userEmail,
          passWord: passWord,
          tk: registrantToken,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>

        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );
}

export default App;
