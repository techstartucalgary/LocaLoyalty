import { View, Text, Image, FlatList, Pressable } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { cardData } from "../../content/temp-card-data";
import Stamp from "../../assets/images/stamp";
import EmptyStamp from "../../assets/images/emptyStamp";
import { AntDesign } from "@expo/vector-icons";

type Card = {
	businessName: string;
	businessImage: any;
	completedStamps: number;
	maxStamps: number;
	primaryColor: string;
};

const Card = ({
	businessName,
	businessImage,
	completedStamps,
	maxStamps,
	primaryColor,
}: Card) => {
	const slug: string = `./card/${businessName}`;

	const fullStamps = [];
	const emptyStamps = [];

	for (let i = 0; i < completedStamps; i++) {
		fullStamps.push(<Stamp key={i} color={primaryColor} />);
	}

	for (let i = 0; i < maxStamps - completedStamps; i++) {
		emptyStamps.push(<EmptyStamp key={i} />);
	}

	const borderStyle = `h-full w-full border-2 flex-1 rounded-xl py-2 bg-[${primaryColor}]`;

	return (
		<View className="h-64 flex-1 py-2">
			<Link href={slug} className="h-full w-full rounded-xl" asChild>
				<Pressable>
					<View className={borderStyle}>
						<View className="flex-1 items-center px-4 bg-[#F7F8F8]">
							<View className="flex-row px-4 py-8 w-full">
								<Image source={businessImage} className="basis-1/4" />
								<Text className="basis-3/4 text-3xl font-bold text-center">
									{businessName}
								</Text>
							</View>
							<View className="flex-row gap-2 py-2">
								{fullStamps}
								{emptyStamps}
							</View>
							<View className="flex-row gap-6 py-4">
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
						{/* <View className="p-2">
						<Image
							source={require("../../assets/images/stamp.svg")}
							className=""
						/>
					</View> */}
					</View>
				</Pressable>
			</Link>
		</View>
	);
};

const Wallet = () => {
	const { user } = useUser();

	return (
		<View className="h-full bg-[#F7F8F8]">
			<FlatList
				className="h-full w-full p-6"
				data={cardData}
				renderItem={({ item }) => {
					return (
						<Card
							key={item.businessName}
							businessName={item.businessName}
							businessImage={item.businessImage}
							completedStamps={4} // Get the number of completed stamps for this user
							maxStamps={item.maxStampNumber}
							primaryColor={item.primaryColor}
						/>
					);
				}}
			/>
		</View>
	);
};

export default Wallet;
