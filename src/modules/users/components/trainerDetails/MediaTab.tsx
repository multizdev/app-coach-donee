import React, { ReactElement, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";

const videoSource =
  "https://firebasestorage.googleapis.com/v0/b/fitlov---production.appspot.com/o/AOJSY3dwRHMlNZOCNnq0eQjy8u73%2FDonne%20running%20Routine.mp4?alt=media&token=e7b6f708-8546-483d-80f6-46f171a34e79#t=0.5";

function MediaTab(): ReactElement {
  const [isPlaying, setIsPlaying] = useState(true);
  const player = useVideoPlayer(videoSource, (playerInstance) => {
    playerInstance.loop = true;
    playerInstance.volume = 0;
    playerInstance.play();
  });

  useEffect(() => {
    if (player) {
      const subscription = player.addListener(
        "playingChange",
        (newIsPlaying) => {
          setIsPlaying(newIsPlaying);
        },
      );

      return () => {
        subscription.remove();
      };
    }
  }, [player]);

  return (
    <ScrollView contentContainerClassName="py-4">
      <View className="flex-row flex-wrap p-4 gap-4">
        <View className="w-[45%] rounded-3xl overflow-hidden bg-black">
          <VideoView
            style={{ width: "100%", height: 200 }}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default MediaTab;
