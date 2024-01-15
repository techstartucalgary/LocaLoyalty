import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { cardData } from "../../content/temp-card-data";

const Card = ({
	businessName,
	businessImage,
}: {
	businessName: string;
	businessImage: any;
}) => {
	return (
		<View className="w-1/2 flex-initial p-2">
			<View className="border rounded-md p-2 flex-row">
				<View className="w-1/3 border-r">
					<Text className="text-xs">{businessName}</Text>
					<Image source={businessImage} />
				</View>
				<View className="w-2/3">
					<Text>Hello</Text>
				</View>
			</View>
		</View>
	);
};

const Wallet = () => {
	const { user } = useUser();

	return (
		<View className="bg-[#F7F8F8]">
			<View className="flex-row bg-[#F7F8F8] rounded-lg p-4">
				<View className="bg-[#266055] rounded-3xl p-4">
					<Text className="text-white text-lg">Your Cards</Text>
				</View>
			</View>
			<View className="h-full w-full flex-row flex-wrap p-4">
				{cardData.map((card) => {
					return (
						<Card
							businessName={card.businessName}
							businessImage={card.businessImage}
						/>
					);
				})}
			</View>
		</View>
	);
};

export default Wallet;
