import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Onboarding = (props) => {

    const { navigation } = props;

    const [animating, setAnimating] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setAnimating(false);
        //Check if user_id is set or not
        //If not then send for Authentication
        //else send to Home Screen
        AsyncStorage.getItem('userId').then((value) =>
          navigation.replace(
            value === null ? 'Auth' : 'App'
          ),
        );
      }, 2000);
    }, []);

    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
        <ImageBackground
            source={Images.Onboarding}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>
        <Block center>
          {/* <Image source={Images.LogoOnboarding} style={styles.logo} /> */}
          <ActivityIndicator
            animating={animating}
            color="#FFFFFF"
            size="large"
            style={styles.activityIndicator}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block style={styles.title}>
                <Block>
                  <Text color="white" size={40}>
                    Gambist
                  </Text>
                </Block>
                <Block>
                  <Text color="white" size={40}>
                    Mobile
                  </Text>
                </Block>
                <Block style={styles.subTitle}>
                  <Text color="white" size={16}>
                    Online bet platform now avalaible in app.
                  </Text>
                </Block>
              </Block>
          </Block>
        </Block>
      </Block>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  logo: {
    width: 200,
    height: 60,
    zIndex: 2,
    position: 'relative',
    marginTop: '-50%'
  },
  title: {
    marginTop:'-5%'
  },
  subTitle: {
    marginTop: 20
  },
  activityIndicator: {
    alignItems: 'center',
    height: 10,
  }
});

export default Onboarding;
