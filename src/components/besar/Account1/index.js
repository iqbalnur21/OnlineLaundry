import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'

const Account1 = ({ title, status, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.text}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.status}>{status}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Account1

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
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
    text: {
        marginLeft: windowHeight * 0.02,
    },
    title: {
        fontSize: 18,
        fontFamily: 'TitilliumWeb-SemiBold'
    },
    status: {
        fontSize: 14,
        fontFamily: 'TitilliumWeb-Light',
    }
})
