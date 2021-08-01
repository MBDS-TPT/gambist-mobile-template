import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { argonTheme } from '../constants';
import matches from '../constants/matches';
import Card from './Card';

class VsCard extends React.Component {
  render() {
    return (
        <Block flex row>
            <Card
                flex
                borderless
                item={
                    matches[0]
                }
                style={styles.card}
                location="Los Angeles, CA"
                imageStyle={styles.cardImageRadius}
                imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
            />
            <Text style={styles.versus}>νѕ</Text>
            <Card
                flex
                borderless
                item={
                    matches[1]
                }
                style={styles.card}
                location="Los Angeles, CA"
                imageStyle={styles.cardImageRadius}
                imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
            />
            {/* <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} /> */}
            {/* <Card item={articles[2]} /> */}
        </Block>
    );
  }
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
      fontSize: 40,
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
  }
});

export default (VsCard);