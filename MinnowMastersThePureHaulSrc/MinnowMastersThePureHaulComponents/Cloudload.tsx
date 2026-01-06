import { View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const Cloudload = () => {
  const dimensions = Dimensions.get('window');

  const loaderHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        /* From Uiverse.io by Shoh2008 */ 
        html, body {
          height: 100%;
          margin: 0;
          background: transparent;
        }
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background: transparent;
        }
        .loader {
          width: 175px;
          height: 80px;
          display: block;
          margin: auto;
          background-image: radial-gradient(circle 25px at 25px 25px, #FFF 100%, transparent 0), radial-gradient(circle 50px at 50px 50px, #FFF 100%, transparent 0), radial-gradient(circle 25px at 25px 25px, #FFF 100%, transparent 0), linear-gradient(#FFF 50px, transparent 0);
          background-size: 50px 50px, 100px 76px, 50px 50px, 120px 40px;
          background-position: 0px 30px, 37px 0px, 122px 30px, 25px 40px;
          background-repeat: no-repeat;
          position: relative;
          box-sizing: border-box;
        }
        .loader::before {
          content: '';
          left: 60px;
          bottom: 18px;
          position: absolute;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #1D8CD2;
          background-image: radial-gradient(circle 8px at 18px 18px, #FFF 100%, transparent 0), radial-gradient(circle 4px at 18px 0px, #FFF 100%, transparent 0), radial-gradient(circle 4px at 0px 18px, #FFF 100%, transparent 0), radial-gradient(circle 4px at 36px 18px, #FFF 100%, transparent 0), radial-gradient(circle 4px at 18px 36px, #FFF 100%, transparent 0), radial-gradient(circle 4px at 30px 5px, #FFF 100%, transparent 0), radial-gradient(circle 4px at 30px 5px, #FFF 100%, transparent 0), radial-gradient(circle 4px at 30px 30px, #FFF 100%, transparent 0), radial-gradient(circle 4px at 5px 30px, #FFF 100%, transparent 0), radial-gradient(circle 4px at 5px 5px, #FFF 100%, transparent 0);
          background-repeat: no-repeat;
          box-sizing: border-box;
          animation: rotationBack 3s linear infinite;
        }
        .loader::after {
          content: '';
          left: 94px;
          bottom: 15px;
          position: absolute;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: #1D8CD2;
          background-image: radial-gradient(circle 5px at 12px 12px, #FFF 100%, transparent 0), radial-gradient(circle 2.5px at 12px 0px, #FFF 100%, transparent 0), radial-gradient(circle 2.5px at 0px 12px, #FFF 100%, transparent 0), radial-gradient(circle 2.5px at 24px 12px, #FFF 100%, transparent 0), radial-gradient(circle 2.5px at 12px 24px, #FFF 100%, transparent 0), radial-gradient(circle 2.5px at 20px 3px, #FFF 100%, transparent 0), radial-gradient(circle 2.5px at 20px 3px, #FFF 100%, transparent 0), radial-gradient(circle 2.5px at 20px 20px, #FFF 100%, transparent 0), radial-gradient(circle 2.5px at 3px 20px, #FFF 100%, transparent 0), radial-gradient(circle 2.5px at 3px 3px, #FFF 100%, transparent 0);
          background-repeat: no-repeat;
          box-sizing: border-box;
          animation: rotationBack 4s linear infinite reverse;
        }
        @keyframes rotationBack {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
      </style>
    </head>
    <body>
      <div class="loader"></div>
    </body>
    </html>
  `;

  return (
    <View style={{
      height: dimensions.height * 0.55,
      alignSelf: 'center',
      flex: 0,
      width: dimensions.width * 0.9,
    }}>
      <WebView
        allowsInlineMediaPlayback={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        startInLoadingState={false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        javaScriptEnabled={true}
        bounces={false}
        showsVerticalScrollIndicator={false}
        source={{ html: loaderHTML }}
        mixedContentMode="compatibility"
        style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
        scalesPageToFit={false}
      />
    </View>
  );
};

export default Cloudload;