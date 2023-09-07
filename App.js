import {React} from "react";
import { StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexScreen from "./src/screens/IndexScreen";
import SearchScreen from "./src/screens/SearchScreen";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import ScreenOne from "./src/screens/ScreenOne";
import ScreenTwo from "./src/screens/ScreenTwo";
import ScreenThree from "./src/screens/ScreenThree";
import { ItemProvider } from "./src/contexts/ItemContext";
import CameraScreen from "./src/screens/CameraScreen";

const FormStack = createNativeStackNavigator();

const AddScreenf = () => {
  return(
  <FormStack.Navigator
  screenOptions={{
    headerShown: false
  }}>
    <FormStack.Screen name="ScreenOne" component={ScreenOne} title="New Game"/>
    <FormStack.Screen name="ScreenTwo" component={ScreenTwo} />
    <FormStack.Screen name="ScreenThree" component={ScreenThree} />
    <FormStack.Screen name="CameraScreen" component={CameraScreen} />
  </FormStack.Navigator>
  )
}

// export default function App() {
const App = () => {
  const Tab = createBottomTabNavigator();
  return (
    <ItemProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="IndexScreen"
          screenOptions={{
            headerStyle: {
              backgroundColor: "rgb(116,148, 185)",
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
              height: 90,
            },
            headerTitleAlign: "center",
            tabBarStyle: {
              backgroundColor: "rgb(116,148, 185)",
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              height: 75,
              paddingTop: 5
            },
            tabBarShowLabel: false,
          }}
        >
          <Tab.Screen
            name="IndexScreen"
            component={IndexScreen}
            options={{
              title: "North Bowl",
              headerTintColor: "white",
              tabBarIcon: ({ color }) => (
                <AntDesign name="home" size={35} color="white" />
              ),
            }}
          />
          <Tab.Screen
            name="AddScreenf"
            component={AddScreenf}
            options={{
              title: "North Bowl",
              headerTintColor: "white",
              tabBarIcon: ({ color }) => (
                <Ionicons name="add" size={53} color="white" />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
              title: "North Bowl",
              headerTintColor: "white",
              tabBarIcon: ({ color }) => (
                <Feather name="search" size={35} color="white" />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ItemProvider>
  );
};

// const styles = StyleSheet.create({
//   headerStyle:{
//     backgroundColor: "rgb(116,148, 185)",
//     borderBottomLeftRadius: 15,
//     borderBottomRightRadius: 15,
//     height: 90,
//   }
// });

export default App;