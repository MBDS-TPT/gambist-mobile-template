import React, {useEffect, useState} from 'react';
import { StyleSheet, Dimensions, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card, VsCard } from '../components';
const { width } = Dimensions.get('screen');

import { MatchService } from "../services/match/match.service";
import { BarCodeScanner } from "expo-barcode-scanner";

function Qrcode(props) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState(
      "Aucun QR code scanné pour le moment. Scannez le QR code d'un match pour accéder à sa page détail"
    );
    const [matchScanned, setMatchScanned] = useState();
  
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
          setText(
            "Le détail du match est chargé. Toucher le bouton pour scanner un nouveau match."
          );
          console.log(
            `Bar code with type ${type} and data ${data} has been scanned!`
          );
          console.log(`Un match est scanne!`);
          MatchService.getMatch(idMatch)
            .then((data) => {
              console.log(data);
              setMatchScanned(data);
            })
            .catch((error) => {
              setText("Une erreur est survenue: " + error);
            });
        } else {
          console.log(
            `Bar code with type ${type} and data ${data} has been scanned!`
          );
          const stringErrorScan =
            "Veuillez scanner un QR Code de Match provenant de Gambist";
          setText(stringErrorScan);
        }
      }
    };
  
    const resetTextScanned = (isScanned) => {
      setScanned(isScanned);
      setText("Scannez le QR code d'un match pour accéder à sa page détail");
      setMatchScanned(undefined);
    };
  
    const goToMatchDetailsScanned = () => {
      alert("navigation à faire");
    };

    useEffect(() => {
        askForCameraPermission();
      }, []);
  

    if (hasPermission === null) {
        return (
            <Block flex center style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.matches}>
        <Block>
        <Block style={styles.bodywithoutQr}>
              <Text>Demande de permission</Text>
            </Block>
        </Block>
      </ScrollView>
    </Block>
        );
      }
      if (hasPermission === false) {
        return (
            <Block flex center style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.matches}>
        <Block>
        <Text>Permission non accordée</Text>
              <TouchableOpacity
                onPress={() => askForCameraPermission()}
                style={styles.button}
              >
                <Block>
                  <Text>Demander la permission pour la caméra</Text>
                </Block>
              </TouchableOpacity>
        </Block>
      </ScrollView>
    </Block>
        );
      }
    
      return (
        <Block flex center style={styles.home}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.matches}>
          <Block>
          <Block>
            <BarCodeScanner
              onBarCodeScanned={({ type, data }) => {
                scanned ? undefined : handleBarCodeScanned(type, data);
              }}
              style={styles.qrcodestyle}
            />
          </Block>
          <Block>
            <Text style={styles.textScanned}>{text}</Text>
            {matchScanned && (
              <TouchableOpacity
                onPress={goToMatchDetailsScanned}
                style={styles.button}
              >
                <Block>
                  <Text>Accéder au détail du match</Text>
                </Block>
              </TouchableOpacity>
            )}
            {scanned && (
              <TouchableOpacity
                onPress={() => resetTextScanned(false)}
                style={styles.button}
              >
                <Block>
                  <Text>Toucher pour scanner une nouvelle fois</Text>
                </Block>
              </TouchableOpacity>
            )}
          </Block>
          </Block>
        </ScrollView>
      </Block>
      );  
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  matches: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  bodywithoutQr: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: width,
    overflow: "hidden",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    height: 50,
    width: "100%",
    justifyContent: "center",
    borderRadius: 50,
    margin: 5,
  },
  qrcodestyle: {
    height: 800,
    width: 800,
  },
  textScanned: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
  textTitle: {
    fontSize: 25,
    textAlign: "center",
  },
  maintextTitle: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Qrcode;
