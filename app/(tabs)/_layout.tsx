import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

export default function _layout() {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return (
                        <View  style={{
                            backgroundColor: focused ? "#e8dbfc" : "transparent",
                            paddingHorizontal: 20, paddingVertical: 4,
                            borderRadius: 50, marginTop: 5
                        }}>
                            <Ionicons name="accessibility-sharp" size={size} color={focused? "#36B3B9": color} />
                        </View>
                    );
                },
                tabBarActiveTintColor: '#36B3B9',
                tabBarInactiveTintColor: 'gray',

                tabBarStyle: {
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    borderTopColor: '#ddd',
                    paddingBottom: 5,
                    height: 70,

                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                },
            })}
        />
    );
}
