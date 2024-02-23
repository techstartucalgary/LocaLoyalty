import { View, Text, Image, FlatList, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useQuery } from "@tanstack/react-query"
import Stamp from "../../../assets/images/stamp";
import EmptyStamp from "../../../assets/images/emptyStamp";
import { AntDesign } from "@expo/vector-icons";
import { useWalletStore } from "../../../utils/walletStore";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fetchAPI } from "../../../utils/generalAxios";

type Card = {
	businessID: number;
	businessName: string;
	businessLogo: string;
	businessDesc: string;
	businessEmail: string;
	businessPhone: string;
	completedStamps: number;
	maxStamps: number;
	primaryColor: string;
	spending_per_point: string;
	carry_over_amt: number;
};

const Card = ({
	businessID,
	businessName,
	businessLogo,
	businessEmail,
	businessPhone,
	businessDesc,
	completedStamps,
	maxStamps,
	primaryColor,
	carry_over_amt,
	spending_per_point,
}: Card) => {
	const {
		setCurrentBusinessID,
		setCurrentBusinessName,
		setCurrentBusinessLogo,
		setCurrentBusinessEmail,
		setCurrentBusinessPhone,
		setCurrentBuisnessDescription,
		setCurrentCompletedStamps,
		setCurrentMaxStamps,
		setCurrentPrimaryColor,
		setCurrentCarry_over_amt,
		setCurrentSpending_per_point,
	} = useWalletStore();

	function handleCardClick(cardPressed: Card) {
		setCurrentBusinessID(cardPressed.businessID)
		setCurrentBusinessName(cardPressed.businessName);
		setCurrentBusinessLogo(cardPressed.businessLogo);
		setCurrentBusinessEmail(cardPressed.businessEmail);
		setCurrentBusinessPhone(cardPressed.businessPhone);
		setCurrentBuisnessDescription(cardPressed.businessDesc);
		setCurrentCompletedStamps(cardPressed.completedStamps);
		setCurrentMaxStamps(cardPressed.maxStamps);
		setCurrentPrimaryColor(cardPressed.primaryColor);
		setCurrentCarry_over_amt(cardPressed.carry_over_amt)
		setCurrentSpending_per_point(parseFloat(cardPressed.spending_per_point))
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
							businessLogo: businessLogo,
							businessEmail: businessEmail,
							businessPhone: businessPhone,
							businessDesc: businessDesc,
							completedStamps: completedStamps,
							maxStamps: maxStamps,
							primaryColor: primaryColor,
							carry_over_amt: carry_over_amt,
							spending_per_point: spending_per_point,
						});
					}}
				>
					<View
						style={{ backgroundColor: primaryColor }}
						className="h-full w-full shadow border-2 flex-1 rounded-xl py-2"
					>
						<View className="flex-1 items-center px-4 bg-[#F7F8F8]">
							<View className="flex-row px-4 py-6 w-full items-center">
								<Image
									source={{ uri: businessLogo }}
									className="rounded-lg w-[60px] h-[60px]"
								/>
								<Text className=" text-3xl font-bold text-center flex-1">
									{businessName}
								</Text>
							</View>
							<FlatList
								data={stampArray}
								renderItem={({ item }) => {
									if (item) {
										return <Stamp color={primaryColor} />;
									} else {
										return <EmptyStamp />;
									}
								}}
								className="w-full py-2"
								horizontal={true}
							></FlatList>
							<View className="flex-row gap-6 py-4">
								<View className="flex-row">
									<AntDesign name="phone" size={16} color="black" />
									<Text className="text-xs font-semibold pl-1">
										{businessPhone}
									</Text>
								</View>
								<View className="flex-row">
									<AntDesign name="mail" size={16} color="black" />
									<Text className="text-xs font-semibold pl-1">
										{businessEmail}
									</Text>
								</View>
							</View>
						</View>
					</View>
				</TouchableOpacity>
			</Link>
		</View>
	);
};


const CardList = () => {

	const { getToken } = useAuth()

	const fetchLoyaltyCards = async () => {
		return fetchAPI(
			"https://79e0-184-64-97-78.ngrok-free.app/customer/loyalty-cards",
			"GET",
			await getToken(),
			null,
			{}
		);
	}


	const { data, isLoading, isError, refetch, isRefetching } = useQuery({ queryKey: ["loyaltyCards"], queryFn: fetchLoyaltyCards })

	const [refreshing, setRefreshing] = useState(false)

	async function handleRefresh() {
		setRefreshing(true)
		await refetch()
		setRefreshing(false)
	}


	const cardData: {
		name: string;
		email: string;
		address: string;
		phone: string;
		color: string;
		max_points: number;
		spending_per_point: string;
		business_logo: string;
		desc: string;

		points_amt: number;
		carry_over_amt: number;
		vendor_id: number;
	}[] = data



	return (
		<View className="items-center h-full w-full">
			{isError && <Text>Failed to load...</Text>}
			{isLoading || isRefetching ? (<ActivityIndicator className="pt-16" />) :
				(<FlatList
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
								businessPhone={item.phone}
								businessLogo={item.business_logo}
								businessDesc={item.desc}
								completedStamps={item.points_amt} // Get the number of completed stamps for this user
								maxStamps={item.max_points}
								primaryColor={item.color}
								spending_per_point={item.spending_per_point}
								carry_over_amt={item.carry_over_amt}
							/>
						);
					}}
				/>
				)}
		</View>
	)
};

const Wallet = () => {

	return (
		<View className="h-full w-full bg-[#F7F8F8]">
			<View className="w-full bg-[#9FBAFF] pb-8 h-52 rounded-b-[40px] pt-32 px-8">
				<Text className="text-[#091540] text-3xl font-medium text-left">
					Your Cards
				</Text>
			</View>
			<CardList />
		</View>
	);
}

export default Wallet;
