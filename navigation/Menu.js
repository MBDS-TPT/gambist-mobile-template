import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import {  Platform } from 'react-native';
import Images from "../constants/Images";
import { DrawerItem as DrawerCustomItem } from '../components';
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawerContent = ({ drawerPosition, navigation, profile, focused, state, ...rest }) =>{
  const screens = [
    "Home", 
    "Recent Matches",
    "My Bets",
    "Profile",
    "QR Code",
  ];

  
  
  const Disconnect =  async (navigation) =>  {
    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    if (asyncStorageKeys.length > 0) {
      if (Platform.OS === 'android') {
        await AsyncStorage.clear();
      }
      if (Platform.OS === 'ios') {
        await AsyncStorage.multiRemove(asyncStorageKeys);
      }
    }
    navigation.navigate('Login');
  };

  return (
    <Block
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <Block flex={0.06} style={styles.header}>
        {/* <Image styles={styles.logo} source={Images.Logo} /> */}
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
              return (
                <DrawerCustomItem
                  title={item}
                  key={index}
                  navigation={navigation}
                  focused={state.index === index ? true : false}
                />
              );
            })}
            <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
              <Block style={{ borderColor: "rgba(0,0,0,0.2)", width: '100%', borderWidth: StyleSheet.hairlineWidth }}/>
              <Text color="#8898AA" style={{ marginTop: 16, marginLeft: 8 }}>Account</Text>
            </Block>
            <DrawerCustomItem title="Detail"    navigation={navigation} />
            <DrawerCustomItem title="Log out"  onPress={Disconnect(navigation)}/>
        </ScrollView>
      </Block>
    </Block>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'center'
  }
});

export default CustomDrawerContent;
