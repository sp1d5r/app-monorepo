import React from 'react';
import { SafeAreaView } from 'react-native'
import { TamaguiProvider } from 'tamagui'
import { config, Button } from '@app-monorepo/ui'

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button>Hello from Tamagui</Button>
      </SafeAreaView>
    </TamaguiProvider>
  )
}
