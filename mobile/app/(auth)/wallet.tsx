import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { cardData } from "../../content/temp-card-data";

const Card = ({
	businessName,
	businessImage,
	primaryColor,
}: {
	businessName: string;
	businessImage: any;
	primaryColor: string;
}) => {
	const slug: string = `./card/${businessName}`;

	return (
		<View className="h-1/2 flex-initial p-2">
			<View className="h-full border rounded-xl flex-row">
				<Link href={slug} className="w-full rounded-xl">
					<View className="flex-row p-2 w-full">
						<Image source={businessImage} />
						<Text className="text-xs">{businessName}</Text>
					</View>
					{/* <View className="p-2">
						<Image
							source={require("../../assets/images/stamp.svg")}
							className=""
						/>
					</View> */}
				</Link>
			</View>
		</View>
	);
};

const Wallet = () => {
	const { user } = useUser();

	return (
		<View className="bg-[#F7F8F8]">
			<View className="h-full w-full p-4">
				{cardData.map((card) => {
					return (
						<Card
							key={card.businessName}
							businessName={card.businessName}
							businessImage={card.businessImage}
                            primaryColor={card.primaryColor}
						/>
					);
				})}
			</View>
		</View>
	);
};

export default Wallet;
