import { TamaguiProvider } from 'tamagui'
import config from '../tamagui.config'
import { Stack } from 'expo-router'
import { useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'

// Keep splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

export default function Layout() {
  useEffect(() => {
    // Hide splash screen once the app is ready
    SplashScreen.hideAsync()
  }, [])

  return (
    <TamaguiProvider config={config}>
      <Stack />
    </TamaguiProvider>
  )
}
