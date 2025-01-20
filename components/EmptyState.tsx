import { View, Text,Image } from "react-native";
import React from "react";

import images from "../constants/images";
import CustomButton from "./CustomButton";
import { router } from "expo-router";




interface EmptyStateProps {
  title: string;
  subtitle: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center">
        <Image
        source={images.empty}
        className="w-[300px] h-[250px] "
        resizeMode="contain"
        />
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>
      <Text className="text-2xl font-psemibold text-white my-4">{title}</Text>

      <CustomButton
        title="Create Video"
        handlePress={()=>router.push('/create')}
        containerStyle="w-full my-2"
        isLoading={false}
      />
    </View>
  );
};

export default EmptyState;
