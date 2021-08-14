import React, {useEffect, useState} from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, VsCard } from '../components';
const { width } = Dimensions.get('screen');
import ReactDOM from "react-dom";

import { MatchService } from "../services/match/match.service";

function Home({navigation, route}) {
  const [matcheslist, setMatchesList] = useState([]);
  const [idCategory, setIdCategory] = useState([]);

  const getHomeMatches = async (categoryId) => {
    try {
      let matches = await MatchService.getUpcomingMatchByCategory(categoryId);
      setMatchesList(matches);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHomeMatches(route.params.tabId);
  }, [route.params.tabId]);
  

  return (
    <Block flex center style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.matches}>
        {matcheslist &&
          <Block>
            {matcheslist.map((match, index) => {
              return <VsCard key={index} seeMore matchpassed={match}/>
            })}
          </Block>
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
});

export default Home;
