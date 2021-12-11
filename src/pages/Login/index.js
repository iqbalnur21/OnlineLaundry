import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import {SplashBackground, logo} from '../../assets';
import { Input, Distance, Button } from '../../components';
import { colors, fonts, responsiveHeight } from '../../utils';
import { loginUser } from '../../actions/AuthAction';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Email: '',
      Password: '',
    };
  }

  login = () => {
    const { Email, Password } = this.state;

    if (Email && Password) {
      //action
      this.props.dispatch(loginUser(Email, Password));
    } else {
      Alert.alert('Error', 'Please Fill In the Email & Password');
    }
  };

  componentDidUpdate(prevProps) {
    const { loginResult } = this.props;

    if (loginResult && prevProps.loginResult !== loginResult) {
      this.props.navigation.replace('MainApp');
    }
  }

  render() {
    const { Email, Password } = this.state;
    const { loginLoading } = this.props;

    return (
      <ImageBackground source={SplashBackground} style={styles.background} >
        <Image source={logo} style={styles.Logo} />
        <View style={styles.cardLogin}>
          <Input
            placeholder="Email"
            value={Email}
            onChangeText={(Email) => this.setState({ Email })}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            value={Password}
            onChangeText={(Password) => this.setState({ Password })}
          />
          <Distance height={25} />
          <Button
            title="Login"
            type="text"
            padding={12}
            fontSize={18}
            loading={loginLoading}
            onPress={() => this.login()}
          />
        </View>

        <View style={styles.register}>
          <Text
            style={styles.textBlue}
            onPress={() => this.props.navigation.navigate('Register1')}>
            Dont Have an Account ?</Text>
          <Text
            style={styles.textBlue}
            onPress={() => this.props.navigation.navigate('Register1')}>
            Click to Register
          </Text>
        </View>
      </ImageBackground >
    );
  }
}

const mapStateToProps = (state) => ({
  loginLoading: state.AuthReducer.loginLoading,
  loginResult: state.AuthReducer.loginResult,
  loginError: state.AuthReducer.loginError,
});

export default connect(mapStateToProps, null)(Login);

const styles = StyleSheet.create({
  register: {
      alignItems: 'center',
      marginTop: 10
  },
  cardLogin: {
    marginHorizontal: 10,
    padding: 30,
    borderRadius: 10,
    marginTop: 10
  },
  background: {
    flex: 1,
    justifyContent: 'center'
  },
  Logo: {
    width: 279,
    height: 177,
    alignSelf: 'center'
  },
  textBlue: {
      fontSize: 18,
      fontFamily: fonts.primary.bold,
      color: colors.grey
  }
})