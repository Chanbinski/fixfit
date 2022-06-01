import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import HomePage from '../pages/HomePage';
import ClosetPage from '../pages/ClosetPage';
import CameraClosetPage from '../pages/CameraClosetPage';
import CameraSocialPage from '../pages/CameraSocialPage';
import SocialPage from '../pages/SocialPage';
import ProfilePage from '../pages/ProfilePage';
import Accessories from '../pages/Accessories';
import Bottoms from '../pages/Bottoms';
import Outerwear from '../pages/Outerwear';
import Tops from '../pages/Tops';
import DressesSkirts from '../pages/DressesSkirts';
import Shoes from '../pages/Shoes';

import Feather from 'react-native-vector-icons/Feather';
import CameraCloset from '../components/CameraCloset';
import CameraSocial from '../components/CameraSocial';

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
                component={ClosetStack} 
                options={() => ({
                    tabBarIcon: ({color, size}) => (
                        <Feather name="columns" color={color} size={24} />
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
            {/* <Tab.Screen 
                name="CameraComp" 
                component={CameraComp} 
                options={{
                    headerShown: false,
                    tabBarStyle: { display: "none" },
                    tabBarButton: (prop) => null,
                }} 
            /> */}
            <Tab.Screen 
                name="CameraCloset" 
                component={CameraCloset}
                options={({route}) => ({
                    tabBarIcon: ({color, size}) => (
                        <Feather name="camera" color={color} size={24} />
                    ),
                    tabBarStyle: { display: 'none', },
                    tabBarButton: (prop) => null,
                })} 
            />
            <Tab.Screen 
                name="CameraSocial" 
                component={CameraSocial}
                options={({route}) => ({
                    tabBarIcon: ({color, size}) => (
                        <Feather name="camera" color={color} size={24} />
                    ),
                    tabBarStyle: { display: 'none', },
                    tabBarButton: (prop) => null,
                })} 
            />
        </Tab.Navigator>
    );
};

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="HomeS"
                component={HomePage}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

const CameraClosetStack = () => {
    return (
        <Stack.Navigator>
             <Stack.Screen 
                name="CameraClosetS"
                component={CameraClosetPage}
                options={{ headerShown: false }}
            />
             <Stack.Screen 
                name="CameraCloset"
                component={CameraCloset}
                options={{ headerShown: false, tabBarStyle: { display: "none" }}}
            />
        </Stack.Navigator>
    )
}

const CameraSocialStack = () => {
    return (
        <Stack.Navigator>
             <Stack.Screen 
                name="CameraSocialS"
                component={CameraSocialPage}
                options={{ headerShown: false }}
            />
             <Stack.Screen 
                name="CameraSocial"
                component={CameraSocial}
                options={{ headerShown: false, tabBarStyle: { display: "none" }}}
            />
        </Stack.Navigator>
    )
}

const ClosetStack = () => {
    return (
        <Stack.Navigator>
             <Stack.Screen 
                name="ClosetS"
                component={ClosetPage}
                options={{ headerShown: false }}
            />
             <Stack.Screen 
                name="Accessories"
                component={Accessories}
                options={{ headerShown: false}}
            />
            <Stack.Screen 
                name="Outerwear"
                component={Outerwear}
                options={{ headerShown: false}}
            />
            <Stack.Screen 
                name="Tops"
                component={Tops}
                options={{ headerShown: false}}
            />
            <Stack.Screen 
                name="Bottoms"
                component={Bottoms}
                options={{ headerShown: false}}
            />
            <Stack.Screen 
                name="DressesSkirts"
                component={DressesSkirts}
                options={{ headerShown: false}}
            />
            <Stack.Screen 
                name="Shoes"
                component={Shoes}
                options={{ headerShown: false}}
            />
        </Stack.Navigator>
    )
}

export default TabNavigator;