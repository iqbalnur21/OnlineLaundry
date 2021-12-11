import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {IconHome, IconHomeActive, IconFind, IconFindActive, IconAccount, IconAccountActive} from '../../../assets'
import {colors} from '../../../utils';

const TabItem = ({isFocused, onPress, onLongPress, label}) => {
    const Icon =()=>{
        if(label === "Home") return isFocused ? <IconHomeActive/> : <IconHome/>
        if(label === "Account") return isFocused ? <IconAccountActive/> : <IconAccount/>
        if(label === "Find") return isFocused ? <IconFindActive/> : <IconFind/>
        return <IconHome/>
    }
    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}>
                <Icon/>
            <Text style={styles.text(isFocused)}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default TabItem

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
    },
        text:(isFocused) => ({
            fontSize : 13,
            color : isFocused ? colors.primary : colors.disable,
            marginTop : 8
    })
})