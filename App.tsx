import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Movies from "./Pages/Movies";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MovieDetails from "./Pages/MovieDetails";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favourite from "./Pages/Favourite";
import MovieIcon from "@material-ui/icons/Movie";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { makeStyles, StylesContext } from "@material-ui/styles";
import { StyleSharp } from "@material-ui/icons";
import { styled } from "@material-ui/core";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Movies"
        component={Movies}
        options={{
          headerStyle: {
            backgroundColor: "#313131",
          },
          headerTintColor: "#a4acc4",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetails}
        options={{
          headerStyle: {
            backgroundColor: "#313131",
          },
          headerTintColor: "#a4acc4",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <RecoilRoot>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Movie List"
              component={StackNavigator}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Favorites"
              component={Favourite}
              options={{
                headerStyle: {
                  backgroundColor: "#313131",
                },
                headerTintColor: "#a4acc4",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
{
  /* <Tab.Navigator>

</Tab.Navigator> */
}
