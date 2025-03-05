import * as Animatable from "react-native-animatable";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet
} from "react-native";
import { icons } from "@/constants";
import VideoPlayer from "./VideoPlayer";


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

const zoomIn = {
  0: { scaleX: 0.9, scaleY: 0.9 },
  1: { scaleX: 1.1, scaleY: 1.1 },
};

const zoomOut = {
  0: { scaleX: 1.1, scaleY: 1.1 },
  1: { scaleX: 0.9, scaleY: 0.9 },
};

const TrendingItem = ({
  activeItem,
  Item,
}: {
  activeItem: Post;
  Item: Post;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const isActive = activeItem?.$id === Item.$id;

  


  return (
    <Animatable.View
      animation={isActive ? zoomIn : zoomOut}
      duration={300}
      useNativeDriver
      className="h-96 w-64"
    >
      {isPlaying ? (
        <VideoPlayer
        source={{ uri: Item.video }}
          onVideoEnd={() => setIsPlaying(false)}
        />
       // <VideoView
       //   style={styles.customStyle}
       //   player={player} 
       //   allowsFullscreen 
       //   allowsPictureInPicture 
       //   nativeControls
       // />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsPlaying(!isPlaying)}
          className="relative flex flex-col items-center justify-center"
        >
          <ImageBackground
            source={{ uri: Item.thumbnail }}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="absolute h-12 w-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts = [] }: { posts: Post[] }) => {
  const [activeItem, setactiveItem] = useState(posts[0]);

  const viewableItemsChanged = useCallback(
    ({
      viewableItems,
    }: {
      viewableItems: Array<{ item: Post }>;
    }) => {
      if (viewableItems.length > 0) {
        setactiveItem(viewableItems[0].item);
      }
    },
    [] // Empty dependency array ensures the function reference is stable
  );

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} Item={item}></TrendingItem>
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
    />
  );
};

export default Trending;


