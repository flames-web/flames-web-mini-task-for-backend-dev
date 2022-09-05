const otpGenerator = require('otp-generator')

module.exports.generateOtp = () => {
  const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
  return otp;
}