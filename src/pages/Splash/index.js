import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Illustration, Logo} from '../../assets';
import { colors } from '../../utils';

export default class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.replace('MainApp')
    }, 3000)
  }

  render() {
    return (
      <View style={styles.pages}>
        <View style={styles.Illustration}>
          <Illustration />
        </View>
        <Logo />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  Illustration: {
    backgroundColor: colors.background,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
