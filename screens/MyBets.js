import React, {useEffect, useState} from 'react';
import { StyleSheet, Dimensions, ScrollView, RefreshControl } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card, VsCard, BetVsCard } from '../components';
const { width } = Dimensions.get('screen');
import matches from '../constants/matches';

import { BetService } from "../services/bet/bet.service";

function MyBets(props) {
  const [betslist, setBetsList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    try {
      setRefreshing(true);
      BetService.getUserBets()
        .then((data) => {
          setBetsList(data);
          setRefreshing(false);
        })
        .catch((error) => alert(error));
    } catch (error) {
      alert(error);
    }
  }, []);

  const getAllUserBets = async () => {
    try {
      let bets = await BetService.getUserBets();
      setBetsList(bets);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUserBets();
  }, []);
  return (
    <Block flex center style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.matches}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Block>
          {betslist.map(bet => {
            return <BetVsCard seeMore betpassed={bet} navigation={props.navigation}/>
          })}
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
});

export default MyBets;
