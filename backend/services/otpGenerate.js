import otpGenerator from 'otp-generator';
const otpGenerate = () => {
    return otpGenerator.generate(6, { specialChars: false });
}

export default otpGenerate;