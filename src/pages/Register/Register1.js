import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
  Image
} from 'react-native';
import { colors, fonts, responsiveHeight, responsiveWidth } from '../../utils';
import { SplashBackground, logo } from '../../assets';
import { Input, Distance, Button } from '../../components';
import { registerUser } from '../../actions/AuthAction'
import { connect } from 'react-redux';

class Register1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Name: '',
      Email: '',
      PhoneNum: '',
      Password: '',
      Address: '',
    };
  }
  componentDidUpdate() {
    const { registerResult } = this.props

    if(registerResult !== registerResult) {
      this.props.navigation.replace("MainApp")
    }

  }

  onContinue = () => {
    const { Name, Email, PhoneNum, Password, Address } = this.state;
    if (Name && Email && PhoneNum && Password && Address) {
      const data = {
        Name: Name,
        Email: Email,
        PhoneNum: PhoneNum,
        Address: Address,
        status: 'user'
      }

      this.props.dispatch(registerUser(data, Password));

    } else {
      Alert.alert("Error", "Please Fill In the Name, Email, Phone Number, and Password")
    }
  }

  render() {
    const { Name, Email, PhoneNum, Password, Address } = this.state;
    const { registerLoading } = this.props;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.page}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.btnBack}>
              <Button
                icon="arrow-left"
                onPress={() => this.props.navigation.goBack()}
              />
            </View>
            <View style={styles.Illustration}>
              <Image source={logo} style={styles.Logo} />
              <Distance height={5} />
            </View>

            <View style={styles.card}>
              <Input
                placeholder="Name"
                value={Name}
                onChangeText={(Name) => this.setState({ Name })}
              />
              <Input
                placeholder="Email"
                value={Email}
                onChangeText={(Email) => this.setState({ Email })}
              />
              <Input
                placeholder="Phone Number"
                keyboardType="number-pad"
                value={PhoneNum}
                onChangeText={(PhoneNum) => this.setState({ PhoneNum })}
              />
              <Input
                placeholder="Password"
                secureTextEntry
                value={Password}
                onChangeText={(Password) => this.setState({ Password })}
              />
              <Input
                placeholder="Address"
                type="Address"
                textarea
                onChangeText={(Address) => this.setState({ Address })}
                value={Address}
              />
              <Distance height={25} />
              <Button
                title="Continue"
                type="textIcon"
                icon="submit"
                padding={10}
                fontSize={18}
                onPress={() => this.onContinue()}
                loading={registerLoading}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => ({
  registerLoading: state.AuthReducer.registerLoading,
  registerResult: state.AuthReducer.registerResult,
  registerError: state.AuthReducer.registerError,
});

export default connect(mapStateToProps, null)(Register1);

const styles = StyleSheet.create({
  Logo: {
    width: 279,
    height: 177,
    alignSelf: 'center'
  },
  background: {
    flex: 1,
    justifyContent: 'center'
  },
  page: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 20
  },
  Illustration: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'TitilliumWeb-Regular',
    color: colors.primary,
    alignContent: 'center'
  },
  card: {
    marginHorizontal: 10,
    paddingHorizontal: 30,
    paddingBottom: 20,
    paddingTop: 5,
    borderRadius: 10,
    marginBottom: 10
  },
  btnBack: {
    marginTop: 15,
    marginLeft: 10,
    position: 'absolute',
  },
});
