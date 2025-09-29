import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Ionicons} from "@expo/vector-icons"
const IconButton = ({name, size, color, onPress}) => {
  return (
    <Pressable onPress={onPress}>
        <View style={styles.buttonContainer}>
            <Ionicons name={name} size={size} color={color}/>
        </View>
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
    buttonContainer:{
        padding: 6,
        margin:8,
        borderRadius: 24
    },
    pressed:{
        onpacity: 0.75
    }
})