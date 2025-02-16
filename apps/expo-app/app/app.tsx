import React from 'react';
import { TamaguiProvider } from 'tamagui'
import { config, Button } from '@app-monorepo/ui'

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <Button>Hello from Tamagui</Button>
    </TamaguiProvider>
  )
}
