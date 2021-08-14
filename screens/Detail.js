import React, {useEffect, useState} from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme, Text } from 'galio-framework';

import { Card, VsCard, Select, Button, Input , Icon} from '../components';
import { argonTheme } from '../constants';
const { width } = Dimensions.get('screen');

import { MatchService } from "../services/match/match.service";
import Moment from "moment";

function Detail({ route, navigation }) {

  const { itemId } = route.params;
  const [matchDetail, setMatchDetail] = useState();

  const getMatchDetails = async () => {
    try {
      let matchDetail = await MatchService.getMatch(itemId);
      console.log(matchDetail);
      setMatchDetail(matchDetail);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMatchDetails();
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
                Match date: {matchDetail && Moment(matchDetail.matchDate).format("DD-MM-YYYY HH:mm")}
              </Text>
            </Block>

            {matchDetail && 
            <VsCard matchpassed={matchDetail} navigation={navigation}/>
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
                    {matchDetail && matchDetail.oddsA.toFixed(2)}
                  </Text>
                  <Text size={12} color={argonTheme.COLORS.ERROR}>{matchDetail && matchDetail.teamA.name}</Text>
                </Block>
                <Block middle>
                  <Text
                    bold
                    color={argonTheme.COLORS.DEFAULT}
                    size={18}
                    style={{ marginBottom: 4 }}
                  >
                    {matchDetail && matchDetail.oddsNul.toFixed(2)}
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
                    {matchDetail && matchDetail.oddsB.toFixed(2)}
                  </Text>
                  <Text size={12} color={argonTheme.COLORS.PRIMARY}>{matchDetail && matchDetail.teamB.name}</Text>
                </Block>
              </Block>
              <Block flex style={styles.odds}>
                <Text size={10} bold color="#525F7F" style={{ marginTop: 10 }}>
                  Place a bet: 
                </Text>
              </Block>
              <Block row space="around">
                <Block flex left style={{marginTop: 15}}>
                  <Select
                    color={argonTheme.COLORS.PRIMARY}
                    options={matchDetail ? [matchDetail.teamA.name, "Nul", matchDetail.teamB.name] : []}
                  />
                </Block>
                
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                  <Input right placeholder="0.00" type="decimal-pad" style={styles.bet} 
                                                                    iconContent={<Icon
                                                                    size={10}
                                                                    color={argonTheme.COLORS.ICON}
                                                                    name="euro"
                                                                    family="MaterialIcons"
                                                                    style={styles.inputIcons}
                                                                  />} />
                </Block>
            </Block>

            </Block>
            <Block center>
              <Button color="default" style={styles.button}>
                PLACE A BET
              </Button>
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

export default Detail;
