import { WebView } from 'react-native-webview';
import { StyleSheet, View, Text, PermissionsAndroid,Platform } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function MRZScanner(props) {
  const [hasPermission, setHasPermission] = useState(null);

  const encodedLicense = () => {
    return encodeURIComponent("DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==");
  }

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        setHasPermission(true);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  
  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        await requestCameraPermission();
      }else{
        setHasPermission(true);
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (hasPermission) {
    return (
      <WebView
        style={styles.container}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        onMessage={(event) => {
          console.log(event);
          if (event.nativeEvent.data === "close") {
            if (props.onClosed) {
              props.onClosed();
            }
          }else{
            if (event.nativeEvent.data) {
              if (props.onScanned) {
                props.onScanned(event.nativeEvent.data);
              }
            }
          }
        }}
        source={{ uri: 'https://tony-xlh.github.io/Vanilla-JS-MRZ-Scanner-Demos/React-Native-Webview/?startScan=true&license='+encodedLicense() }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});