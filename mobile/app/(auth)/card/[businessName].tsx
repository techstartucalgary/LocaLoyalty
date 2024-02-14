import { View, Text, Image, FlatList, Pressable } from "react-native";
import React, { useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import SmallStamp from "../../../assets/images/smallStamp";
import SmallEmptyStamp from "../../../assets/images/smallEmptyStamp";
import { useWalletStore } from "../../../utils/walletStore";
import ExtraSmallStamp from "../../../assets/images/extraSmallStamp";
import { useAuth } from "@clerk/clerk-expo";
import { fetchAPI } from "../../../utils/generalAxios";
import { useQuery } from "@tanstack/react-query";

const RewardsSection = () => {

	const { getToken, isLoaded, isSignedIn } = useAuth()
	const { currentBusinessID } = useWalletStore()

	const fetchRewards = async () => {
		return fetchAPI(
			`https://2e04-136-159-213-128.ngrok-free.app/customer/rewards/${currentBusinessID}`,
			"GET",
			await getToken(),
			null,
			{}
		);
	}


	const { data, isLoading, isError } = useQuery({ queryKey: ["rewards"], queryFn: fetchRewards })

	if (!isLoading && !isError) {

		const rewards: {
			reward_id: number;
			vendor_id: number | null;
			name: string | null;
			description: string | null;
			points_cost: number;
		}[] = data


		rewards.sort((a, b) => a.points_cost - b.points_cost)

		return (
			<FlatList
				className="h-full w-full px-12 py-4"
				data={rewards}
				renderItem={({ item }) => {
					return (
						<View className="bg-[#EBEBEB] p-3 shadow my-4 rounded-xl flex-row justify-between items-center">
							<Text className="text-xl font-semibold">{item.name}</Text>
							<View className="flex-row items-center">
								<Text className="text-2xl font-medium">
									{item.points_cost}
								</Text>
								<ExtraSmallStamp className="scale-150 px-4" />
							</View>
						</View>
					);
				}}
			/>
		)
	} else {
		return (
			<View>
				<Text>LOading</Text>
			</View>
		)
	}

}

const LoyaltyCardPage = () => {
	const {
		currentBusinessName,
		currentBusinessImage,
		currentBusinessEmail,
		currentBusinessPhone,
		currentBusinessDescription,
		currentCompletedStamps,
		currentMaxStamps,
		currentPrimaryColor,
	} = useWalletStore();


	const [isDetailsSelected, setDetailsSelected] = useState<boolean>(false);

	function handleDetailButtonPress() {
		if (isDetailsSelected) {
			return;
		}
		setDetailsSelected(true);
	}

	function handleRewardButtonPress() {
		if (!isDetailsSelected) {
			return;
		}
		setDetailsSelected(false);
	}
	// TODO: GET THE CURRENT PROGRESS AND THRESHOLD
	const currentRewardProgress = 3.5;
	const rewardThreshold = 5;

	const stampArray = []; // Boolean array representing if completed stamp or not

	for (let i = 0; i < currentCompletedStamps; i++) {
		stampArray.push(true);
	}

	for (let i = 0; i < currentMaxStamps - currentCompletedStamps; i++) {
		stampArray.push(false);
	}

	return (
		<View className="w-full h-full">
			<View
				style={{ backgroundColor: currentPrimaryColor }}
				className="w-full h-52 pt-28 mb-28 rounded-b-[40px]"
			>
				<View className="h-full px-12">
					<View className="w-full border-2 rounded-xl">
						<View className="items-center px-6 bg-[#F7F8F8] rounded-xl">
							<View className="flex-row pt-5 w-full items-center">
								<Image
									source={currentBusinessImage}
									className="rounded-lg w-[60px] h-[60px]"
								/>
								<Text className="flex-1 text-2xl font-bold text-center">
									{currentBusinessName}
								</Text>
							</View>
							<FlatList
								data={stampArray}
								renderItem={({ item }) => {
									if (item) {
										return <SmallStamp color={"#000"} />;
									} else {
										return <SmallEmptyStamp />;
									}
								}}
								className="w-full py-4"
								horizontal={true}
							></FlatList>
							<View className="flex-row gap-2 py-4">
								<View className="flex-row">
									<AntDesign name="phone" size={16} color="black" />
									<Text className="text-xs font-semibold pl-1">
										{currentBusinessPhone}
									</Text>
								</View>
								<View className="flex-row">
									<AntDesign name="mail" size={16} color="black" />
									<Text className="text-xs font-semibold pl-1">
										{currentBusinessEmail}
									</Text>
								</View>
							</View>
						</View>
					</View>
				</View>
			</View>

			<View className="py-6">
				<View className="flex-row justify-between w-full px-12">
					<Text>Your Progress:</Text>
					<Text className="text-[#7B7B7B]">{`$${currentRewardProgress} / $${rewardThreshold}`}</Text>
				</View>
				<View className="w-full px-12 py-1">
					<View className="relative w-full h-3 border border-[#999999] rounded-full">
						<View
							style={{
								backgroundColor: currentPrimaryColor,
								width: `${(currentRewardProgress / rewardThreshold) * 100}%`,
							}}
							className="absolute h-full rounded-full"
						></View>
					</View>
				</View>
				<View className="flex-row justify-between w-full px-12">
					<Text>{`$${currentRewardProgress}`}</Text>
					<Text>{`$${rewardThreshold}`}</Text>
				</View>
			</View>

			<View className="flex-row h-12 px-10 w-full">
				<Pressable
					onPress={handleRewardButtonPress}
					disabled={!isDetailsSelected}
					style={({ pressed }) => [
						{
							opacity: pressed ? 0.5 : 1.0,
							flex: 1,
							borderStyle: "solid",
							borderColor: isDetailsSelected ? "#B1B1B1" : currentPrimaryColor,
							borderWidth: 2,
							backgroundColor: pressed ? "#B1B1B1" : "transparent",
						},
					]}
				>
					<View className="w-full h-full justify-center items-center">
						<Text className="text-lg">Rewards</Text>
					</View>
				</Pressable>
				<Pressable
					onPress={handleDetailButtonPress}
					disabled={isDetailsSelected}
					style={({ pressed }) => [
						{
							opacity: pressed ? 0.5 : 1.0,
							flex: 1,
							borderStyle: "solid",
							borderColor: isDetailsSelected ? currentPrimaryColor : "#B1B1B1",
							borderWidth: 2,
							backgroundColor: pressed ? "#B1B1B1" : "transparent",
						},
					]}
				>
					<View className="w-full h-full justify-center items-center">
						<Text className="text-lg">Details</Text>
					</View>
				</Pressable>
			</View>

			{isDetailsSelected ? (
				<View className="px-12 py-8">
					<Text className="text-lg font-semibold pb-2">
						About {currentBusinessName}
					</Text>
					<Text>{currentBusinessDescription}</Text>
				</View>
			) : (
				<RewardsSection />
			)}
		</View>
	);
};

export default LoyaltyCardPage;
