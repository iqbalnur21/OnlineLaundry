import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import { Header } from '../../assets'
import { HeaderComponent, Distance, ListHistory, ActiveOrder } from '../../components'
import { dummyMenu } from '../../data'
import { getData, fonts, colors } from '../../utils'
import {connect} from 'react-redux';
import {getListJersey} from '../../actions/JerseyAction';
import {getListLiga} from '../../actions/LigaAction';
import {getListHistory} from '../../actions/HistoryAction';
import {CardHistory} from '../../components';

class Find extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profile: false,
      menus: dummyMenu
    }
  }
  componentDidMount() {
    getData('user').then((res) => {
      const data = res;

      if (!data) {
        this.props.navigation.replace('Login');
      } else {
        this.props.dispatch(getListHistory(data.uid));
      }
    });
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      const { idLiga, keyword } = this.props;
      this.props.dispatch(getListLiga());
      this.props.dispatch(getListJersey(idLiga, keyword));
      this.getUserData();
    });
  }
  getUserData = () => {
    getData('user').then(res => {
      const data = res

      if (data) {
        this.setState({
          profile: data
        })
      } else {
        this.props.navigation.replace('Login')
      }

    })
  }
  componentWillUnmount() {
    this._unsubscribe();
  }

  componentDidUpdate(prevProps) {
    const {idLiga, keyword} = this.props;

    if (idLiga && prevProps.idLiga !== idLiga) {
      this.props.dispatch(getListJersey(idLiga, keyword));
    }

    if (keyword && prevProps.keyword !== keyword) {
      this.props.dispatch(getListJersey(idLiga, keyword));
    }
  }
  render() {
    const { navigation, namaLiga, keyword } = this.props;
    const { profile, menus } = this.state
    return (
      <View style={styles.page}>
        <ImageBackground source={Header} style={styles.header}>
          <View style={styles.hello}>
            <Text style={styles.welcome}>Welcome, </Text>
            <Text style={styles.username}>{profile.Name}</Text>
          </View>
        </ImageBackground>
        <HeaderComponent />
          <Distance height={35} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>

          <View style={styles.pilihJersey}>
            {keyword ? (
              <Text style={styles.label}>
                Find : <Text style={styles.boldLabel}>{keyword}</Text>
              </Text>
            ) : (
              <Text style={styles.label}>
                Click <Text style={styles.boldLabel}>History </Text>
                {namaLiga ? namaLiga : 'To see the Order Detail'}
              </Text>
            )}
              {/* <ListHistory navigation={this.props.navigation} /> */}
              {/* <CardHistory
                pesanan={getListHistoryResult[key]}
                key={key}
                navigation={navigation}
                id={key}
              /> */}
            <ActiveOrder title="Order Id. 004" status="Finish" />
            <ActiveOrder title="Order Id. 003" status="Washing" />
            <ActiveOrder title="Order Id. 002" status="Finish" />
            <ActiveOrder title="Order Id. 001" status="Finish" />
          </View>

          <Distance height={100} />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  idLiga: state.JerseyReducer.idLiga,
  namaLiga: state.JerseyReducer.namaLiga,
  keyword: state.JerseyReducer.keyword,
});

export default connect(mapStateToProps, null)(Find);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  pages: {
    backgroundColor: colors.white,
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
  },
  boldLabel: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
  },
  pilihJersey: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  container: {
    marginTop: -30,
  },
  text: {
    marginLeft: windowHeight * 0.02,
  },
  title: {
    marginVertical: 10,
    fontSize: 18,
    fontFamily: 'TitilliumWeb-SemiBold'
  },
  page: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    width: windowWidth,
    height: windowHeight * 0.40
  },
  hello: {
    marginTop: windowHeight * 0.12,
    marginLeft: windowHeight * 0.05

  },
  welcome: {
    fontSize: 35,
    fontFamily: 'TitilliumWeb-Regular'
  },
  username: {
    fontSize: 30,
    fontFamily: 'TitilliumWeb-Bold'
  },
  account1: {
    marginTop: 10,
  },
  account2: {
    marginTop: 10
  }
})
