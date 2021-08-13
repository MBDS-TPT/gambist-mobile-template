import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme, Text } from 'galio-framework';

import { Card, VsCard, Select, Button, Input , Icon} from '../components';
import { argonTheme } from '../constants';
const { width } = Dimensions.get('screen');

class Detail extends React.Component {
  renderDetail = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.detail}>
        <Block>
          <Text color={argonTheme.COLORS.PRIMARY} size={8} onPress={()=>this.props.navigation.goBack()}> {"< "}Back</Text>
          <Block flex style={styles.nameInfo}>
              <Text size={10} bold color="#525F7F" style={{ marginTop: 10 }}>
                Match date: 28 July 2021 12:15
              </Text>
            </Block>
          <VsCard />
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
                    2.75
                  </Text>
                  <Text size={12} color={argonTheme.COLORS.ERROR}>Team A</Text>
                </Block>
                <Block middle>
                  <Text
                    bold
                    color={argonTheme.COLORS.DEFAULT}
                    size={18}
                    style={{ marginBottom: 4 }}
                  >
                    3.38
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
                    1.42
                  </Text>
                  <Text size={12} color={argonTheme.COLORS.PRIMARY}>Team B</Text>
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
                    options={["Team A", "Nul", "Team B"]}
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
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderDetail()}
      </Block>
    );
  }
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
});

export default Detail;
