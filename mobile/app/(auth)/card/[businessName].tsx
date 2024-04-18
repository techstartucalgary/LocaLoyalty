import {
	View,
	Text,
	Image,
	FlatList,
	Pressable,
	ActivityIndicator,
	ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import SmallStamp from "../../../assets/images/smallStamp";
import SmallEmptyStamp from "../../../assets/images/smallEmptyStamp";
import { useWalletStore } from "../../../utils/walletStore";
import ExtraSmallStamp from "../../../assets/images/extraSmallStamp";
import { useAuth } from "@clerk/clerk-expo";
import { fetchAPI } from "../../../utils/generalAxios";
import { useQuery } from "@tanstack/react-query";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Linking from "expo-linking";
import { TouchableOpacity } from "react-native-gesture-handler";

const RewardsSection = () => {
	const { getToken, isLoaded, isSignedIn } = useAuth();
	const { currentBusinessID } = useWalletStore();

	const fetchRewards = async () => {
		return fetchAPI(
			`${process.env.EXPO_PUBLIC_NGROK}/customer/rewards/${currentBusinessID}`,
			"GET",
			await getToken(),
			null,
			{}
		);
	};

	const { data, isError, fetchStatus } = useQuery({
		queryKey: ["rewards"],
		queryFn: fetchRewards,
	});

	const rewards: {
		reward_id: number;
		title: string;
		requiredStamps: number;
	}[] = data;

	return (
		<>
			{isError && <Text>Failed to load...</Text>}
			{fetchStatus === "fetching" ? (
				<ActivityIndicator className="pt-16" />
			) : (
				<FlatList
					className="h-full w-full px-[10%] py-4"
					contentContainerStyle={{ paddingBottom: 32 }}
					data={rewards}
					renderItem={({ item }) => {
						return (
							<View
								className="bg-[#EBEBEB] p-3 shadow my-4 rounded-xl flex-row justify-between items-center"
								key={item.reward_id}
							>
								<Text className="text-xl font-semibold">{item.title}</Text>
								<View className="flex-row items-center">
									<Text className="text-2xl font-medium">
										{item.requiredStamps}
									</Text>
									<ExtraSmallStamp className="scale-150 px-4" />
								</View>
							</View>
						);
					}}
				/>
			)}
		</>
	);
};

const Map = ({
	businessLogo,
	businessName,
	location,
	address,
}: {
	businessLogo: string;
	businessName: string;
	location: {
		lat: number;
		lng: number;
	};
	address: string;
}) => {
	const openGoogleMapsWithAddress = async (address: string) => {
		console.log("open attempt");

		const encodedAddress = encodeURIComponent(address);
		const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
		const supported = await Linking.canOpenURL(url);
		if (supported) {
			Linking.openURL(url);
		} else {
			console.error("Can't open Google Maps");
		}
	};

	return (
		<MapView
			className="w-full aspect-square"
			provider={PROVIDER_GOOGLE}
			initialRegion={{
				latitude: location.lat,
				longitude: location.lng,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			}}
		>
			<Marker coordinate={{ latitude: location.lat, longitude: location.lng }}>
				<Callout onPress={() => openGoogleMapsWithAddress(address)}>
					<View className="flex-row items-center p-2">
						<Image
							source={{ uri: businessLogo }}
							className="rounded-lg w-12 h-12"
						/>
						<Text className="text-xl font-bold pl-2 underline">
							{businessName}
						</Text>
					</View>
				</Callout>
			</Marker>
		</MapView>
	);
};

const DetailsSection = ({
	currentBusinessName,
	currentBusinessAddress,
	currentBusinessDescription,
	currentBusinessLogo,
}: {
	currentBusinessName: string;
	currentBusinessAddress: string;
	currentBusinessDescription: string;
	currentBusinessLogo: string;
}) => {
	console.log(currentBusinessAddress);
	console.log(
		`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
			currentBusinessAddress
		)}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
	);

	const fetchCoordinates = async () => {
		return fetchAPI(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
				currentBusinessAddress
			)}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`,
			"GET",
			null,
			null,
			{}
		);
	};

	const { data, isError, fetchStatus } = useQuery({
		queryKey: ["rewards"],
		queryFn: fetchCoordinates,
	});

	return (
		<ScrollView
			className="h-full px-[10%] pt-4"
			contentContainerStyle={{ paddingBottom: 64 }}
		>
			<Text className="text-lg font-semibold pb-2">
				About {currentBusinessName}
			</Text>
			<Text className="pb-8">{currentBusinessDescription}</Text>
			{isError && data.results && data.results.length > 0 && (
				<Text>Failed to load map...</Text>
			)}
			{fetchStatus === "fetching" ? (
				<ActivityIndicator className="pt-16" />
			) : (
				<Map
					businessLogo={currentBusinessLogo}
					businessName={currentBusinessName}
					location={data.results[0].geometry.location}
					address={currentBusinessAddress}
				/>
			)}
		</ScrollView>
	);
};

