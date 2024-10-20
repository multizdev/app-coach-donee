import React, { ReactElement, useState, useRef } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Dimensions,
  ViewStyle,
  View,
  TouchableOpacity,
} from "react-native";
import {
  COLOR_AQUA,
  COLOR_BLUE,
  COLOR_DARK_BLUE,
  COLOR_YELLOW,
} from "@src/modules/common/constants";
import ActivityCard from "@src/modules/users/components/elements/activities/ActivityCard";
import useActivities from "@src/modules/common/hooks/useActivities";
import { Activity } from "@server/database/models/Activity";
import { AntDesign } from "@expo/vector-icons"; // For the arrow icons

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

function ActivitiesList(): ReactElement {
  const { services } = useActivities();
  const flatListRef = useRef<FlatList<Activity>>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const getColorByIndex = (index: number) => {
    const colors = [COLOR_YELLOW, COLOR_BLUE, COLOR_AQUA];
    return colors[index % colors.length];
  };

  const flatListStyle: ViewStyle = {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<Activity>) => (
    <ActivityCard item={item} index={index} color={getColorByIndex(index)} />
  );

  const handleNext = () => {
    if (currentIndex < services.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* FlatList with services */}
      <FlatList
        ref={flatListRef}
        data={services}
        horizontal={true}
        pagingEnabled={true}
        keyExtractor={(item, index) => item.name + index}
        renderItem={renderItem}
        style={flatListStyle}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / SCREEN_WIDTH,
          );
          setCurrentIndex(newIndex);
        }}
      />

      {/* Left Indicator */}
      {currentIndex > 0 && (
        <TouchableOpacity
          style={{ elevation: 4 }}
          className="bg-white rounded-full  absolute top-[50%] left-[10] z-10 transform -translate-y-25"
          onPress={handlePrev}
        >
          <AntDesign name="leftcircle" size={50} color={COLOR_DARK_BLUE} />
        </TouchableOpacity>
      )}

      {/* Right Indicator */}
      {currentIndex < services.length - 1 && (
        <TouchableOpacity
          style={{ elevation: 4 }}
          className="bg-white rounded-full absolute top-[50%] right-[10] z-10 transform -translate-y-25"
          onPress={handleNext}
        >
          <AntDesign name="rightcircle" size={50} color={COLOR_DARK_BLUE} />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default ActivitiesList;
