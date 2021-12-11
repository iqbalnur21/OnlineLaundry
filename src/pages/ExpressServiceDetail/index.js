import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {SplashBackground, logo} from '../../assets';
import {
  colors,
  fonts,
  numberWithCommas,
  responsiveHeight,
  heightMobileUI,
  responsiveWidth,
} from '../../utils';
import {
  CardLiga,
  Input,
  Distance,
  JerseySlider,
  Option,
  Button,
  ButtonIcon
} from '../../components';
import {RFValue} from 'react-native-responsive-fontsize';

export default class ExpressServiceDetail extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      Price: 8000,
      Weight: '',
      uid: '',
    };
  }
  masukKeranjang = () => {
    const {Weight, Price} = this.state;
    getData('user').then((res) => {
      if(res) {

        //ambil user uid simpan di state
        this.setState({
          uid: res.uid
        })

        //validasi form
        if(Weight && Price) {

          //dispatch ke action masukKeranjang
          this.props.dispatch(masukKeranjang(this.state));

        }else {
          Alert.alert('Error', 'Weight Should be Fill In');
        }


      }else {
        Alert.alert('Info', 'Please Login First');
        this.props.navigation.replace('Login')
      }
    })
  }
  render() {
    const {Weight, Price} = this.state;
    return (
      <View style={styles.page}>
        <View style={styles.button}>
          <Button
            icon="arrow-left"
            padding={7}
            onPress={() => this.props.navigation.navigate('MainApp')}
          />
        </View>
      <Image source ={logo} style = {styles.Logo} />
        {/* <JerseySlider images={images} /> */}
        <View style={styles.container}>
          <View style={styles.liga}>
          <ButtonIcon title="Express" type="Service" />
          </View>
          <View style={styles.desc}>
            <Text style={styles.nama}>Express Service</Text>
            <Text style={styles.harga}>
              Price : Rp. {Price}
            </Text>

            <View style={styles.garis} />
            <View style={styles.wrapperInput}>
              <Input
                placeholder="Weight (Max. 8Kg)"
                width={responsiveWidth(166)}
                height={responsiveHeight(50)}
                fontSize={13}
                value={Weight}
                onChangeText={(Weight) => this.setState({Weight})}
                keyboardType="number-pad"
              />
            </View>
            <Input
              label="Keterangan"
              textarea
              fontSize={13}
              placeholder="Description"
            />
            <Distance height={15} />
            <Button 
              title="Check Out"
              type="textIcon"
              icon="keranjang-putih"
              padding={responsiveHeight(17)}
              fontSize={18}
              onPress={() =>
                this.props.navigation.navigate('Checkout', {
                  totalHarga: Price,
                  totalBerat: Weight,
                })
              }
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Logo: {
    marginTop:50,
    width: 279,
    height: 177,
    alignSelf: 'center',
  },
  page: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    height: responsiveHeight(465),
    width: '100%',
    backgroundColor: colors.white,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  button: {
    position: 'absolute',
    marginTop: 15,
    marginLeft: 10,
    zIndex: 1,
  },
  desc: {
    marginHorizontal: 30,
  },
  nama: {
    fontSize: RFValue(24, heightMobileUI),
    fontFamily: fonts.primary.bold,
    textTransform: 'capitalize',
  },
  harga: {
    fontSize: RFValue(24, heightMobileUI),
    fontFamily: fonts.primary.light,
  },
  liga: {
    alignItems: 'flex-end',
    marginRight: 30,
    marginTop: -30,
  },
  garis: {
    borderWidth: 0.5,
    marginVertical: 5,
  },
  wrapperJenisBerat: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  jenisBerat: {
    fontSize: 13,
    fontFamily: fonts.primary.regular,
    marginRight: 30,
  },
  wrapperInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
