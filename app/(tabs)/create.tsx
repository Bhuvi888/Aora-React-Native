import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import FormField from "@/components/FormField";
import VideoPlayer from "@/components/VideoPlayer";
import { icons, images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { createVideo } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";


const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setuploading] = useState(false);
  const [play, setplay] = useState(false);
  const [form, setform] = useState<{
    title: string;
    video: ImagePicker.ImagePickerAsset | null;
    thumbnail: ImagePicker.ImagePickerAsset | null;
    prompt: string;
  }>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const submit = async () => {

    if(!form.prompt||!form.thumbnail||!form.title||!form.video){
      Alert.alert("Please fill in all the fields")
    }
    setuploading(true)
    
    try {

      await createVideo({
        ...form,userId:user.$id
      })
      Alert.alert("Success","Post Uploaded Successfully")
      router.push('/home')
    } catch (error:any) {
      Alert.alert("error",error.message)
    }finally{
      setuploading(false)
      setform({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      })
    }
  };
  const openPicker = async (selecttype: string) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selecttype === 'image' ?   'images' : 'videos',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    
    if(!result.canceled){
      if(selecttype==='image'){
        setform({...form, thumbnail: result.assets[0]})
      }
      if(selecttype==='video'){
        setform({...form, video: result.assets[0]})
      }
    }
    

  };
  
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-white font-psemibold mt-5 text-2xl ">
          Upload Video
        </Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title"
          handleChangeText={(e) => setform({ ...form, title: e })}
          keyboardType=""
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-lg text-gray-200 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <VideoPlayer
                source={{uri: form.video?.uri}}
                className=""
                onVideoEnd={() => setplay(false)}
              ></VideoPlayer>
            ) : (
              <View className="w-full h-40 border border-black-200 rounded-lg mt-4 bg-black-100 flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-lg text-gray-200 font-pmedium">
            Upload Thumbnail
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
              source={{uri:form.thumbnail?.uri}}
              resizeMode="contain"
              className="w-full h-40"
              />
            ) : (
              <View className="w-full h-20 border border-black-200 rounded-lg mt-4 bg-black-100 flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI Prompt"
          placeholder="The AI Prompt of your video"
          value={form.prompt}
          handleChangeText={(e) => setform({ ...form, prompt: e })}
          keyboardType=""
          otherStyles="mt-10"
        />
        <CustomButton
          title="Submit and Publish"
          handlePress={submit}
          isLoading={uploading}
          containerStyle="mt-7 "
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
