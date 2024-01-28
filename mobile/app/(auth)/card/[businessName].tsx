import { View, Text, Image, FlatList, Pressable } from "react-native";
import React from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { cardData } from "../../../content/temp-card-data";
import { AntDesign } from "@expo/vector-icons";
import Stamp from "../../../assets/images/stamp";
import EmptyStamp from "../../../assets/images/emptyStamp";


const BusinessCardPage = () => {
	const queryParam = useLocalSearchParams()

	const thisBusiness = cardData.find((business) => business.businessName === queryParam.businessName)
	
	// TODO: GET BUSINESS INFO BY USING ZUSTAND OR STACK NAVIGATION PROP PASSING
	const completedStamps = 2
	const maxStamps = 6
	const primaryColor = "#29524A"

	const fullStamps = [];
	const emptyStamps = [];

	for (let i = 0; i < completedStamps; i++) {
		fullStamps.push(<Stamp factor={0.8} key={i} color={primaryColor} />);
	}

	for (let i = 0; i < maxStamps - completedStamps; i++) {
		emptyStamps.push(<EmptyStamp key={i} />);
	}

	return (
		<View className="w-full h-full pt-48">
			<View className="h-64 px-12">
				<View className="w-full border-2 flex-1 rounded-xl">
					<View className="flex-1 items-center px-6 bg-[#F7F8F8] rounded-xl">
						<View className="flex-row py-4 w-full justify-between items-center">
							<Image source={thisBusiness?.businessImage} className="w-12 h-12" />
							<Text className="text-2xl font-bold text-center">
								{thisBusiness?.businessName}
							</Text>
						</View>
						<View className="flex-row gap-2 py-2">
							{fullStamps}
							{emptyStamps}
						</View>
						<View className="flex-row gap-2 py-4">
							<View className="flex-row">
								<AntDesign name="phone" size={16} color="black" />
								<Text className="text-xs font-semibold pl-1">000-000-0000</Text>
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
			<Link href={"../wallet"}>
				<Text>{queryParam.businessName}</Text>
			</Link>

		</View>
	);
};

export default BusinessCardPage;
