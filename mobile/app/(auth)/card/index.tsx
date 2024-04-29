import {
	View,
	Text,
	Image,
	FlatList,
	Pressable,
	ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import Stamp from "../../../assets/images/stamp";
import EmptyStamp from "../../../assets/images/emptyStamp";
import { AntDesign } from "@expo/vector-icons";
import { useWalletStore } from "../../../utils/walletStore";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fetchAPI } from "../../../utils/generalAxios";

type Card = {
	businessID: number;
	businessName: string;
	businessAddress: string;
	businessLogo: string;
	businessDesc: string;
	businessEmail: string;
	businessPhone: string;
	completedStamps: number;
	maxStamps: number;
	primaryColor: string;
	color2: string;
	color3: string;
	spending_per_point: string;
	carry_over_amt: number;
	loyalty_id: number;
};

const Card = ({
	businessID,
	businessName,
	businessAddress,
	businessLogo,
	businessEmail,
	businessPhone,
	businessDesc,
	completedStamps,
	maxStamps,
	primaryColor,
	color2,
	color3,
	carry_over_amt,
	spending_per_point,
	loyalty_id,
}: Card) => {
	const {
		setCurrentBusinessID,
		setCurrentBusinessName,
		setCurrentBusinessAddress,
		setCurrentBusinessLogo,
		setCurrentBusinessEmail,
		setCurrentBusinessPhone,
		setCurrentBuisnessDescription,
		setCurrentCompletedStamps,
		setCurrentMaxStamps,
		setCurrentPrimaryColor,
		setCurrentColor2,
		setCurrentColor3,
		setCurrentCarry_over_amt,
		setCurrentSpending_per_point,
		setCurrentLoyaltyID,
	} = useWalletStore();

	function handleCardClick(cardPressed: Card) {
		setCurrentBusinessID(cardPressed.businessID);
		setCurrentBusinessName(cardPressed.businessName);
		setCurrentBusinessAddress(cardPressed.businessAddress);
		setCurrentBusinessLogo(cardPressed.businessLogo);
		setCurrentBusinessEmail(cardPressed.businessEmail);
		setCurrentBusinessPhone(cardPressed.businessPhone);
		setCurrentBuisnessDescription(cardPressed.businessDesc);
		setCurrentCompletedStamps(cardPressed.completedStamps);
		setCurrentMaxStamps(cardPressed.maxStamps);
		setCurrentPrimaryColor(cardPressed.primaryColor);
		setCurrentColor2(cardPressed.color2);
		setCurrentColor3(cardPressed.color3);
		setCurrentCarry_over_amt(cardPressed.carry_over_amt);
		setCurrentSpending_per_point(parseFloat(cardPressed.spending_per_point));
		setCurrentLoyaltyID(cardPressed.loyalty_id);
	}

	const slug: string = `./card/${businessName}`;
	const stampArray = []; // Boolean array representing if completed stamp or not

	for (let i = 0; i < completedStamps; i++) {
		stampArray.push(true);
	}

	for (let i = 0; i < maxStamps - completedStamps; i++) {
		stampArray.push(false);
	}

	return (
		<View className="py-2">
			<Link href={slug} className="w-full rounded-xl" asChild>
				<TouchableOpacity
					onPress={() => {
						handleCardClick({
							businessID: businessID,
							businessName: businessName,
							businessAddress: businessAddress,
							businessLogo: businessLogo,
							businessEmail: businessEmail,
							businessPhone: businessPhone,
							businessDesc: businessDesc,
							completedStamps: completedStamps,
							maxStamps: maxStamps,
							primaryColor: primaryColor,
							color2: color2,
							color3: color3,
							carry_over_amt: carry_over_amt,
							spending_per_point: spending_per_point,
							loyalty_id: loyalty_id,
						});
					}}
				>
					<View
						style={{ backgroundColor: color2 }}
						className="h-full w-full shadow border-2 flex-1 rounded-xl py-2"
					>
						<View style={{ backgroundColor: color2 }} className="flex-1 items-center px-4">
							<View className="flex-row px-4 py-6 w-full items-center">
								<Image
									source={{ uri: businessLogo }}
									className="rounded-lg w-16 h-16"
									style={{ backgroundColor: "#e1e4e8" }}
								/>
								<Text style={{ color: primaryColor }} className="text-3xl font-bold text-center flex-1">
									{businessName}
								</Text>
							</View>
							<FlatList
								data={stampArray}
								renderItem={({ item }) => {
									if (item) {
										return <View style={{ backgroundColor: primaryColor }} className="rounded-full p-[6px] mx-1"><Stamp color={color3} /></View>;
									} else {
										return <View className="pl-2"><EmptyStamp /></View>
									}
								}}
								className="w-full py-2"
								horizontal={true}
								contentContainerStyle={{ alignItems: "center" }}
							></FlatList>
							<View className="flex-row gap-6 py-4">
								<View className="flex-row">
									<AntDesign name="phone" size={16} color={primaryColor} />
									<Text style={{ color: primaryColor }} className="text-xs font-semibold pl-1">
										{businessPhone}
									</Text>
								</View>
								<View className="flex-row">
									<AntDesign name="mail" size={16} color={primaryColor} />
									<Text style={{ color: primaryColor }} className="text-xs font-semibold pl-1">
										{businessEmail}
									</Text>
								</View>
							</View>
						</View>
					</View>
				</TouchableOpacity>
			</Link>
		</View >
	);
};

