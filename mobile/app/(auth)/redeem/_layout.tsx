import { Link, Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useExploreStore } from "../../../utils/exploreStore";

const RedeemHeader = () => {

    return (
        <View className="pt-16 pb-5 gap-8 items-center px-12">
            <View className="flex flex-row w-full justify-between">
                <Pressable>
                    <Ionicons name="person-outline" size={24} color={"#000"} />
                </Pressable>
            </View>
        </View>
    );
};


export default function RedeemPage() {


    return (
        <Stack screenOptions={{
            headerTransparent: true
        }}>
            <Stack.Screen
                name="index"
                options={{
                    header: () => <RedeemHeader />,
                }}
            />
        </Stack>
    );
}
