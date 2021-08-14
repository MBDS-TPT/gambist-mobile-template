import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { argonTheme } from '../constants';
import matches from '../constants/matches';
import Card from './Card';

class BetVsCard extends React.Component {
  
  render() {
  const {seeMore, navigation} = this.props;

    return (
      <>
        <Block flex row>
            <Card
                flex
                borderless
                item={
                  this.props.betpassed.match.teamA
                }
                style={styles.card}
                imageStyle={styles.cardImageRadius}
                imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
            />
            <Text style={styles.versus}>VS</Text>
            <Card
                flex
                borderless
                item={
                  this.props.betpassed.match.teamB
                }
                style={styles.card}
                imageStyle={styles.cardImageRadius}
                imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
            />
        </Block>
        {seeMore && (
          <Block>
            <Text onPress={()=> {
              console.log(this.props.betpassed.id);
              navigation.navigate("BetDetail", { bet: this.props.betpassed});
              }} size={12} style={styles.text} color={argonTheme.COLORS.ACTIVE} bold>See more {'>>'} </Text>
          </Block>
        )}
      </>
    );
  }
}

BetVsCard.propTypes = {
  seeMore: PropTypes.bool,
}

const styles = StyleSheet.create({
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

export default (BetVsCard);