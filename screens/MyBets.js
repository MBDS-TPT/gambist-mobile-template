import React, {useEffect, useState} from 'react';
import { StyleSheet, Dimensions, ScrollView, RefreshControl } from 'react-native';
import { Block, theme } from 'galio-framework';
import {ActivityIndicator} from 'react-native';

import { Card, VsCard } from '../components';
const { width } = Dimensions.get('screen');
import matches from '../constants/matches';

import { BetService } from "../services/bet/bet.service";

function MyBets({navigation, route}) {
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

  const getAllUserBets = async (categoryId) => {
    try {
      let bets = await BetService.getUserBetsByCategory(categoryId);

      setBetsList(bets);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUserBets(route.params.tabId);
  }, [route.params.tabId]);

  return (
    <Block flex center style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.matches}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          {
            betslist ? (
            <Block>
              {betslist.map(bet => {
                return <VsCard seeMore matchpassed={bet.match}/>
              })}
            </Block>)
          :(
            <ActivityIndicator
              animating={true}
              color="#FFFFFF"
              size="large"
              style={styles.activityIndicator}
            />
          )
        }
        
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
  activityIndicator: {
    alignItems: 'center',
    height: 10,
  }
});

export default MyBets;
