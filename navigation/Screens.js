import React, {useEffect, useState} from "react";
import { Easing, Animated, Dimensions } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Block } from "galio-framework";

// screens
import Home from "../screens/Home";
import BetDetail from "../screens/BetDetail";
import RecentMatches from "../screens/RecentMatches";
import MyBets from "../screens/MyBets";
import Onboarding from "../screens/Onboarding";
import Register from "../screens/Register";
import Login from '../screens/Login';
import Detail from '../screens/Detail';
import Profile from "../screens/Profile";
import Qrcode from "../screens/Qrcode";

import { CategoryService } from "../services/category/category.service";


// drawer
import CustomDrawerContent from "./Menu";

// header for screens
import { Icon, Header } from "../components";
import { argonTheme, tabs } from "../constants";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const categoryTabs = [
  {
    id:-1,
    title:'All Sports'
  },
  {
    id:0,
    title:'Football'
  },
  {
    id:1,
    title:'Basketball'
  },
  {
    id:2,
    title:'Volleyball'
  }
]

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      let categorieslist = await CategoryService.getCategories();
      console.log(categorieslist);
      let categoriesTOUpdate = [
        {
          id: -1,
          label: "All sports",
          state: 0,
        },
        ...(categorieslist || []),
      ]
      setCategories(categoriesTOUpdate.map(cat => {
        return { id: cat.id.toString(), title: cat.label }
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              search
              navigation={navigation}
              scene={scene}
              tabs={categories}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Detail"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
    </Stack.Navigator>
  );
}


function RecentMatchesStack(props) {
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      let categorieslist = await CategoryService.getCategories();
      console.log(categorieslist);
      let categoriesTOUpdate = [
        {
          id: -1,
          label: "All sports",
          state: 0,
        },
        ...(categorieslist || []),
      ]
      setCategories(categoriesTOUpdate.map(cat => {
        return { id: cat.id.toString(), title: cat.label }
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Recent Matches"
        component={RecentMatches}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Recent Matches"
              navigation={navigation}
              scene={scene}
              tabs={categories}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Detail"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
    </Stack.Navigator>
  );
}

function MyBetsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="My Bets"
        component={MyBets}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="My Bets"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="BetDetail"
        component={BetDetail}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Bet Detail"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
    </Stack.Navigator>
  );
}

function QrCodeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="QR Code"
        component={Qrcode}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="QR Code"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Detail"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
    </Stack.Navigator>
  );
}

function AuthStack(props) {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      <Stack.Screen option={{
          headerTransparent: true
        }}
        name="Login" component={Login} />
      <Stack.Screen option={{
          headerTransparent: true
        }}
        name="Register" component={Register} />
    </Stack.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator initialRouteName="Onboarding" mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="App"  component={AppStack} />
    </Stack.Navigator>
  );
}


function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Recent Matches" component={RecentMatchesStack} />
      <Drawer.Screen name="My Bets" component={MyBetsStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="QR Code" component={QrCodeStack} />
    </Drawer.Navigator>
  );
}

