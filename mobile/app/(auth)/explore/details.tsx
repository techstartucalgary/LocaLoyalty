import { View, Text, Image, FlatList, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useExploreStore } from "../../../utils/exploreStore";


const ExploreDetails = () => {

    const { currentExploreImage, currentExploreDescription } = useExploreStore();



    return (
        <View className="bg-white pt-28">
            <View className="h-full w-full">
                <View className="w-full flex-1">
                    <Image source={{ uri: currentExploreImage }} className="w-full h-full" />
                </View>
                <View className="w-full flex-1 items-center p-6">
                    <Text className="text-center text-[#464646] text-lg pt-2">Store Description</Text>
                    <Text className="text-center text-[#7E7E7E] pt-4">{currentExploreDescription}</Text>
                    <TouchableOpacity className="pt-8">
                        <Text className="text-[#433C99] text-lg">+ Add to your Wallet</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

export default ExploreDetails;
