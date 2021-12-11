import React, { Component } from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, ScrollView, Image } from 'react-native'
import { Header, DefaultImage } from '../../assets'
import { Balance, ButtonIcon, ActiveOrder, BannerSlider} from '../../components'
import { colors, getData, responsiveHeight, responsiveWidth } from '../../utils';

export default class Home extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         profile: false,
        //  menus: dummyMenu
      }
    }
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
        
          this.getUserData();
        });
      }
    getUserData = () => {
        getData('user').then(res => {
          const data = res
    
          if(data) {
            this.setState({
              profile: data
            })
          }else {
            this.props.navigation.replace('Login')
          }
    
        })
      }
    render() {
        const { profile, menus } = this.state
        return (
            <View style={styles.page}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground source={Header} style={styles.header}>
                    <View style={styles.hello}>
                        <Text style={styles.welcome}>Welcome, </Text>
                        <Text style={styles.username}>{profile.Name}</Text>
                    </View>
                </ImageBackground>
                <BannerSlider/>
                {/* <Balance title="Add Balance"
                    onPress={() => this.props.navigation.navigate('AddBalanceServiceDetail')}
                /> */}
                    <View style={styles.service}>
                        <Text style={styles.label}>
                            Service
                        </Text>
                        <View style={styles.serviceIcon}>
                            <ButtonIcon title="Per KG" type="Service"
                                onPress={() => this.props.navigation.navigate('PerKGServiceDetail')}
                            />
                            <ButtonIcon title="Iron Only" type="Service"
                                onPress={() => this.props.navigation.navigate('IronServiceDetail')}
                            />
                            <ButtonIcon title="Express" type="Service"
                                onPress={() => this.props.navigation.navigate('ExpressServiceDetail')}
                            />
                        </View>
                    </View>
                    <View style={styles.activeOrder}>
                        <Text style={styles.label}>
                            Active Order
                        </Text>
                        <ActiveOrder title="Order Id. 004" status="Finish" />
                        <ActiveOrder title="Order Id. 003" status="Washing" />
                        <ActiveOrder title="Order Id. 002" status="Finish" />
                        <ActiveOrder title="Order Id. 001" status="Finish" />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
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
    service: {
        paddingHorizontal: 30,
        paddingTop: 10
    },
    label: {
        fontSize: 18,
        fontFamily: 'TitilliumWeb-Bold'
    },
    serviceIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    activeOrder: {
        paddingTop: 10,
        paddingHorizontal: 30,
        backgroundColor: colors.GREY_COLOR,
        flex: 1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20

    }
})