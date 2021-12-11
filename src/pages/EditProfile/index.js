import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, Image, Alert} from 'react-native';
import {
  colors,
  fonts,
  getData,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import {Input, Option, Button} from '../../components';
import {connect} from 'react-redux';
import {getKotaList, getProvinsiList} from '../../actions/RajaOngkirAction';
import {DefaultImage} from '../../assets';
import {launchImageLibrary} from 'react-native-image-picker';
import { updateProfile } from '../../actions/ProfileAction'

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      Name: '',
      Email: '',
      PhoneNum: '',
      Address: '',
      avatar: false,
      avatarForDB: '',
      avatarLama: '',
      updateAvatar: false,
    };
  }

  componentDidMount() {
    this.getUserData();
    this.props.dispatch(getProvinsiList());
  }

  componentDidUpdate(prevProps) {
    const { updateProfileResult } = this.props

    if(updateProfileResult && prevProps.updateProfileResult !== updateProfileResult) {
      Alert.alert("Success", "Update Profile Success");
      this.props.navigation.replace("MainApp")
    }

  }

  getUserData = () => {
    getData('user').then((res) => {
      const data = res;
      this.setState({
        uid: data.uid,
        Name: data.Name,
        Email: data.Email,
        PhoneNum: data.PhoneNum,
        Address: data.Address,
        avatar: data.avatar,
        avatarLama: data.avatar
      });

    });
  };

  getImage = () => {
    launchImageLibrary(
      {quality: 1, maxWidth: 500, maxHeight: 500, includeBase64: true, selectionLimit: 1, cameraType: 'front'},
      (response) => {
        if (response.didCancel || response.errorCode || response.errorMessage) {
          Alert.alert('Error', 'You Need to Choose a Photo');
        } else {
          const source = response.assets[0].uri;
          const fileString = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;

          this.setState({
            avatar: source,
            avatarForDB: fileString,
            updateAvatar: true
          });
        }
      },
    );
  };

  onSubmit = () => {
    const {
      Name,
      Address,
      PhoneNum,
    } = this.state;
    if(Name && PhoneNum && Address ) {
      //dispatch update
      this.props.dispatch(updateProfile(this.state))

    }else {
      Alert.alert("Error", "Please Fill In the Name, Phone Number, and Address")
    }
  }

  render() {
    const {
      Name,
      Email,
      Address,
      PhoneNum,
      avatar,
    } = this.state;

    const {updateProfileLoading} = this.props;

    return (
      <View style={styles.pages}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            placeholder="Name"
            value={Name}
            onChangeText={(Name) => this.setState({Name})}
          />
          <Input label="Email" value={Email} disabled />
          <Input
            placeholder="No. Handphone"
            value={PhoneNum}
            onChangeText={(PhoneNum) => this.setState({PhoneNum})}
            keyboardType="number-pad"
          />
          <Input
            placeholder="Address"
            value={Address}
            onChangeText={(Address) => this.setState({Address})}
            textarea
          />

          <View style={styles.inputFoto}>
            <Text style={styles.label}>Profile Picture :</Text>

            <View style={styles.wrapperUpload}>
              <Image
                source={
                  avatar
                    ? {uri: avatar}
                    : DefaultImage
                }
                style={styles.foto}
              />

              <View style={styles.ButtonChangePhoto}>
                <Button
                  title="Change Photo"
                  type="text"
                  padding={7}
                  onPress={() => this.getImage()}
                />
              </View>
            </View>
          </View>

          <View style={styles.submit}>
            <Button
              loading={updateProfileLoading}
              title="Submit"
              type="textIcon"
              icon="submit"
              padding={responsiveHeight(15)}
              fontSize={18}
              onPress={() => this.onSubmit()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  getProvinsiResult: state.RajaOngkirReducer.getProvinsiResult,
  getKotaResult: state.RajaOngkirReducer.getKotaResult,

  updateProfileLoading: state.ProfileReducer.updateProfileLoading,
  updateProfileResult: state.ProfileReducer.updateProfileResult,
  updateProfileError: state.ProfileReducer.updateProfileError,
});

export default connect(mapStateToProps, null)(EditProfile);

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  inputFoto: {
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
  },
  foto: {
    width: responsiveWidth(150),
    height: responsiveWidth(150),
    borderRadius: 40,
  },
  wrapperUpload: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  ButtonChangePhoto: {
    marginLeft: 20,
    flex: 1,
  },
  submit: {
    marginVertical: 30,
  },
});
