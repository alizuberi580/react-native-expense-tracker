import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles'

const Input = ({label, style, textInputConfig, invalidInput}) => {
  
    const inputStyles=[styles.input];

    if(textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputMultiline)
    }

    if(invalidInput){
        inputStyles.push(styles.invalidInput);
    }
    return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalidInput && styles.invalidLabel]}>{label}</Text>
      <TextInput style={inputStyles}{...textInputConfig}/>
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    inputContainer:{
        marginHorizontal: 4,
        marginVertical:8,
        //flex:1
    },
    label:{
        fontSize:14,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4
    },
    input:{
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        color: GlobalStyles.colors.primary700
    },
    inputMultiline:{
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLabel:{
        color: GlobalStyles.colors.accent500
    },
    invalidInput:{
        backgroundColor:GlobalStyles.colors.error50
    }
})