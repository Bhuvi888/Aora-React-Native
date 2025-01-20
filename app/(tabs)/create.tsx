import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Divider } from 'react-native-paper'

const Create = () => {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <View>
        <Text className='text-white font-psemibold mt-5 text-lg px-4'>Upload Video</Text>
        <Divider 
        theme={{ colors: { primary: 'white' } }}
        />
      </View>
      <Button
      icon={"camera"}
      >
       Press me
      </Button>
      
    </SafeAreaView>
  )
}

export default Create