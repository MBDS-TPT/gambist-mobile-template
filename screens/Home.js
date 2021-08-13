import React, {useEffect, useState} from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card, VsCard } from '../components';
const { width } = Dimensions.get('screen');

import { MatchService } from "../services/match/match.service";

function Home(props) {
  const [matcheslist, setMatchesList] = useState([]);

  getAllMatches = async () => {
    try {
      let matches = await MatchService.getAllMatch();
      console.log(matches.data);
      setMatchesList(matches.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMatches();
  }, []);
  return (
    <Block flex center style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.matches}>
        <Block>
          {matcheslist.map(match => {
            return <VsCard seeMore matchpassed={match} />
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

export default Home;
