import React, {useEffect, useState} from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card, VsCard } from '../components';
const { width } = Dimensions.get('screen');
import matches from '../constants/matches';

import { MatchService } from "../services/match/match.service";

function RecentMatches({navigation, route}) {
  const [matcheslist, setMatchesList] = useState([]);

  const getRecentMatches = async (categoryId) => {
    try {
      let matches = await MatchService.getAllMatchByCategory(categoryId);
      setMatchesList(matches.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecentMatches(route.params.tabId);
  }, [route.params.tabId]);

  return (
    <Block flex center style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.matches}>
        <Block>
          {matcheslist.map((match, index) => {
            return <VsCard key={index} seeMore matchpassed={match}/>
          })}
        </Block>
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  recents: {
    width: width,    
  },
  matches: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default RecentMatches;
