import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '../pages/HomePage';
import ClosetPage from '../pages/ClosetPage';
import CameraPage from '../pages/CameraPage';
import SocialPage from '../pages/SocialPage';
import ProfilePage from '../pages/ProfilePage';
import CameraModal from '../components/CameraModal';

import Feather from 'react-native-vector-icons/Feather';
import CameraComp from '../components/CameraComp';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {backgroundColor: '#fff'},
                tabBarInactiveTintColor: 'gray',
                tabBarActiveTintColor: 'black',
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeStack} 
                options={() => ({
                    tabBarIcon: ({color, size}) => (
                        <Feather name="home" color={color} size={24} />
                    ),
                })}
            />
            <Tab.Screen 
                name="Closet" 
                component={ClosetPage} 
                options={() => ({
                    tabBarIcon: ({color, size}) => (
                        <Feather name="columns" color={color} size={24} />
                    ),
                })}  
            />
            <Tab.Screen 
                name="Camera" 
                component={CameraPage}
                options={() => ({
                    tabBarIcon: ({color, size}) => (
                        <Feather name="camera" color={color} size={24} />
                    ),
                })} 
            />
            <Tab.Screen 
                name="Social" 
                component={SocialPage} 
                options={() => ({
                    tabBarIcon: ({color, size}) => (
                        <Feather name="globe" color={color} size={24} />
                    ),
                })}    
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfilePage} 
                options={() => ({
                    tabBarIcon: ({color, size}) => (
                        <Feather name="user" color={color} size={24} />
                    ),
                })} 
            />
            <Tab.Screen 
                name="CameraComp" 
                component={CameraComp} 
                options={{
                    headerShown: false,
                    tabBarStyle: { display: "none" },
                    tabBarButton: (prop) => null,
                }} 
            />
        </Tab.Navigator>
    );
};

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Home"
                component={HomePage}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default TabNavigator;