import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IconAddBalance, IconExpress, IconIron, IconPerKG } from '../../../assets'
import {colors} from '../../../utils';

const ButtonIcon = ({ title, type, onPress, jersey, navigation }) => {
    const Icon = () => {
        if (title === "Add Balance") return <IconAddBalance />
        if (title === "Per KG") return <IconPerKG />
        if (title === "Iron Only") return <IconIron />
        if (title === "Express") return <IconExpress />
        return <IconAddBalance />
    }
    
    return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.button(type)}>
        <Icon/>
      </View>
      <Text style={styles.text(type)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonIcon

const styles = StyleSheet.create({
    container: (type) => ({
    marginBottom:12,
    marginRight : type === "Service" ? 30 : 0
    }),
    button:(type) => ({
        backgroundColor: colors.secondary,
        padding: type === "Service" ? 12 : 7,
        borderRadius:10
    }),
    text:(type) => ({
        fontSize: type === "Service" ? 14 : 10,
        fontFamily:type === "Service" ? 'TitilliumWeb-Light' :'TitilliumWeb-Reguler',
        textAlign:'center'
    })
})
