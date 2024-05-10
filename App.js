import { Alert, Button, Text, View, StyleSheet } from 'react-native';
import React,{ useState } from 'react';
import MRZScanner from './MRZScanner';

export default function App() {
  const [scanning,setScanning] = useState(false);

  const showResults = (result) => {
    console.log("result");
    console.log(result);
    if (result) {
      Alert.alert("MRZ Scanner",result);
      setScanning(false);
    }
  }

  return (
    <View style={styles.container}>
      {scanning &&
        <MRZScanner
          onScanned={(results)=>showResults(results)}
          onClosed={()=>setScanning(false)}
        ></MRZScanner>
      }
      {!scanning &&
        <View style={{alignItems:'center'}}>
          <Text style={styles.title}>
              Dynamsoft Label Recognizer Demo
            </Text>
          <Button title='Start MRZ Scanner' onPress={() => setScanning(true)}></Button>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
});