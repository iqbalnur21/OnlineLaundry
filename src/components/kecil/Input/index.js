import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import {
  colors
  , fonts
} from '../../../utils';

const Input = ({
  textarea,
  onChangeText,
  width,
  height,
  fontSize,
  placeholder,
  label,
  value,
  secureTextEntry,
  keyboardType,
  disabled
}) => {
  if (textarea) {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.label(fontSize)}>{label} :</Text> */}
        <TextInput
          style={styles.inputTextArea(fontSize)}
          multiline={true}
          numberOfLines={3}
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          editable={disabled ? false : true}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* <Text style={styles.label(fontSize)}>{label} :</Text> */}
      <TextInput
        style={styles.input(width, height, fontSize)}
        placeholder={placeholder} value={value}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        editable={disabled ? false : true}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  label: (fontSize) => ({
    fontSize: fontSize ? fontSize : 18,
    fontFamily: fonts.primary.regular,
  }),
  input: (width, height, fontSize) => ({
    backgroundColor: colors.white,
    fontSize: fontSize ? fontSize : 18,
    fontFamily: fonts.primary.regular,
    width: width,
    height: height,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
    paddingVertical: 10,
    paddingHorizontal: 15,
  }),
  inputTextArea: (fontSize) => ({
    backgroundColor: colors.white,
    fontSize: fontSize ? fontSize : 18,
    fontFamily: fonts.primary.regular,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlignVertical: 'top'
  }),
});
