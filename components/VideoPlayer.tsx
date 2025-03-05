import { StyleSheet, View } from "react-native";
import { Vimeo } from "react-native-vimeo-iframe";
import { useVideoPlayer, VideoView } from "expo-video";

type VideoPlayerProps = {
  className?: string;
  source: { uri: string };
  onVideoEnd: () => void;
};

export default function VideoPlayer({
  className,
  source,
  onVideoEnd,
}: VideoPlayerProps) {
  const player = useVideoPlayer(source, (player) => {
    player.loop = false;
    player.addListener("playToEnd", onVideoEnd);
    player.play();
  });
  const videoCallbacks = {
    ended: onVideoEnd,
  };

  // check if the source is a valid vimeo video url or appwrite storage url
  if (source.uri.includes("vimeo.com")) {
    const videoId = source.uri
      .split("/")
      [source.uri.split("/").length - 1].split("?")[0];

    return (
      <View className={`rounded-lg bg-black ${className}`}>
        <Vimeo
          
          style={{ backgroundColor: "black" }}
          startInLoadingState
          videoId={videoId}
          params="autoplay=true"
          handlers={videoCallbacks}
          
        />
      </View>
    );
  } else {
    return (
      
        <VideoView player={player} style={styles.video} />
      
    );
  }
}

const styles = StyleSheet.create(
{
  video:{
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: 'black',
  }
}

)