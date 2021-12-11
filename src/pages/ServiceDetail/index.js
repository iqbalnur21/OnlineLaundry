import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SplashBackground, logo } from '../../assets';
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
import { RFValue } from 'react-native-responsive-fontsize';

export default class ServiceDetail extends Component {

  render() {
    return (
      <View style={styles.page}>
        <Image source={logo} style={styles.Logo} />
        <View style={styles.container}>
          <View style={styles.liga}>
            <ButtonIcon title="Express" type="Service" />
          </View>
          <View style={styles.desc}>
            <Text style={styles.nama}>Per KG Service</Text>
            <Text style={styles.harga}>
              Price : Rp. 6000
            </Text>

            <View style={styles.garis} />
            <View style={styles.wrapperInput}>
              {/* <Input
                placeholder="Amount"
                width={responsiveWidth(166)}
                height={responsiveHeight(43)}
                fontSize={13}
              /> */}
              <Option
                label="Courier"
                width={responsiveWidth(166)}
                height={responsiveHeight(43)}
                fontSize={13}
              // datas={jersey.ukuran}
              />
              {/* <Option
                label="Weight"
                width={responsiveWidth(166)}
                height={responsiveHeight(43)}
                fontSize={13}
                // datas={jersey.ukuran}
              /> */}
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
              onPress={() => this.props.navigation.navigate('Checkout')}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Logo: {
    marginTop: 50,
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
