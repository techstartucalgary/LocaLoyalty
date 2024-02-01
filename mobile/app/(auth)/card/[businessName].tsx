import { View, Text, Image, FlatList, Pressable } from "react-native";
import React, { useState } from "react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { cardData } from "../../../content/temp-card-data";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Stamp from "../../../assets/images/stamp";
import EmptyStamp from "../../../assets/images/emptyStamp";
import SmallStamp from "../../../assets/images/smallStamp";
import SmallEmptyStamp from "../../../assets/images/smallEmptyStamp";
import { useWalletStore } from "../../../utils/walletStore";
import ExtraSmallStamp from "../../../assets/images/extraSmallStamp";
import { TouchableOpacity } from "react-native-gesture-handler";


const BusinessCardPage = () => {
	const {
		currentBusinessName,
		currentBusinessImage,
		currentBusinessDescription,
		currentCompletedStamps,
		currentMaxStamps,
		currentPrimaryColor,
	} = useWalletStore();

	const [ isDetailsSelected, setDetailsSelected ] = useState<boolean>(false);

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
	// TODO: GET THE LIST OF REWARDS (SHOULD BE PRESORTED)
	type Reward = {
		rewardName: string;
		rewardStampCost: number;
	};
	const rewards: Reward[] = [
		{
			rewardName: "Free Pineapple Bun",
			rewardStampCost: 3,
		},
		{
			rewardName: "Free BBQ Pork Bun",
			rewardStampCost: 3,
		},
		{
			rewardName: "Free Roll Cake",
			rewardStampCost: 10,
		},
	];

	const fullStamps = [];
	const emptyStamps = [];

	for (let i = 0; i < currentCompletedStamps; i++) {
		fullStamps.push(<SmallStamp key={i} color={"#000"} />);
	}

	for (let i = 0; i < currentMaxStamps - currentCompletedStamps; i++) {
		emptyStamps.push(<SmallEmptyStamp key={i} />);
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
							<View className="flex-row w-full justify-between py-4">
								{fullStamps}
								{emptyStamps}
							</View>
							<View className="flex-row gap-2 py-4">
								<View className="flex-row">
									<AntDesign name="phone" size={16} color="black" />
									<Text className="text-xs font-semibold pl-1">
										000-000-0000
									</Text>
								</View>
								<View className="flex-row">
									<AntDesign name="mail" size={16} color="black" />
									<Text className="text-xs font-semibold pl-1">
										businessname@gmail.com
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
					<Text className="text-lg font-semibold pb-2">About {currentBusinessName}</Text>
					<Text>{currentBusinessDescription}</Text>
				</View>
			) : (
				<FlatList
					className="h-full w-full px-12 py-4"
					data={rewards}
					renderItem={({ item }) => {
						return (
							<View className="bg-[#EBEBEB] p-3 shadow my-4 rounded-xl flex-row justify-between items-center">
								<Text className="text-xl font-semibold">{item.rewardName}</Text>
								<View className="flex-row items-center">
									<Text className="text-2xl font-medium">
										{item.rewardStampCost}
									</Text>
									<ExtraSmallStamp className="scale-150 px-4" />
								</View>
							</View>
						);
					}}
				/>
			)}
		</View>
	);
};

export default BusinessCardPage;
