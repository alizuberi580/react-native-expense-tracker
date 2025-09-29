import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import ExpenseItem from './ExpenseItem'

const ExpensesList = ({expenses}) => {

  function renderExpenseItem(itemData){
    return(
      <ExpenseItem id={itemData.item.id} description={itemData.item.description} date={itemData.item.date} amount={itemData.item.amount}/>
    )
  }
  return (
    <View style={styles.flatListContainer}>
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }} // ✅ fixes bottom clipping
        style={styles.flat}
      />
    </View>
  )
}

export default ExpensesList

const styles = StyleSheet.create({
  flatListContainer:{
    flex:1,
  },
  flat:{
    //backgroundColor:'red'
  }
})




/*
-- 'itemData' ek wrapper object hoga jisme ye fields hoti hain (agar hum isko console par print karein):
{
  "item": { "id": "1", "title": "Apples", "price": 2.5 }, // tumhara data ka ek element
  "index": 0,        // us element ka index data array me
  "separators": { ... } // optional helper for styling
}

. itemData.item → tumhara actual array element
. itemData.index → us item ka index (0, 1, 2, ...)
. itemData.separators → rarely used, mostly for customizing separators
*/