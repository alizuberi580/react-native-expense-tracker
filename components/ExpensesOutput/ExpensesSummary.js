import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles'

const ExpensesSummary = ({expenses,periodeName}) => {
  const expenseSum=expenses.reduce((sum, expense)=>{
    return sum+ expense.amount
  },0)
  return (
    <View style={styles.container}>
      <Text style={styles.peiode}>{periodeName}</Text>
      <Text style={styles.sum}> ${expenseSum.toFixed(2)} </Text>
    </View>
  )
}

export default ExpensesSummary

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:8,
    backgroundColor:GlobalStyles.colors.primary50,
    alignItems:'center',
    borderRadius: 6
  },
  peiode:{
    fontSize:12,
    color:GlobalStyles.colors.primary400
  },
  sum:{
    fontSize:16,
    fontWeight:'bold',
    color:GlobalStyles.colors.primary500
  },
})