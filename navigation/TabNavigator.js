import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomePage from '../pages/HomePage';
import ClosetPage from '../pages/ClosetPage';
import CameraPage from '../pages/CameraPage';
import SocialPage from '../pages/SocialPage';
import ProfilePage from '../pages/ProfilePage';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

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
                component={HomePage} 
                options={() => ({
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="home-outline" color={color} size={size} />
                    ),
                })}
            />
            <Tab.Screen 
                name="Closet" 
                component={ClosetPage} 
                options={() => ({
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="albums-outline" color={color} size={size} />
                    ),
                })}  
            />
            <Tab.Screen 
                name="Camera" 
                component={CameraPage}
                options={() => ({
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="camera-outline" color={color} size={size} />
                    ),
                })} 
            />
            <Tab.Screen 
                name="Social" 
                component={SocialPage} 
                options={() => ({
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="share-social-outline" color={color} size={size} />
                    ),
                })}    
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfilePage} 
                options={() => ({
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="person-circle-outline" color={color} size={size} />
                    ),
                })} 
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;