import React, {Component} from 'react';
import {Alert, StyleSheet, View, Image} from 'react-native';
import {colors, getData, responsiveHeight} from '../../utils';
import {Input, Button} from '../../components';
import {connect} from 'react-redux';
import {changePassword} from '../../actions/ProfileAction';
import {SplashBackground, logo} from '../../assets';

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      newPassword: '',
      newPasswordConfirmation: '',
    };
  }

  onSubmit = () => {
    const {password, newPassword, newPasswordConfirmation} = this.state;

    if (newPassword !== newPasswordConfirmation) {
      Alert.alert(
        'Error',
        'New Password and Confirm Password Should be Same',
      );
    } else if (password && newPassword && newPasswordConfirmation) {
      //ambil data Email dari local storage
      getData('user').then((res) => {
        const parameter = {
          Email: res.Email,
          password: password,
          newPassword: newPassword,
        };

        this.props.dispatch(changePassword(parameter));
      });
    } else {
      Alert.alert(
        'Error',
        'Old Password, New Password and Confirm Password Should be Fill In',
      );
    }
  };

  componentDidUpdate(prevProps) {
    const {changePasswordResult} = this.props;

    if (
      changePasswordResult &&
      prevProps.changePasswordResult !== changePasswordResult
    ) {
      Alert.alert('Success', 'Change Password Success');
      this.props.navigation.replace('MainApp');
    }
  }

  render() {
    const {password, newPassword, newPasswordConfirmation} = this.state;

    const { changePasswordLoading } = this.props

    return (
      <View style={styles.pages}>
      <Image source ={logo} style = {styles.Logo} />
        <View>
          <Input
          placeholder="Old Password"
            secureTextEntry
            value={password}
            onChangeText={(password) => this.setState({password})}
          />
          <Input
          placeholder="New Password"
            secureTextEntry
            value={newPassword}
            onChangeText={(newPassword) => this.setState({newPassword})}
          />
          <Input
          placeholder="Confirm New Password"
            secureTextEntry
            value={newPasswordConfirmation}
            onChangeText={(newPasswordConfirmation) =>
              this.setState({newPasswordConfirmation})
            }
          />
        </View>

        <View style={styles.submit}>
          <Button
            title="Submit"
            type="textIcon"
            icon="submit"
            padding={responsiveHeight(15)}
            fontSize={18}
            onPress={() => this.onSubmit()}
            loading={changePasswordLoading}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  changePasswordLoading: state.ProfileReducer.changePasswordLoading,
  changePasswordResult: state.ProfileReducer.changePasswordResult,
  changePasswordError: state.ProfileReducer.changePasswordError,
});

export default connect(mapStateToProps, null)(ChangePassword);

const styles = StyleSheet.create({
  Logo: {
    width: 279,
    height: 177,
    alignSelf: 'center',
  },
  pages: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 30,
    paddingTop: 35,
    justifyContent: 'space-between'
  },
  submit: {
    marginVertical: 30,
  },
});
