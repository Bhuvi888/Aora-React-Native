import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import { searchPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";

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

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data, loading, refetch } = useAppwrite(() => searchPosts(query));
  const posts = (data || []) as Post[];

  useEffect(() => {
    refetch();
  }, [query]);

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
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {query}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput
                  initialQuery={Array.isArray(query) ? query[0] : query}
                />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos found"
            subtitle="No videos found for the search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
