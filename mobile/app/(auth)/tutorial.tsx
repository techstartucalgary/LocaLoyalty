import { View, Text, Image, Button } from "react-native";
import { useEffect } from "react";
import { tutorialData } from "../../content/tutorial-data";
import { useTutorialCounterStore } from "../../utils/store";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";

const Tutorial = () => {
  const { count, maxVal, setMaxVal, increment, decrement } =
    useTutorialCounterStore();

  let dots = [];
  for (let i = 0; i <= maxVal; i++) {
    dots.push(
      <Text key={i} className="mx-1">
        {i === count ? "●" : "○"}
      </Text>
    );
  }

  useEffect(() => {
    setMaxVal(tutorialData.length - 1);
  }, []);

  return (
    <View className="flex-col flex my-auto items-center justify-center">
      <Text className="text-2xl font-bold text-center mb-4">
        {tutorialData[count].title}
      </Text>
      <View className="w-5/6 h-40 flex items-start justify-center">
        <Text className="text-xl text-center">
          {tutorialData[count].description}
        </Text>
      </View>

      <View className="flex flex-row items-center">
        <TouchableOpacity onPress={decrement}>
          <Text className="text-8xl font-bold">&lt;</Text>
        </TouchableOpacity>
        <Image source={tutorialData[count].image} className="h-56 w-56" />
        <TouchableOpacity onPress={increment}>
          <Text className="text-8xl font-bold">&gt;</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row mx-20">{dots}</View>
      <Link href={"/home"} className="mt-5 text-xl">
        <Text>Back to home</Text>
      </Link>
    </View>
  );
};

export default Tutorial;
