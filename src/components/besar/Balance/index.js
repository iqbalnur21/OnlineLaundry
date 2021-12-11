import React, { Component } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import {colors} from '../../../utils';
import { IconAddBalance} from '../../../assets'


const Balance = ({ title, onPress }) => {
    const Icon = () => {
        if (title === "Add Balance") return <IconAddBalance />
        return <IconAddBalance />
    }
    return (
        <View style={styles.container}>
            <View style={styles.information}>
                <View style={styles.text}>
                    <Text style={styles.balanceLabel}>Balance: </Text>
                    <Text style={styles.balanceValue}>Rp. 100.000</Text>
                </View>
            </View>
            <View style={styles.ActionButton}>
                <TouchableOpacity style={styles.container1} onPress={onPress}>
                    <View style={styles.button}>
                        <Icon />
                    </View>
                    <Text style={styles.text}>{title}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default Balance

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container1: {
    marginRight : 0
    },
    button:{
        backgroundColor: colors.secondary,
        padding: 10,
        borderRadius:10,
        marginHorizontal:10
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
    text: {
        justifyContent: 'space-between',
    },
    information: {
        width: '70%',
    },
    balanceLabel: {
        fontSize: 30,
        fontFamily: 'TitilliumWeb-Regular',
    },
    balanceValue: {
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Bold',
        justifyContent: 'flex-end'
    },
    ActionButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
})
