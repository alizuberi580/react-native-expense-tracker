import { StyleSheet, Text, View, Alert } from 'react-native'
import {useState} from 'react'
import Input from './Input'
import Button from '../UI/Button'
import date, { getFormatedDate } from '../../utilities/date'
import { GlobalStyles } from '../../constants/styles'

const ExpenseForm = ({onCancle, onSubmit, submitButtonLabel, defaultValues}) => {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues? defaultValues.amount.toString() : '',
            isValid: defaultValues? !!defaultValues:true
        },
        date: {
            value: defaultValues? getFormatedDate(defaultValues.date):'',
            isValid: defaultValues? !!defaultValues:true

        },
        description :{
            value: defaultValues? defaultValues.description :'',
            isValid: defaultValues? !!defaultValues:true
        },
    });
    //currentInputValues saves the old state of inputValues(which may have description saved or date saved when entering amount)
    /* 
      * what happens, every time when useState call, old values(state) is overwritten, 
        hence its inportant when amount being enterd, the things entered previously like date and/or description is not nullified. hence first we save old state , 
        then overwrite the objection with new values

      * hence ;
        Inside, we call setInputValues and return a new object that keeps all old values (...currentInputValues) but overrides one key dynamically ([inputIdentifier]).
    */
    
    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value, // '+' --> converting the string into number
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setInputs((currentInputs) => {
                return {
                    amount: {
                        value: currentInputs.amount.value,
                        isValid: amountIsValid,
                    },
                    date: {
                        value: currentInputs.date.value,
                        isValid: dateIsValid,
                    },
                    description: {
                        value: currentInputs.description.value, // ✅ fixed bug
                        isValid: descriptionIsValid,
                    },
                };
            });
            return; // ✅ stop execution, don’t call onSubmit
        }

        onSubmit(expenseData); // ✅ only runs when inputs are valid
    }


    function inputChangedHandler(inputIdentifier, enteredValue){
        setInputs((currentInputs)=>{
            return {
                ...currentInputs,
                [inputIdentifier]: {value: enteredValue, isValid:true},
            };
        });
    }

    const formIsValid = 
        !inputs.amount.isValid || 
        !inputs.date.isValid || 
        !inputs.description.isValid
  return (
    <View style={styles.form}>
        <Text style={styles.titlw}>Your Expense</Text>
        <View style={styles.inputRow}>
            <Input 
                style={styles.rowInput}
                label="Amount"
                invalidInput={!inputs.amount.isValid} // adding '!' bcz if inputs.amount.isValid == true ---> invalidInput = false
                textInputConfig={{
                    keyboardType:'decimal-pad',//event though input type number, its still a string
                    onChangeText: (text)=>(inputChangedHandler('amount', text)),
                    value: inputs.amount.value,
                }}
            />
            <Input 
                style={styles.rowInput}
                label="Date"
                invalidInput={!inputs.date.isValid}
                textInputConfig={{
                    placeholder:'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: (text)=>(inputChangedHandler('date', text)),
                    value: inputs.date.value,
                }}
            />
        </View>
        <Input 
            label="Description"
            invalidInput={!inputs.description.isValid}
            textInputConfig={{
                multiline: true,
                // autoCapitalize:'none',
                // autoCorrect: false //default is true
                onChangeText: (text)=>(inputChangedHandler('description', text)),
                value: inputs.description.value,
            }}
        />
        {formIsValid && (
            <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>
        )}
        <View style={styles.buttonConatiner}>
            <Button style={styles.button} mode="flat" onPress={onCancle}>Cancle</Button>
            <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
        </View>
    </View>
  )
}
// arrowfunction wrapped in no braces --> return whole single line. implicit return 
// arrowfunction wrapped in () braces --> return the whole inside ( )
// arrowfunction wrapped in {} braces --> whole function block. return whe explicitly return statement mentioned inside { }
export default ExpenseForm

const styles = StyleSheet.create({
    form:{
        marginTop: 80
    },
    titlw:{
        fontSize: 24,
        fontWeight:'bold',
        color:'white',
        marginVertical: 24,
        textAlign:'center'
    },
    inputRow:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    rowInput:{
        flex:1
    },
    errorText:{
        textAlign:'center',
        color:GlobalStyles.colors.error500,
        margin: 8
    },
    buttonConatiner:{
       flexDirection:'row',
       justifyContent:'center',
       alignItems:'center', 
    },
    button:{
        minWidth: 120,
        marginHorizontal: 8,
    }
})