import { TouchableOpacity, Text } from 'react-native';
import React from 'react';

interface CustomButtonProps {
  title: string;
  containerStyle?: string; 
  handlePress: () => void;
  isLoading: boolean;
  textStyles?: string; 
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, containerStyle = '', handlePress, isLoading, textStyles = '' }) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl justify-center items-center min-h-[62px] ${containerStyle} ${isLoading ? 'opacity-50' : ''}`}>
      <Text 
        className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
