import React from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import { IconFindActive } from '../../../assets'

const SearchBox = (title) => {
    const Icon = () => {
        if (title === "Find") return <IconFindActive />
        return <IconFindActive />
    }
    return (
        <View style={styles.container}>
            <View style={styles.information}>
                <TextInput placeholder="Type Keyword" style={styles.balanceLabel}></TextInput>

            </View>
            <View style={styles.ActionButton}>
                <TouchableOpacity >
                    <View >
                        <Icon />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SearchBox

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
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

    },
    information: {
        width: '80%',
    },
    balanceLabel: {
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Regular',
        justifyContent: 'center',
    },
    ActionButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 7
    }
})
