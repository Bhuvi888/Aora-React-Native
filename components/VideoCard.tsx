import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { icons, images } from "@/constants";
import VideoPlayer from "./VideoPlayer";

interface VideoCardProps {
  title: string;
  creator: {
    username: string;
    avatar: string;
  };

  thumbnail: string;
  video: string;
}

const VideoCard: React.FC<{ video: VideoCardProps }> = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}) => {
  console.log(video)
  const [play, setplay] = useState(false);
  return (
    
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] border border-secondary rounded-lg justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center gap-y-1 flex-1 ml-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-gray-100 text-xs  font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {play ? (
        //<View className="mb-4 h-[250px] bg-black-200">
        <VideoPlayer
          className="h-60 w-full"
          source={video}
          onVideoEnd={() => setplay(false)}
        />
      //</View>
      ) : (
        <TouchableOpacity className="w-full h-60 relative justify-center items-center mt-3"
        activeOpacity={0.7}
        onPress={()=> setplay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full mt-3 rounded-xl"
            resizeMode="cover"
          />
          <Image
          source={icons.play}
          className="w-[50px] h-[50px] absolute"
          resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
