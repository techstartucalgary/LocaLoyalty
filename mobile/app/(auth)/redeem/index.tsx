import { View, Text, Image, FlatList, Pressable, ActivityIndicator } from "react-native";
import { cardData } from "../../../content/temp-card-data";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { useExploreStore } from "../../../utils/exploreStore";
import { fetchAPI } from "../../../utils/generalAxios";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";


const RedeemCard = () => {


    return (
        <View className="pb-10">
            <TouchableOpacity onPress={() => {
            }}>
                <View className="h-20 w-full rounded-md" style={{ backgroundColor: "#e1e4e8", shadowOffset: { width: 0, height: 4 }, shadowColor: "#000000", shadowOpacity: 0.4, shadowRadius: 4, elevation: 20 }}>
                    {/* <Image source={{ uri: businessImage }} className="h-full" style={{ resizeMode: "cover", backgroundColor: "#e1e4e8" }} /> */}
                </View>
            </TouchableOpacity>
        </View>
    )
}

const RedeemList = () => {

    const { getToken } = useAuth()


    const fetchVendors = async () => {
        return fetchAPI(
            "https://79e0-184-64-97-78.ngrok-free.app/customer/vendors",
            "GET",
            await getToken(),
            null,
            {}
        );
    }


    const { data, isLoading, isError, refetch, isRefetching } = useQuery({ queryKey: ["vendors"], queryFn: fetchVendors })


    const [refreshing, setRefreshing] = useState(false)

    async function handleRefresh() {
        setRefreshing(true)
        await refetch()
        setRefreshing(false)
    }

    const vendorData: {
        vendor_id: number;
        name: string;
        business_image: string;
        description: string;
    }[] = data

    return (
        <View className="items-center h-full w-full">
            {isError && <Text>Failed to load...</Text>}
            {isLoading || isRefetching ? (<ActivityIndicator className="pt-16" />) :
                (<FlatList
                    className="h-full w-full px-12 pt-6"
                    data={vendorData}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    contentContainerStyle={{ paddingBottom: 400 }}
                    renderItem={({ item }) => {
                        return (
                            <RedeemCard
                                key={item.vendor_id}
                            />
                        );
                    }}
                />)}
        </View>
    )
}

const Redeem = () => {

    return (
        <View className="h-full w-full bg-[#F7F8F8]">
            <View className="bg-[#9FBAFF] w-full h-52 pt-28 mb-24 rounded-b-[40px]" >
                <View className="h-full px-16">
                    <View className="bg-[#FFF9F3] w-full h-36 px-8 py-6 rounded-xl">
                        <Text className="text-center text-2xl text-[#153463] font-semibold">See All of Your Redeemable Rewards Here</Text>
                    </View>
                </View>
            </View>
            <View className="px-12">
                <Text className="text-2xl font-semibold">Ready to Redeem</Text>
            </View>
            <RedeemList />
        </View>
    );
}

export default Redeem;