import React from 'react';
import { Button } from '@app-monorepo/ui'
import { View } from 'react-native'

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button>Welcome to Expo!</Button>
    </View>
  )
} 