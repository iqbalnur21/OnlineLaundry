import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts} from '../../../utils';

const AddressCard = ({profile, alamat, provinsi, kota, navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Address :</Text>
      <Text style={styles.alamat}>{profile.alamat} </Text>
      <Text style={styles.alamat}> </Text>
      {/* <Text style={styles.alamat}>Kota/Kab. {profile.kota}</Text>
      <Text style={styles.alamat}>Provinsi {profile.provinsi}</Text> */}
      <TouchableOpacity>
        <Text style={styles.ubahAlamat}>Change Address</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddressCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  title: {
    fontFamily: fonts.primary.bold,
    fontSize: 14,
    marginBottom: 5,
  },
  alamat: {
    fontFamily: fonts.primary.regular,
    fontSize: 14,
  },
  ubahAlamat: {
    fontFamily: fonts.primary.bold,
    fontSize: 14,
    color: colors.primary,
    textAlign: 'right'
  },
});