const LoyaltyCardPage = () => {
	const {
		currentBusinessName,
		currentBusinessAddress,
		currentBusinessLogo,
		currentBusinessEmail,
		currentBusinessPhone,
		currentBusinessDescription,
		currentCompletedStamps,
		currentMaxStamps,
		currentPrimaryColor,
		currentCarry_over_amt,
		currentSpending_per_point,
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

	const stampArray = []; // Boolean array representing if completed stamp or not

	for (let i = 0; i < currentCompletedStamps; i++) {
		stampArray.push(true);
	}

	for (let i = 0; i < currentMaxStamps - currentCompletedStamps; i++) {
		stampArray.push(false);
	}

	return (
		<View className="w-full h-full ">
			<View
				style={{ backgroundColor: currentPrimaryColor }}
				className="w-full h-1/4 pt-[25%] rounded-b-[40px] "
			></View>
			<View className="px-[10%] -mt-20">
				<View className="w-full border-2 rounded-xl">
					<View className="items-center px-6 bg-[#F7F8F8] rounded-xl">
						<View className="flex-row pt-5 w-full items-center">
							<Image
								source={{ uri: currentBusinessLogo }}
								className="rounded-lg w-16 h-16"
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

			<View className="py-4 px-[10%]">
				<View className="flex-row justify-between w-full">
					<Text>Your Progress:</Text>
					<Text className="text-[#7B7B7B]">{`$${currentCarry_over_amt} / $${currentSpending_per_point}`}</Text>
				</View>
				<View className="w-full py-1">
					<View className="relative w-full h-3 border border-[#999999] rounded-full">
						<View
							style={{
								backgroundColor: currentPrimaryColor,
								width: `${
									(currentCarry_over_amt / currentSpending_per_point) * 100
								}%`,
							}}
							className="absolute h-full rounded-full"
						></View>
					</View>
				</View>
				<View className="flex-row justify-between w-full">
					<Text>{`$${currentCarry_over_amt}`}</Text>
					<Text>{`$${currentSpending_per_point}`}</Text>
				</View>
			</View>

			<View className="flex-row px-[5%] w-full">
				<Pressable
					onPress={handleRewardButtonPress}
					disabled={!isDetailsSelected}
					style={({ pressed }) => [
						{
							opacity: pressed ? 0.5 : 1.0,
							flex: 1,
							paddingVertical: 4,
							borderStyle: "solid",
							borderColor: isDetailsSelected ? "#B1B1B1" : currentPrimaryColor,
							borderWidth: 2,
							backgroundColor: pressed ? "#B1B1B1" : "transparent",
						},
					]}
				>
					<View className="w-full justify-center items-center">
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
							paddingVertical: 4,
							borderStyle: "solid",
							borderColor: isDetailsSelected ? currentPrimaryColor : "#B1B1B1",
							borderWidth: 2,
							backgroundColor: pressed ? "#B1B1B1" : "transparent",
						},
					]}
				>
					<View className="w-full justify-center items-center">
						<Text className="text-lg">Details</Text>
					</View>
				</Pressable>
			</View>

			{isDetailsSelected ? (
				<DetailsSection
					currentBusinessAddress={currentBusinessAddress}
					currentBusinessName={currentBusinessName}
					currentBusinessDescription={currentBusinessDescription}
					currentBusinessLogo={currentBusinessLogo}
				/>
			) : (
				<RewardsSection />
			)}
		</View>
	);
};

export default LoyaltyCardPage;
