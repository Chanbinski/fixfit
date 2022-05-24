import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomePage from '../pages/HomePage';
import ClosetPage from '../pages/ClosetPage';
import CameraPage from '../pages/CameraPage';
import SocialPage from '../pages/SocialPage';
import ProfilePage from '../pages/ProfilePage';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Closet" component={ClosetPage} />
            <Tab.Screen name="Camera" component={CameraPage} />
            <Tab.Screen name="Social" component={SocialPage} />
            <Tab.Screen name="Profile" component={ProfilePage} />
        </Tab.Navigator>
    );
};

export default TabNavigator;