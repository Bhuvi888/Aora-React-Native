import { ScrollView, Text, View,Image } from 'react-native'
import React from 'react'
import { Redirect, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons, images } from '@/constants';
import CustomButton from '@/components/CustomButton';
import { useGlobalContext } from '@/context/GlobalProvider';


export default function app() {
 
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return(
  <SafeAreaView className="bg-primary h-full">
    <ScrollView contentContainerStyle={{height:'100%'}}>

      <View className=" w-full min-h-[85vh]  items-center justify-center  px-4"> 
        <Image 
        source={images.logo}
         resizeMode='contain'
         className='w-[130px] h-[80px]'
        />
        <Image
        source={images.cards}
        resizeMode='contain'
        className='max-w-[380px] w-full h-[300px]'
        />
        <View className='mt-1'>
        <Text className="text-white font-psemibold text-xl text-center justify-center gap-2">
          Discover endless possibilities and creativity with {' '}
          
          <Text className='text-secondary-200 text-bold text-3xl font-bold'>
            Aura
          </Text>
          </Text>
          <Image
          source={images.path}
          className='w-[150px] h-[13px] absolute -bottom-0 -ri'
          resizeMode='contain'
          />
        </View>

        <Text className='text-gray-50 text-sm mt-6 text-center font-pregular'>
        Where Creativity Meets Innovation: Embark on a Journey of Limitless
        Exploration with Aora
        </Text>

        <CustomButton
         title='Continue with email'
         handlePress={()=> router.push('/(auth)/sign-in')}
         containerStyle='w-full mt-7'
         isLoading={false}
         textStyles=''
        />

      </View>
    </ScrollView>
    <StatusBar />

  </SafeAreaView>
  
  
  
  );

}


