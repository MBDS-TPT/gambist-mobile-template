import React, {useEffect, useState} from 'react';
import { StyleSheet, Dimensions, ScrollView, Alert, TextInput } from 'react-native';
import { Block, theme, Text } from 'galio-framework';

import { Card, VsCard, Select, Button , Icon} from '../components';
import { Input } from 'galio-framework';
import { argonTheme } from '../constants';
const { width } = Dimensions.get('screen');

import { MatchService } from "../services/match/match.service";
import { BetService } from "../services/bet/bet.service";
import Moment from "moment";

import AsyncStorage from "@react-native-async-storage/async-storage";

function Detail({ route, navigation }) {

  const { itemId } = route.params;
  const [matchDetail, setMatchDetail] = useState();
  const [loading, setLoading] = useState(false);

  const [valueBet, setValueBet] = useState("");
  const [winnerTeam, setWinnerTeam] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [oddChosed, setOddChosed] = useState();
  const [winnings, setWinnings] = useState();

  const getMatchDetails = async () => {
    try {
      let matchDetail = await MatchService.getMatch(itemId);
      console.log(matchDetail);
      setMatchDetail(matchDetail);
    } catch (error) {
      console.log(error);
    }
  };

  const getSelectValue = (index, value) => {
    try {
      const coteTeamA = matchDetail.oddsA?.toFixed(2);
      const coteTeamB = matchDetail.oddsB?.toFixed(2);
      const coteMatchNul = matchDetail.oddsNul?.toFixed(2);
      setWinnerTeam(value);
      if (value === "Team A") {
        setOddChosed(coteTeamA);
      } else if (value === "Team B") {
        setOddChosed(coteTeamB);
      } else {
        setOddChosed(coteMatchNul);
      }
      setErrorMessage(undefined);
      setWinnings(undefined);
      setValueBet("");
    } catch (error) {
      console.log(error);
    }
  };

  const convertValueBet = (e) => {
    console.log("Je suis bro");
    if (e.nativeEvent.text === "") {
      console.log("Je suis la bro");
      setValueBet("");
      setErrorMessage("Fill in the field Amount you bet");
    } else {
      console.log("Je suis la la bro");
      const valBetinteger = parseInt(e.nativeEvent.text);
      if (valBetinteger.toString() === "NaN") {
        console.log("Je suis la la la bro");
        setValueBet("");
        setErrorMessage("Fill in the field Amount you bet");
      } else {
        console.log("Je suis la la la la bro");
        const valWinning =
          valBetinteger * Number.parseFloat(oddChosed ? oddChosed : "0");
        setWinnings(valWinning.toFixed(2));
        setValueBet(valBetinteger.toString());
        setErrorMessage(undefined);
      }
    }
  };

  const makeBet = async () => {
    try {
      if (winnerTeam === "" || winnerTeam == null) {
        setErrorMessage("Please select a result for the match");
      } else if (valueBet === "") {
        setErrorMessage("Fill in the field Amount you bet");
      } else {
        setErrorMessage(undefined);
        const userId = await AsyncStorage.getItem("userId");
        const bet = {
          betDate: new Date(),
          betValue: Number.parseInt(valueBet),
          matchId: matchDetail.id,
          userId: userId,
        };
        if (winnerTeam === "Team A") {
          bet.teamId = matchDetail.teamA?.id;
          bet.odds = matchDetail.oddsA;
        } else if (winnerTeam === "Team B") {
          bet.teamId = matchDetail.teamB?.id;
          bet.odds = matchDetail.oddsB;
        }else{
          bet.odds = matchDetail.oddsNul;
        }
        setLoading(true);
        BetService.postBet(bet).then((res) => {
          if (res.result !== "KO") {
            setLoading(false);
            Alert.alert(
              "Bet registered",
              "Your bet has been saved! You can see it by refreshing your bets page (drag the screen down)",
              [{ text: "OK", onPress: () => navigation.navigate("BetDetail", { bet: res.data}) }]
            );
          } else {
            setErrorMessage("Error occurred:" + res.message);
          }
        });
        console.log(bet);
        console.log(valueBet);
        console.log(winnerTeam);
        console.log(Number.isInteger(valueBet));
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage("Error: " + error);
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
                    options={matchDetail ? ["Team A", "Nul", "Team B"] : []}
                    onSelect={getSelectValue}
                  />
                </Block>
                
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                  <Input
                    style={styles.mise}
                    placeholder="0.00"
                    right
                    type="decimal-pad"
                    keyboardType="numeric"
                    onSubmitEditing={(e) => convertValueBet(e)}
                    defaultValue={valueBet}
                    placeholderTextColor={argonTheme.COLORS.MUTED}
                    // icon={
                    //   <Icon
                    //   size={10}
                    //   color={argonTheme.COLORS.ICON}
                    //   name="euro"
                    //   family="MaterialIcons"
                    //   style={styles.inputIcons}
                    // />}
                    icon="euro"
                    family="MaterialIcons"
                  />
                </Block>
            </Block>

            </Block>
            <Block center>
              {winnings != null && winnings != "" && (
                <Text size={12} color={argonTheme.COLORS.PRIMARY}>(Your winnings will be: {winnings})</Text>
              )}
              {errorMessage && <Text size={12} color={argonTheme.COLORS.ERROR}>{errorMessage}</Text>}
              <Button color="default" style={styles.button} loading={loading} onPress={() => makeBet()}>
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
  },
  mise: {
    backgroundColor:argonTheme.COLORS.HEADER,
    borderRadius: 4,
    borderColor: argonTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: '#FFFFFF'
  }
});

export default Detail;
