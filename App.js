import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './components/UI/IconButton'
import AllExpenses from './screens/AllExpenses';
import ManageExpense from './screens/ManageExpense';
import RecentExpense from './screens/RecentExpense';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalStyles } from './constants/styles';
import ExpensesContextProvider from './Store/expense-context';
import { ErrorContextProvider } from './Store/error-context';

//Axios is a 3rd party app to handle Http request. 
/*
- Axios is a JavaScript library used to make HTTP requests (GET, POST, PUT, DELETE, etc.) from your app to a backend or API.
- It works in React, React Native, Node.js, and browsers.
- It’s built on Promises, making async code cleaner than using fetch.
why Axios whwn we have fetch() in React Native?
1. Cleaner Syntax
2. Automatic JSON Handling
3. Request/Response Interceptors
4. Timeout Support
5. Better Error Handling
*/

const Stack=createNativeStackNavigator()
const BottomTabs=createBottomTabNavigator()

function ExpenseOverview(){
  return(
    <BottomTabs.Navigator 
      screenOptions={({navigation})=>({
        headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
        headerTintColor:'white',
        tabBarStyle:{backgroundColor:GlobalStyles.colors.primary500},
        tabBarActiveTintColor:GlobalStyles.colors.accent500,
        headerRight:()=>( 
          <IconButton
            name="add"
            size={24}
            color="white"
            onPress={()=>navigation.navigate('ManageExpense')}
          />
        ),
      })}
    >
      <BottomTabs.Screen 
        name='RecentExpense' 
        component={RecentExpense}
        options={{
          title:'Recent Expenses',
          tabBarLabel:'Recent',
          tabBarIcon:({color,size})=><Ionicons name='hourglass' size={size} color={color}/>
        }}
        unmountOnBlur={false}   // 👈 applied on tab screens
      />
      <BottomTabs.Screen 
        name='AllExpenses' 
        component={AllExpenses}
        options={{
          title:'All Expenses',
          tabBarLabel:'All',
          tabBarIcon:({color,size})=><Ionicons name='calendar' size={size} color={color}/>
        }}
        unmountOnBlur={false}   // 👈 applied here too
      />
    </BottomTabs.Navigator>

  )
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ErrorContextProvider>
        <ExpensesContextProvider>
          <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
              headerStyle:{ backgroundColor:GlobalStyles.colors.primary500},
              headerTintColor:'white',
            }}
          >
            <Stack.Screen 
              name='ExpenseOverview' 
              component={ExpenseOverview} 
              options={{ headerShown:false }}
            />
            <Stack.Screen 
              name='ManageExpense' 
              component={ManageExpense}
              options={{
                presentation:'modal',
                animation: 'slide_from_bottom',
              }}
            />
          </Stack.Navigator>
          </NavigationContainer>
        </ExpensesContextProvider>
      </ErrorContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  
});
