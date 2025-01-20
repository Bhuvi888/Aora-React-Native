import { View, Text, FlatList, TouchableOpacity,Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import { getCurrentUserPosts, signOut } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";
import { icons, images } from "@/constants";
import { router } from "expo-router";
import InfoBox from "@/components/InfoBox";

type Post = {
  $id: string;
  title: string;

  video: string;
  thumbnail: string;
  creator: {
    username: string;
    avatar: string;
  };
};

const Profile = () => {
  
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data,loading} = useAppwrite(() => getCurrentUserPosts(user.$id));
  const posts = (data || []) as Post[];

  
 const Logout = async () => {
  await signOut();
  setUser(null)
  setIsLogged(false)

  router.replace("/sign-in")
 }
  console.log(posts);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            video={item}
            //title={item.title}
            //thumbnail={item.thumbnail}
            //video={item.video}
            //creator={item.creator.username}
            //avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <>
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-6">
            <TouchableOpacity
            onPress={Logout}
             className="flex w-full items-end mb-10"
            >
            <Image
            source={icons.logout}
            className="w-6 h-6"
            resizeMode="contain"
            />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
              source={{uri:user?.avatar}}
              className="w-16 h-16 rounded-lg"
              resizeMode="cover"
              />
              </View>
              <InfoBox
              title={user?.username}
              subtitle=""
              containerStyles="mt-5"
              titleStyles="text-lg"
              />
            <View className="mt-5 flex flex-row">
            <InfoBox
            title={posts.length||0}
            subtitle="Posts"
            containerStyles="mr-10"
            titleStyles="text-xl"
            />

            
            <InfoBox
            title="1.2k"
            subtitle="followers"
            containerStyles=""
             titleStyles="text-xl"
            />
              
            
            </View>

          </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos found"
            subtitle="No video found for this profile"
          />
        )}
        
      />
    </SafeAreaView>
  );
};

export default Profile;
