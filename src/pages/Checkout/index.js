import React, {Component} from 'react';
import {Text, StyleSheet, View, Alert} from 'react-native';
import {connect} from 'react-redux';
import {CardAlamat, Distance, Option, Button} from '../../components';
import {
  colors,
  fonts,
  getData,
  numberWithCommas,
  responsiveHeight,
} from '../../utils';
import {getKotaDetail, postOngkir} from '../../actions/RajaOngkirAction';
import {couriers} from '../../data';
import { snapTransactions } from '../../actions/PaymentActions'

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: false,
      ekspedisi: couriers,
      ekspedisiSelected: false,
      ongkir: 6000,
      estimasi: '',
      totalHarga: this.props.route.params.totalHarga*this.props.route.params.totalBerat,
      totalBerat: this.props.route.params.totalBerat,
      kota: '',
      provinsi: '',
      Address: '',
      date: new Date().getTime()
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    getData('user').then((res) => {
      const data = res;

      if (data) {
        this.setState({
          profile: data,
          Address: data.Address,
        });

        this.props.dispatch(getKotaDetail(data.kota));
      } else {
        this.props.navigation.replace('Login');
      }
    });
  };

  componentDidUpdate(prevProps) {
    const {getKotaDetailResult, ongkirResult, snapTransactionsResult} = this.props;

    if (
      getKotaDetailResult &&
      prevProps.getKotaDetailResult !== getKotaDetailResult
    ) {
      this.setState({
        provinsi: getKotaDetailResult.province,
        kota: getKotaDetailResult.type + ' ' + getKotaDetailResult.city_name,
      });
    }

    if(ongkirResult && prevProps.ongkirResult !== ongkirResult) {
      this.setState({
        ongkir: ongkirResult.cost[0].value,
        estimasi: ongkirResult.cost[0].etd
      })
    }

    if(snapTransactionsResult && prevProps.snapTransactionsResult !== snapTransactionsResult) {
      
      const params = {
        url: snapTransactionsResult.redirect_url,
        ongkir: this.state.ongkir,
        estimasi: this.state.estimasi,
        order_id: "TEST-"+this.state.date+"-"+this.state.profile.uid
      }

      this.props.navigation.navigate('Midtrans', params);
      
    }
  }

  ubahEkspedisi = (ekspedisiSelected) => {
    if(ekspedisiSelected) {
      this.setState({
        ekspedisiSelected: ekspedisiSelected
      })

      this.props.dispatch(postOngkir(this.state, ekspedisiSelected))
    }
  };

  Bayar = () => {

    const { totalHarga, ongkir, profile, date } = this.state

    const data = {
      transaction_details: {
        order_id: "TEST-"+date+"-"+profile.uid,
        gross_amount: parseInt(totalHarga+ongkir)
      }, 
      credit_card: {
        secure: true
      },
      customer_details: {
        first_name: profile.Name,
        Email: profile.Email,
        PhoneNum: profile.PhoneNum
      }
    }

    if(!ongkir == 0) {

      this.props.dispatch(snapTransactions(data))

    }else {
      Alert.alert('Error', "Please Choose the Courier First")
    }

  }

  render() {
    // console.log("test", this.props.route.params.totalHarga)
    const {
      ekspedisi,
      totalBerat,
      totalHarga,
      Address,
      kota,
      provinsi,
      ekspedisiSelected,
      ongkir,
      estimasi
    } = this.state;
    const {navigation, snapTransactionsLoading} = this.props;
    return (
      <View style={styles.pages}>
        <View style={styles.isi}>
          <Text style={styles.textBold}>This is Your Address ?</Text>
          <CardAlamat
            Address={Address}
            provinsi={provinsi}
            kota={kota}
            navigation={navigation}
          />

          <View style={styles.totalHarga}>
            <Text style={styles.textBold}>Total Price :</Text>
            <Text style={styles.textBold}>
              Rp. {numberWithCommas(totalHarga)}
            </Text>
          </View>

          {/* <Option
            label="Pilih Ekspedisi"
            datas={ekspedisi}
            selectedValue={ekspedisiSelected}
            onValueChange={(ekspedisiSelected) =>
              this.ubahEkspedisi(ekspedisiSelected)
            }
          /> */}
          <Distance height={10} />

          <Text style={styles.textBold}>Shipping Cost :</Text>

          <View style={styles.ongkir}>
            <Text style={styles.text}>Weight : {totalBerat} kg</Text>
            <Text style={styles.textBold}>Rp. {numberWithCommas(ongkir)}</Text>
          </View>

          <View style={styles.ongkir}>
            <Text style={styles.text}>Estimation Time</Text>
            <Text style={styles.textBold}>{estimasi} Day(s)</Text>
          </View>
        </View>

        <View style={styles.footer}>
          {/* Total Harga  */}
          <View style={styles.totalHarga}>
            <Text style={styles.textBold}>Total Price :</Text>
            <Text style={styles.textBold}>
              Rp. {numberWithCommas(totalHarga + ongkir)}
            </Text>
          </View>

          {/* Button  */}
          <Button
            title="Pay"
            type="textIcon"
            fontSize={18}
            padding={responsiveHeight(15)}
            icon="keranjang-putih"
            onPress={() => this.Bayar()}
            loading={snapTransactionsLoading}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  getKotaDetailLoading: state.RajaOngkirReducer.getKotaDetailLoading,
  getKotaDetailResult: state.RajaOngkirReducer.getKotaDetailResult,
  getKotaDetailError: state.RajaOngkirReducer.getKotaDetailError,

  ongkirResult: state.RajaOngkirReducer.ongkirResult,

  snapTransactionsResult: state.PaymentReducer.snapTransactionsResult,
  snapTransactionsLoading: state.PaymentReducer.snapTransactionsLoading
});

export default connect(mapStateToProps, null)(Checkout);

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 30,
    justifyContent: 'space-between',
  },
  isi: {
    paddingHorizontal: 30,
  },
  textBold: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
  },
  totalHarga: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  ongkir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    paddingHorizontal: 30,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 11,
    paddingBottom: 30,
  },
});