const CardList = () => {
	const { getToken } = useAuth();
	const { setWalletRefetchFunc } = useWalletStore();

	const fetchLoyaltyCards = async () => {
		return fetchAPI(
			process.env.EXPO_PUBLIC_NGROK + "/customer/loyalty-cards",
			"GET",
			await getToken(),
			null,
			{}
		);
	};

	const { data, isLoading, isError, refetch, isRefetching } = useQuery({
		queryKey: ["loyaltyCards"],
		queryFn: fetchLoyaltyCards,
	});

	// Set refetch func for loyalty cards in global state
	useEffect(() => {
		setWalletRefetchFunc(refetch);
	}, [refetch]);

	const [refreshing, setRefreshing] = useState(false);

	async function handleRefresh() {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	}

	const cardData: {
		name: string;
		email: string;
		address: string;
		phone: string;
		color: string;
		color2: string;
		color3: string;
		max_points: number;
		spending_per_point: string;
		business_logo: string;
		desc: string;

		points_amt: number;
		carry_over_amt: number;
		vendor_id: number;
		loyalty_id: number;
	}[] = data;

	console.log(`cardData`, cardData);


	return (
		<View className="items-center h-full w-full">
			{isError && <Text>Failed to load...</Text>}
			{isLoading || isRefetching ? (
				<ActivityIndicator className="pt-16" />
			) : (
				<FlatList
					className="w-full px-6 pt-6 mb-16"
					data={cardData}
					contentContainerStyle={{ paddingBottom: 200 }}
					refreshing={refreshing}
					onRefresh={handleRefresh}
					renderItem={({ item }) => {
						return (
							<Card
								key={item.name}
								businessID={item.vendor_id}
								businessName={item.name}
								businessEmail={item.email}
								businessAddress={item.address}
								businessPhone={item.phone}
								businessLogo={item.business_logo}
								businessDesc={item.desc}
								completedStamps={item.points_amt} // Get the number of completed stamps for this user
								maxStamps={item.max_points}
								primaryColor={item.color}
								color2={item.color2}
								color3={item.color3}
								spending_per_point={item.spending_per_point}
								carry_over_amt={item.carry_over_amt}
								loyalty_id={item.loyalty_id}
							/>
						);
					}}
				/>
			)}
		</View>
	);
};

const Wallet = () => {
	return (
		<View className="h-full w-full bg-[#F7F8F8]">
			<View className="w-full bg-[#9FBAFF] pb-8 h-52 rounded-b-[40px] pt-32 px-8">
				<Text className="text-[#091540] text-2xl font-semibold text-left">
					Your Cards
				</Text>
			</View>
			<CardList />
		</View>
	);
};

export default Wallet;
