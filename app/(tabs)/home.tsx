import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { getAllPosts,getLatestPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";

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

const Home = () => {
  const latestpost = useAppwrite(getLatestPosts)
  const { data, loading, refetch } = useAppwrite(getAllPosts);
  const posts = (data || []) as Post[];
  const lposts = (latestpost.data || []) as Post[];

  const [refreshing, setrefreshing] = useState(false);

  const onrefresh = async () => {
    setrefreshing(true);
    await refetch();
    setrefreshing(false);
  };

  
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
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Bhuvi
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput 
            initialQuery=""/>
            <View className="flex w-full pt-5 pb-8 ">
              <Text className="text-lg text-white font-pmedium">
                Trending videos
              </Text>
              <Trending posts={lposts} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onrefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
