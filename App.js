import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Login from "./app/screens/Login";
import Selection from "./app/screens/Selection";
import GameTwo from "./app/screens/GameTwo"; // GameTwo ekledik

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Selection"
          component={Selection}
          options={{ headerShown: false  }}
        />
        <Stack.Screen
          name="GameTwo"
          component={GameTwo}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
