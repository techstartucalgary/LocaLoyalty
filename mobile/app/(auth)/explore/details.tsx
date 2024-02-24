import { View, Text, Image, FlatList, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useExploreStore } from "../../../utils/exploreStore";
import { useMutation } from "@tanstack/react-query";
import { fetchAPI } from "../../../utils/generalAxios";
import { useAuth } from "@clerk/clerk-expo";


const ExploreDetails = () => {

    const { refetchFunc, currentExploreVendorID, currentExploreImage, currentExploreDescription } = useExploreStore();

    const { getToken } = useAuth()

    const addLoyaltyCard = async () => {
        return fetchAPI(
            "https://79e0-184-64-97-78.ngrok-free.app/customer/add-loyalty-card",
            "POST",
            await getToken(),
            {
                vendor_id: currentExploreVendorID,
            },
            {
                /* headers (if necessary) */
            }
        );
    }

    const [disableButton, setDisableButton] = useState(false)

    const addCardMutation = useMutation({
        mutationFn: addLoyaltyCard,
        onSuccess: () => {
            refetchFunc()
        },
        onError: () => {
            setDisableButton(false)
        }
    })


    return (
        <View className="bg-white pt-28">
            <View className="h-full w-full">
                <View className="w-full flex-1">
                    <Image source={{ uri: currentExploreImage }} className="w-full h-full" />
                </View>
                <View className="w-full flex-1 items-center p-6">
                    <Text className="text-center text-[#464646] text-lg pt-2">Store Description</Text>
                    <Text className="text-center text-[#7E7E7E] pt-4">{currentExploreDescription}</Text>
                    <TouchableOpacity disabled={disableButton} className="pt-8" onPress={() => {
                        setDisableButton(true)
                        addCardMutation.mutate()
                    }}>
                        <Text className="text-[#433C99] text-lg">+ Add to your Wallet</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

export default ExploreDetails;
