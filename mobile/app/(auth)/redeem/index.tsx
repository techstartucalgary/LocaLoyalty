import { View, Text, Image, FlatList, Pressable, ActivityIndicator, Modal } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fetchAPI } from "../../../utils/generalAxios";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const RedeemCard = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View className="pb-10">
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}>
                <TouchableOpacity
                    className="w-full h-full"
                    onPress={() => setModalVisible(false)}
                >
                    <View className="flex flex-1 justify-center items-center bg-black/75 ">
                        <TouchableOpacity
                            className="mx-12 bg-white rounded-lg pt-6 px-8 items-center"
                            activeOpacity={1}
                        >
                            <View className="w-full items-center">
                                <Text className="text-2xl font-bold text-[#153463]">To Redeem</Text>
                                <Text className="text-lg font-medium text-[#153463]">Pineapple Bun</Text>
                                <Text className="text-lg italic font-semibold text-[#ACACAC]">Zhang's Bakery</Text>
                                <View className="flex-row items-start pt-2 px-4">
                                    <View className="p-2">
                                        <Ionicons name="warning-outline" size={24} color={"#000"} />
                                    </View>
                                    <Text className="text-lg">Please confirm that the store approves of this redemption. Once you redeem the stamp at this store, it will be permanently removed from your Ready to Redeem Rewards.</Text>
                                </View>
                                <View className="pt-2 w-full flex-row justify-between">
                                    <TouchableOpacity className="w-28 bg-[#9C3232] px-4 py-2 rounded-full" onPress={() => setModalVisible(false)}>
                                        <Text className="text-center text-white text-lg">Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity className="w-28 bg-[#81DA8A] px-4 py-2 rounded-full" onPress={() => setModalVisible(false)}>
                                        <Text className="text-center text-white text-lg">Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View className="h-20 w-full rounded-md" style={{ backgroundColor: "#e1e4e8", shadowOffset: { width: 0, height: 4 }, shadowColor: "#000000", shadowOpacity: 0.4, shadowRadius: 4, elevation: 20 }}>
                    {/* <Image source={{ uri: businessImage }} className="h-full" style={{ resizeMode: "cover", backgroundColor: "#e1e4e8" }} /> */}
                </View>
            </TouchableOpacity>
        </View>
    )
}

const RedeemList = () => {

    const { getToken } = useAuth()


    const fetchRedeemables = async () => {
        return fetchAPI(
            "https://79e0-184-64-97-78.ngrok-free.app/customer/redeemables",
            "GET",
            await getToken(),
            null,
            {}
        );
    }


    const { data, isLoading, isError, refetch, isRefetching } = useQuery({ queryKey: ["redeemables"], queryFn: fetchRedeemables })


    const [refreshing, setRefreshing] = useState(false)

    async function handleRefresh() {
        setRefreshing(true)
        await refetch()
        setRefreshing(false)
    }

    const redeemableData: {
        vendor_id: number;
        name: string;
        business_image: string;
        description: string;
    }[] = data

    console.log(`data`, data);


    return (
        <View className="items-center h-full w-full">
            {/* {isError && <Text>Failed to load...</Text>}
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
                />)} */}
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