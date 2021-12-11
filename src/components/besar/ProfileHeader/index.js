import React, {Component} from 'react';
import { StyleSheet, Text, Image, View, Dimensions } from 'react-native'
import { dummyProfile, dummyMenu } from '../../../data'
// import {Text, StyleSheet, View, Image, ImageBackground, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { getData, colors, fonts, responsiveHeight, responsiveWidth } from '../../../utils'
import { Header, DefaultImage } from '../../../assets'

export default class ProfileHeader extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         profile: false,
         menus: dummyMenu
      }
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
        <View style={styles.container}>
        <View style={styles.ProfilePicture}>
            <Image source={profile.avatar 
                ? {uri: profile.avatar } : DefaultImage
                } style={styles.foto} />
        </View>
            <View style={styles.information}>
                <View style={styles.text}>
                    <Text style={styles.name}>iqbal</Text>
                    <Text style={styles.email}>iqbal@gmail.com</Text>
                </View>
            </View>
        </View>
    );
  }
}


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    profile: {
      marginTop: 10,
      alignItems: 'center'
    },
    foto: {
      width: responsiveWidth(100),
      height: responsiveWidth(100),
      borderRadius: 100,
      alignSelf: 'center',
    },
    container: {
        width: responsiveWidth(350),
        height: responsiveWidth(130),
        backgroundColor: 'white',
        padding: 10,
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
    text: {
        justifyContent: 'space-between'
    },
    information: {
        width: '60%',
    },
    name: {
        fontSize: 30,
        fontFamily: 'TitilliumWeb-Bold',
    },
    email: {
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Regular',
    },
    ProfilePicture: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    }
})
