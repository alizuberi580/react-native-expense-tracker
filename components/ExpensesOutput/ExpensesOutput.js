import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../../constants/styles'


const ExpensesOutput = ({expenses, expensePeriode, fallbackText}) => {

  let content = <Text style={styles.infoText}>{fallbackText}</Text>
  
  if(expenses.length>0){
    content = <ExpensesList expenses={expenses}/>
  }
  return (
    <View style={styles.rootContainer}>
      <ExpensesSummary expenses={expenses} periodeName={expensePeriode} />
      {content}
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  rootContainer:{
    backgroundColor:GlobalStyles.colors.primary700,
    paddingTop: 24,
    paddingHorizontal:24,
    //paddingBottom:0,
    flex:1
  },
  infoText:{
    color:'white',
    fontSize:16,
    textAlign:'center',
    marginTop:32
  },
})