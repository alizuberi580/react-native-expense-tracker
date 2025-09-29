import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../Store/expense-context'
import { ErrorContext } from '../Store/error-context'
import { useContext} from 'react'
import ErrorOverlay from '../components/UI/ErrorOverlay'
import { StyleSheet} from 'react-native'

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  const errorCtx = useContext(ErrorContext);
  //const [error, setError] = useState();
  if(errorCtx.hasError){
    console.log('ola')
    return <ErrorOverlay message={'Could not fetch expenses!'}/>
  }
  return (
    <ExpensesOutput expenses={expensesCtx.expenses} expensePeriode="Total" fallbackText="No registered Text found"/>
  )
}

export default AllExpenses

const styles = StyleSheet.create({})