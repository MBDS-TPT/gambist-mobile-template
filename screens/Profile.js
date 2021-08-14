import React, {useState, useEffect} from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { UserService } from "../services/user/user.service";
import { BetService } from "../services/bet/bet.service";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
});

const Profile = ({navigation, route}) => {

    const [currentProfile, setCurrentProfile] = useState({
      firstName:'',
      lastName:'',
      bankBalance: 0,
      won:0, 
      lost:0,
      bets:[]
    });

    const getCurrentProfile = async () => {
      const userId = await AsyncStorage.getItem('userId');
      let user = null;
      if(userId){
        user = await UserService.getUserById(userId);
        stats = await BetService.getUserBetStat(userId);
        setCurrentProfile({...user, ...stats.data});
      }
    }

    useEffect(()=>{
      getCurrentProfile();
    },[]);

    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '25%' }}
            >
              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={{ uri: Images.ProfilePicture }}
                    style={styles.avatar}
                  />
                </Block>
                <Block style={styles.info}>
                  <Block
                    middle
                    row
                    space="evenly"
                    style={{ marginTop: 20, paddingBottom: 24 }}
                  >
                    <Button
                      small
                      style={{ backgroundColor: argonTheme.COLORS.INFO }}
                    >
                      UPGRADE
                    </Button>
                    <Button
                      small
                      style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
                    >
                      EDIT
                    </Button>
                  </Block>
                  <Block row space="between">
                    <Block middle>
                      <Text
                        bold
                        size={18}
                        color="#525F7F"
                        style={{ marginBottom: 4 }}
                      >
                        {currentProfile.bets.length}
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>Bets</Text>
                    </Block>
                    <Block middle>
                      <Text
                        bold
                        color="#525F7F"
                        size={18}
                        style={{ marginBottom: 4 }}
                      >
                        {currentProfile.won}
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>Wins</Text>
                    </Block>
                    <Block middle>
                      <Text
                        bold
                        color="#525F7F"
                        size={18}
                        style={{ marginBottom: 4 }}
                      >
                        {currentProfile.lost}
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>Loses</Text>
                    </Block>
                  </Block>
                </Block>
                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={28} color="#32325D">
                      {formatter.format(currentProfile.bankBalance)}
                    </Text>
                    <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                      {currentProfile.firstname} {currentProfile.lastname}
                    </Text>
                  </Block>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block
                    row
                    space="between"
                  >
                    <Text bold size={16} color="#525F7F" style={{marginTop: 12}}>
                      Recent Bets
                    </Text>
                    <Button
                      small
                      color="transparent"
                      textStyle={{ color: "#5E72E4", fontSize: 12, marginLeft: 24 }}
                      onPress={()=>{navigation.navigate('My Bets')}}
                    >
                      View all
                    </Button>
                  </Block>
                  <Block middle>
                    <Text
                      size={8}
                      color="#525F7F"
                      style={{ textAlign: "center" }}
                    >
                    For information on support measures, please visit our Responsible Gambling Help page.
                    </Text>
                    <Text
                      color="transparent"
                      style={{
                        color: "#233DD2",
                        fontWeight: "500",
                        fontSize: 8
                      }}
                    >
                       © 2021 Gambist. All rights reserved.
                    </Text>
                  </Block>
                  
                </Block>
              </Block>
            </ScrollView>
          </ImageBackground>
        </Block>
        
      </Block>
    );
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  }
});

export default Profile;
