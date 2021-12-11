import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, ImageBackground, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { getData, colors, fonts, responsiveHeight, responsiveWidth } from '../../utils'
import { Header, DefaultImage } from '../../assets'
import { Account1,  ProfileHeader } from '../../components'
import { dummyProfile, dummyMenu } from '../../data'

export default class Profile extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         profile: false,
         menus: dummyMenu
      }
    }
  
  
    componentDidMount() {
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
      
        this.getUserData();
      });
    }
  
    componentWillUnmount() {
      this._unsubscribe();
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
      <ImageBackground source={Header} style={styles.header}>
                <View style={styles.hello}>
                    <Text style={styles.welcome}>Welcome, </Text>
                    <Text style={styles.username}>{profile.Name}</Text>
                </View>
      </ImageBackground>
          {/* <ProfileHeader /> */}
        <View style={styles.container1}>
        <View style={styles.ProfilePicture}>
            <Image source={profile.avatar 
                ? {uri: profile.avatar } : DefaultImage
                } style={styles.foto} />
        </View>
            <View style={styles.information}>
                <View style={styles.text1}>
                    <Text style={styles.name}>{profile.Name}</Text>
                    <Text style={styles.email}>{profile.Email}</Text>
                </View>
            </View>
        </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.account1}>
                    <Account1 title="Security" status="Password" 
                    onPress={() => this.props.navigation.navigate('ChangePassword')}/>
                    <Account1 title="Personal Information" status="Name, Email, Number" 
                    onPress={() => this.props.navigation.navigate('EditProfile')}/>
                    <Account1 title="Terms and Condition" status="Agreement to terms" 
                    // onPress={() => this.props.navigation.navigate('Login')}
                    />
                </View>
                <View style={styles.account2}>
                    <Account1 title="Additional Information" status="Legal Document" 
                    // onPress={() => this.props.navigation.navigate('Login')}
                    />
                </View>
                <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate('Login')}>
                    <View style={styles.text}>
                        <Text style={styles.title}>Logout</Text> 
                        
                    </View>
                </TouchableOpacity>
            </ScrollView>
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
  container1: {
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
  text1: {
      marginTop: 10,
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
      width: responsiveWidth(100),
      height: responsiveHeight(100),
      flex: 1,
      // flexDirection: 'row',
      // justifyContent: 'center',
      fontSize: 18,
  },
  text: {
      marginLeft: windowHeight * 0.02,
  },
  title:{
      marginVertical:10,
      fontSize: 18,
      fontFamily: 'TitilliumWeb-SemiBold'
  },
  account1: {
      marginTop: 10,
  },
  account2: {
      marginTop: 10
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
  header: {
      width: windowWidth,
      height: windowHeight * 0.40
  },
  page: {
    flex: 1,
    backgroundColor: colors.white
  },
  container: {
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    marginBottom:10,
    marginHorizontal:30,
    padding: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    // borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    alignItems: 'center'
  },


  foto: {
    width: responsiveWidth(100),
    height: responsiveWidth(100),
    borderRadius: 100,
    alignSelf: 'center',
    // marginTop: -responsiveWidth(),
    alignSelf: 'center',
  },
  profile: {
    marginTop: 10,
    alignItems: 'center'
  },
});
