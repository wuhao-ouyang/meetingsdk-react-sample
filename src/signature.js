const KJUR = require('jsrsasign')
const env = require('./env.json')

export function generateSignature(meetingNumber, role) {
  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2

  const oHeader = { alg: 'HS256', typ: 'JWT' }

  const oPayload = {
    sdkKey: env.ZOOM_SDK_KEY,
    mn: meetingNumber,
    role: role,
    iat: iat,
    exp: exp,
    appKey: env.ZOOM_SDK_KEY,
    tokenExp: iat + 60 * 60 * 2
  }

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, env.ZOOM_SDK_SECRET);
  return signature;
}