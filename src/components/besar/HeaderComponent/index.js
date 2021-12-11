import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { colors, fonts, getData, responsiveHeight } from '../../../utils';
import { IconCari } from '../../../assets';
import { Distance, Button } from '../../kecil';
import { connect } from 'react-redux';
import { saveKeywordJersey } from '../../../actions/JerseyAction';
import { getListKeranjang } from '../../../actions/KeranjangAction';
import { IconFindActive } from '../../../assets'

class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
  }

  componentDidMount() {
    getData('user').then((res) => {
      if (res) {
        this.props.dispatch(getListKeranjang(res.uid));
      }
    });
  }

  selesaiCari = () => {
    const { page, navigation, dispatch } = this.props;
    const { search } = this.state;

    //jalankan action save keyword
    dispatch(saveKeywordJersey(search));



    //kembalikan state search itu ke string kosong
    this.setState({
      search: ''
    })

  }

  render() {
    const { search } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.information}>
          <TextInput
            placeholder="Type Keyword"
            style={styles.input}
            value={search}
            onChangeText={(search) => this.setState({ search })}
            onSubmitEditing={() => this.selesaiCari()}
          />
          <Distance width={10} />
        </View>
            <View style={styles.ActionButton}>
                <TouchableOpacity >
                    <View >
                      <IconFindActive/>
                    </View>
                </TouchableOpacity>
            </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  getListKeranjangResult: state.KeranjangReducer.getListKeranjangResult,
})

export default connect(mapStateToProps, null)(HeaderComponent)


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  information: {
    width: '80%',
  },
  container: {
    backgroundColor: 'white',
    padding: 17,
    marginHorizontal: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    marginTop: -windowHeight * 0.12,
    flexDirection: 'row'
  },
  wrapperHeader: {
    marginTop: 15,
    marginHorizontal: 30,
    flexDirection: 'row',
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingLeft: 10,
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    fontFamily: fonts.primary.regular,
  },
  ActionButton: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 7
  }
});
