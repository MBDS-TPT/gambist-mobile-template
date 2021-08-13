import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { DrawerItem as DrawerCustomItem , Icon} from '../components';
import { Images, argonTheme } from "../constants";


const CustomDrawerContent = ({ drawerPosition, navigation, profile, focused, state, ...rest }) =>{
  const screens = [
    "Home", 
    "Recent Matches",
    "My Bets",
    "Profile",
    "QR Code",
  ];
  
  return (
    <Block
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <Block flex={0.06} style={styles.header}>
           <Icon
            size={46}
            color={argonTheme.COLORS.ICON}
            name="workspaces-outline"
            family="MaterialIcons"
            style={styles.inputIcons}
          />
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
            <DrawerCustomItem title="Log out"   navigation={navigation} isLogout />
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
  },
  inputIcons: {
    height: 46
  }
});

export default CustomDrawerContent;
