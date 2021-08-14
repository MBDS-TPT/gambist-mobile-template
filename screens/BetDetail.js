import React, {useEffect, useState} from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme, Text } from 'galio-framework';

import { Card, VsCard, Select, Button, Input , Icon} from '../components';
import { argonTheme } from '../constants';
const { width } = Dimensions.get('screen');

import { BetService } from "../services/bet/bet.service";
import Moment from "moment";

function BetDetail({ route, navigation }) {

  const { bet } = route.params;
  const [betDetail, setBetDetail] = useState();
  const [betTotal, setBetTotal] = useState(0);

  const getBetDetails = async () => {
    try {
      setBetDetail(bet);
      let total = bet.betValue * bet.odds;
      setBetTotal(total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBetDetails();
  }, []);

  return (
    <Block flex center style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.detail}>
        <Block>
          <Text color={argonTheme.COLORS.PRIMARY} size={12} onPress={()=>navigation.goBack()}> {"< "}Back</Text>
          <Block flex style={styles.nameInfo}>
              <Text size={10} bold color="#525F7F" style={{ marginTop: 10 }}>
                Bet date: {betDetail && Moment(betDetail.match.betDate).format("DD-MM-YYYY HH:mm")}
              </Text>
              <Text size={10} bold color="#525F7F" style={{ marginTop: 10 }}>
                Match date: {betDetail && Moment(betDetail.match.matchDate).format("DD-MM-YYYY HH:mm")}
              </Text>
            </Block>
            {betDetail && 
            <VsCard matchpassed={betDetail.match} navigation={navigation}/>
            }
            <Block flex style={styles.odds}>
              <Text size={10} bold color="#525F7F" style={{ marginTop: 10 }}>
                Odds: 
              </Text>
            </Block>
            <Block flex style={styles.group} style={{marginTop: 20}}>
              <Block row space="between">
                <Block middle>
                  <Text
                    bold
                    size={20}
                    color={argonTheme.COLORS.ERROR}
                    style={{ marginBottom: 4 }}
                  >
                    {betDetail && betDetail.match.oddsA.toFixed(2)}
                  </Text>
                  <Text size={12} color={argonTheme.COLORS.ERROR}>{betDetail && betDetail.match.teamA.name}</Text>
                </Block>
                <Block middle>
                  <Text
                    bold
                    color={argonTheme.COLORS.DEFAULT}
                    size={18}
                    style={{ marginBottom: 4 }}
                  >
                    {betDetail && betDetail.match.oddsNul.toFixed(2)}
                  </Text>
                  <Text size={12} color={argonTheme.COLORS.DEFAULT}>Nul</Text>
                </Block>
                <Block middle>
                  <Text
                    bold
                    color={argonTheme.COLORS.PRIMARY}
                    size={20}
                    style={{ marginBottom: 4 }}
                  >
                    {betDetail && betDetail.match.oddsB.toFixed(2)}
                  </Text>
                  <Text size={12} color={argonTheme.COLORS.PRIMARY}>{betDetail && betDetail.match.teamB.name}</Text>
                </Block>
              </Block>
            </Block>
            <Block flex style={styles.odds}>
              <Text size={14} bold color="#525F7F" style={{ marginTop: 20 }}>
                Team chosen: {betDetail && betDetail.team ? betDetail.team.name : "Nul chosen" }
              </Text>
            </Block>
            <Block flex style={styles.odds}>
              <Text size={14} bold color="#525F7F" style={{ marginTop: 5 }}>
                Odds of your choice: {betDetail && betDetail.odds.toFixed(2)}
              </Text>
            </Block>
            <Block flex style={styles.odds}>
              <Text size={14} bold color="#525F7F" style={{ marginTop: 5 }}>
                Bet value: {betDetail && betDetail.betValue}
              </Text>
            </Block>
            <Block flex style={styles.odds}>
              <Text size={14} bold color="#525F7F" style={{ marginTop: 5 }}>
                Bet value: {betDetail && betTotal.toFixed(2)} €
              </Text>
            </Block>
        </Block>
      </ScrollView>
    </Block>
    )
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  detail: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  odds: {
    marginBottom: 10
  },
  group: {
    paddingTop: theme.SIZES.BASE * 2
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16
  },
  versus: {
      backgroundColor:theme.COLORS.FACEBOOK,
      fontSize: 30,
      position: 'absolute',
      backgroundColor: theme.COLORS.NEUTRAL,
      color: theme.COLORS.PLACEHOLDER,
      top: '50%',
      left: '50%',
      transform:[
        {translateX: -20},
        {translateY: -40}
      ],
      zIndex:2,
  },
  text: {
    textAlign:'right',
    marginBottom:20
  }
});

export default BetDetail;
