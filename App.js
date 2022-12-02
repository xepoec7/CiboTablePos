import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FloorScreen from './screens/FloorScreen';
import OrderScreen from './screens/OrderScreen';
import InvoiceScreen from './screens/InvoiceScreen';
import CashierScreen from './screens/CashierScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} styles={styles.container}>
          <Stack.Screen name="Floor" component={FloorScreen} />
          <Stack.Screen name='Order' component={OrderScreen} />
          <Stack.Screen name='Invoice' component={InvoiceScreen} />
          <Stack.Screen name='Cashier' component={CashierScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
});
