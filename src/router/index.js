import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Splash, IronServiceDetail, AddBalanceServiceDetail, ExpressServiceDetail, PerKGServiceDetail,ServiceDetail, Profile, Keranjang, Checkout, EditProfile, ChangePassword, History, Login, Register1, Midtrans, Find} from '../pages';
import {BottomNavigator} from '../components';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      {/* <Tab.Screen
        name="Find"
        component={Find}
        options={{ title: 'Find', headerShown: false }}
      /> */}
      <Tab.Screen name="Account" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Keranjang"
        component={Keranjang}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{title: 'Edit Profile'}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{title: 'Change Password'}}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{title: 'History Pemesanan'}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register1"
        component={Register1}
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="Midtrans"
        component={Midtrans}
        options={{title: "Continue the Payment"}}
      />
      <Stack.Screen 
        name="ServiceDetail"
        component={ServiceDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PerKGServiceDetail"
        component={PerKGServiceDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExpressServiceDetail"
        component={ExpressServiceDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddBalanceServiceDetail"
        component={AddBalanceServiceDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IronServiceDetail"
        component={IronServiceDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Router;
