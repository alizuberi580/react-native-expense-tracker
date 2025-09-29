import { createContext, useReducer } from 'react'

/*
- createContext makes a context object.
- It has a default value (object with expenses and three empty functions).
- This ensures that if a component tries to use the context without a provider, it won’t crash immediately (but functions won’t do anything).
- So this is like a "blueprint" of what data/functions the context will provide.
*/
export const ExpensesContext = createContext({
    expenses:[],
    addExpense:({description, amount, date})=>{},
    setExpenses:(expenses)=>{},
    deleteExpense: (id)=>{},
    updateExpense: (id, {description, amount, date})=>{},
})

function expensesReducer(state, action){
    switch(action.type){
        case 'ADD':
            //const id = new Date().toString() + Math.random().toString();
            return [action.payload, ...state];
        case 'SET':
          const inverted = action.payload.reverse();
          return inverted;
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense)=>expense.id===action.payload.id
            );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = {...updatableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense)=> expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpensesContextProvider({children}){
    const [expensesState, dispatch] = useReducer(expensesReducer, []);
    /*
        payload: carries the data needed to perform that update. Think of payload as a "box" that contains the information your reducer needs.
    */
    function addExpense(expenseData){
        dispatch({type:'ADD', payload: expenseData});
    }
    
    function setExpenses(expenses){
      dispatch({type:'SET', payload: expenses})
    }

    function deleteExpense(id){
        dispatch({type:'DELETE', payload: id});
    }

    function updateExpense(id, expenseData){
        dispatch({type:'UPDATE', payload: {id: id, data: expenseData}})
    }

    const value ={
        expenses:expensesState,
        setExpenses: setExpenses,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };
    
    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}


/*
 NOTE: The reason we wrap NavigationContainer / your whole navigation tree in ExpensesContextProvider is because 
        we want all screens in your app to be able to access the context. 
 */
export default ExpensesContextProvider;

