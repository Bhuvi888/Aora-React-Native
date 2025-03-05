import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react';
import { icons } from '@/constants';


interface FormProps{
    title: string;
    value: string;
    placeholder?: string;
    handleChangeText: (text: string) => void;
    otherStyles?: string;
    keyboardType:string
}
const FormField: React.FC<FormProps> = ({title,value,placeholder,handleChangeText,otherStyles,keyboardType,...props}) => {

  const [showPassword, setshowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-lg text-gray-200 font-pmedium  '>{title}</Text>
      <View className='w-full h-16 mt-3 rounded-2xl border-2 bg-black-100 px-4 border-black-200 flex flex-row items-center focus:border-secondary'>
        
        <TextInput
        className='flex-1 font-psemibold text-white text-base pt-5'
          placeholder={placeholder}
          value={value}
          onChangeText={handleChangeText}
          placeholderTextColor='gray'
          secureTextEntry={title==='Password' && !showPassword}
          {...props}
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
            <Image
            className='w-6 h-6'
            source={!showPassword ? icons.eye : icons.eyeHide}
            resizeMode='contain'
            />
          </TouchableOpacity>
        )}

      </View>
        
      
    </View>
  )
}

export default FormField

