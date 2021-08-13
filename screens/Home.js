import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card, VsCard } from '../components';
const { width } = Dimensions.get('screen');
import matches from '../constants/matches';

class Home extends React.Component {
  renderMatches = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.matches}>
        <Block>
          <VsCard navigation={this.props.navigation} seeMore />
          <VsCard navigation={this.props.navigation} seeMore />
          <VsCard navigation={this.props.navigation} seeMore />
          <VsCard navigation={this.props.navigation} seeMore />
        </Block>
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderMatches()}
      </Block>
    );
  }
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
