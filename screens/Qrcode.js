import React, {useEffect, useState} from 'react';
import { StyleSheet, Dimensions, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Button } from '../components';
const { width } = Dimensions.get('screen');

import { MatchService } from "../services/match/match.service";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Images, argonTheme } from "../constants";

function Qrcode(props) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState(
      "No QR code scanned at the moment. Scan the QR code of a match to access its details page"
    );
    const [matchScanned, setMatchScanned] = useState();
    const [isMatchScanned, setIsMatchScanned] = useState(false);
  
    const askForCameraPermission = () => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    };
  
    const handleBarCodeScanned = (type, data) => {
      setScanned(true);
      if (typeof data == "string") {
        if (data.includes("/match/get?id=")) {
          const idMatch = data.split("get?id=")[1];
          setIsMatchScanned(true);
          setMatchScanned(idMatch);
          setText(
            "The match details are loaded. Touch the button to scan a new match."
          );
          console.log(
            `Bar code with type ${type} and data ${data} has been scanned!`
          );
          console.log(`Un match est scanne!`);
        } else {
          console.log(
            `Bar code with type ${type} and data ${data} has been scanned!`
          );
          const stringErrorScan =
            "Please scan a Match QR code from Gambist";
          setText(stringErrorScan);
        }
      }
    };
  
    const resetTextScanned = (isScanned) => {
      setScanned(isScanned);
      setText("Scan the QR code of a match to access its details page");
      setMatchScanned(undefined);
      setIsMatchScanned(false);
    };
  
    const goToMatchDetailsScanned = () => {
      props.navigation.navigate("Detail", { itemId: matchScanned});
    };

    useEffect(() => {
        askForCameraPermission();
      }, []);
  

    if (hasPermission === null) {
        return (
        <Block>
          <ScrollView
            showsVerticalScrollIndicator={false}>
          </ScrollView>
        </Block>
        );
      }
      if (hasPermission === false) {
        return (
          <Block style={styles.container}>
              <Block style={styles.containerscrollblock}>
                <Text style={styles.textContainer}>
                  Not allowed to access the camera
                </Text>
                <Button
                  style={styles.stylebutton}
                  onPress={() => askForCameraPermission()}
                >
                  ASK PERMISSION FOR CAMERA
                </Button>
              </Block>
          </Block>
        );
      }
    
      return (
        <Block style={styles.container}>
            <Block style={styles.containerscrollbarcode}>
              <BarCodeScanner
                onBarCodeScanned={({ type, data }) => {
                  scanned ? undefined : handleBarCodeScanned(type, data);
                }}
                style={{
                    width: 400,
                    height: 400,
                }}
              />
            </Block>
            <Block style={styles.containerscrollblock}>
              <Text style={styles.textContainer}>{text}</Text>
              {isMatchScanned && (
                <Button
                  style={styles.stylebutton}
                  onPress={goToMatchDetailsScanned}
                >
                  GO TO MATCH DETAILS
                </Button>
              )}
              {scanned && (
                <Button
                  style={styles.stylebutton}
                  onPress={() => resetTextScanned(false)}
                >
                  SCAN AGAIN
                </Button>
              )}
            </Block>
        </Block>
      );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  containerscroll: {
    flex: 1,
    alignItems: "center",
  },
  containerscrollblock: {
    flex: 1,
    alignItems: "center",
    marginTop: 30
  },
  textContainer: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#525F7F",
    textAlign: "center"
  },
  stylebutton: {
    backgroundColor: argonTheme.COLORS.DEFAULT,
    width: "80%",
    paddingLeft: 10,
    paddingRight: 10
  },
  containerscrollbarcode: {
    flex: 2,
    width: width,
    alignItems: "center",
    justifyContent: "center",
  },
  containerbutton: {
    flex: 2,
  },
});

export default Qrcode;
