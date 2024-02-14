import { Link, Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

const ExploreHeader = () => {

    return (
        <View className="bg-[#9FBAFF] pt-16 pb-8 gap-8 items-center px-12">
            <View className="flex flex-row w-full justify-between">
                <Pressable>
                    <Ionicons name="person-outline" size={24} color={"#000"} />
                </Pressable>
                <Pressable>
                    <Ionicons name="search" size={24} color={"#000"} />
                </Pressable>
            </View>
        </View>
    );
};


export default function ExplorePage() {

    return (
        <Stack screenOptions={{
            headerTransparent: true
        }}>
            <Stack.Screen
                name="index"
                options={{
                    header: () => <ExploreHeader />,
                }}
            />
            <Stack.Screen
                name="details"
                options={{
                    headerTitle: "",
                    headerTintColor: "#000"
                }}
            />
        </Stack>
    );
}
