import { Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
    return (
        <Stack  >
            <Stack.Screen name="index" options={{ headerShown: true, headerTitle: "Mateus" }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    )
}
