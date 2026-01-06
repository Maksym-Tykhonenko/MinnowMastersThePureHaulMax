import RNFS from 'react-native-fs';
const signaturePath = RNFS.MainBundlePath + '/MinnowMastersThePureHaulAssets/MinnowMastersThePureHaul_signature.dat';
RNFS.readFile(signaturePath).then(data => {
}).catch(() => {
});
