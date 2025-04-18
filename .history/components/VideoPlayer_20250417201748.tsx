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
    player.play().catch((err) => console.error("Video play error:", err));
  });

  const videoCallbacks = {
    ended: onVideoEnd,
  };

  if (source.uri.includes("vimeo.com")) {
    const videoId = source.uri
      .split("/")
      [source.uri.split("/").length - 1].split("?")[0];

    return (
      <View style={styles.container}>
        <Vimeo
          style={styles.video}
          videoId={videoId}
          params="autoplay=true"
          handlers={videoCallbacks}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {player ? (
        <VideoView player={player} style={styles.video} />
      ) : (
        <View style={styles.fallback} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 300,
    backgroundColor: "black",
    borderRadius: 16,
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  fallback: {
    flex: 1,
    backgroundColor: "#000",
  },
});
