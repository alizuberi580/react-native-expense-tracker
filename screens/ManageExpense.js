import { StyleSheet, Text, View } from 'react-native'
import { useContext, useLayoutEffect, useState } from 'react'
import { GlobalStyles } from '../constants/styles'
import { storeExpense, updateExpense, deleteExpense } from '../utilities/http'
import { ExpensesContext } from '../Store/expense-context'
import IconButton from '../components/UI/IconButton'
import ExpenseForm from '../components/ManageExpense/ExpenseForm'
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from '../components/UI/ErrorOverlay'

// route and navigation prompt used by those in StackNavigator container
// Navigation propt help use to navgate, go back, setOptions etc from screen to another.(also can be achieved by useNavigation)
// route is metadata about current screen. such as name and params passed to this screen
// Note: whenever a parameter passed to a screen from "navigation", access it through using "route"

const ManageExpense = ({route, navigation}) => {
  //parameter will only be there when , we inted to view/edit already entered expense, else this view will be used to add another/ew expense. hence field can be left null
  const [IsSubmitting, setIsSubmitting] = useState(false)
  const editedExpenseId= route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const expensesCtx = useContext(ExpensesContext)
  const [error, setError] = useState(null)

  const selectedExpense = expensesCtx.expenses.find(
    (expense)=> expense.id === editedExpenseId
  );
  
  useLayoutEffect(()=>{
    navigation.setOptions({
      title:isEditing?"Edit Expense": "Add Expense"
    });
  },[navigation, isEditing])
  
  async function deleteExpenseHandler(){
    setIsSubmitting(true) 
    try{
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      setIsSubmitting(false)       
      navigation.goBack();
    }catch(error){
      setError('Could not delete expenses - please try again later!')
      setIsSubmitting(false);       
    }
  }
  function cancleHandler(){
    navigation.goBack();
  }
  async function confirmHandler(expenseData){
    setIsSubmitting(true)
    try{
      if(isEditing){
        await updateExpense(editedExpenseId,expenseData);
        expensesCtx.updateExpense(editedExpenseId,expenseData);
      }else{
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({...expenseData, id: id});
      }
      //sice we go back, no need to set IsSubmitting to false since it will be set to false once we go back
      navigation.goBack();
    }catch(error){
      setError('Could not save data - please try again later! ');
      setIsSubmitting(false);
    }
  }
  function errorHandler(){
    setError(null)
    navigation.goBack();
  }

  if (error && !IsSubmitting){
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }
  if (IsSubmitting){
    return <LoadingOverlay/>;
  }
  return (
    <View style={styles.conatiner}>
      <ExpenseForm submitButtonLabel={isEditing? 'Update': 'Add'} onCancle={cancleHandler} onSubmit={confirmHandler} defaultValues={selectedExpense}/>
      { isEditing &&(
        <View style={styles.deleteContainer}>
          <IconButton 
            name="trash" 
            color={GlobalStyles.colors.error500} 
            size={36} 
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  )
}

export default ManageExpense

const styles = StyleSheet.create({
  conatiner:{
    flex:1,
    padding: 24,
    backgroundColor:GlobalStyles.colors.primary800
  },
  deleteContainer:{
    marginTop:16,
    paddingTop:8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems:'center'
  },
})
//alignItems center Vertically