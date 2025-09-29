import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles'
import { getFormatedDate } from '../../utilities/date'

{/*
** onPress={pressHandler}
- Here, you are passing a reference to the function pressHandler.
- React Native will call this function when the event happens.
- Use this when your handler doesn’t need any extra arguments.

** onPress={()=>pressHandler(id)}
- Here, you are passing an arrow function as the handler.
- When the button is pressed, React Native executes the arrow function, which then calls pressHandler().
- Use this when you need to pass arguments or add extra logic.  

*/}

const ExpenseItem = ({id, description,date, amount}) => {
  const navigation =  useNavigation();

  function expensePressHandler(){
    navigation.navigate('ManageExpense', {expenseId: id});
  }

  return (
    <Pressable
      onPress={expensePressHandler}>
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>{description}</Text>
          <Text style={styles.textBase}>{getFormatedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default ExpenseItem

const styles = StyleSheet.create({
  expenseItem:{
    padding:12,
    backgroundColor: GlobalStyles.colors.primary500,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent:'space-between',
    borderRadius: 6,
    elevation: 6,
    shadowColor:GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOpacity: 0.6,
    shadowOffset: {width: 1, height:1}
  },
  textBase:{
    color:GlobalStyles.colors.primary50
  },
  description:{
    fontSize: 16,
    marginBottom: 4,
    fontWeight:'bold'
  },
  amountContainer:{
    paddingVertical:4,
    paddingHorizontal:20,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 4,
    minWidth: 90
  },
  amount:{
    color: GlobalStyles.colors.primary500
  }
})