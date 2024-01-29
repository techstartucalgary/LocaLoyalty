import { View, Text, Image, FlatList, Pressable } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { cardData } from "../../content/temp-card-data";
import Stamp from "../../assets/images/stamp";
import EmptyStamp from "../../assets/images/emptyStamp";
import { AntDesign } from "@expo/vector-icons";
import { useWalletStore } from "../../utils/walletStore";

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
	const {
		setCurrentBusinessName,
		setCurrentBusinessImage,
		setCurrentCompletedStamps,
		setCurrentMaxStamps,
		setCurrentPrimaryColor,
	} = useWalletStore();

	function handleCardClick(cardPressed: Card) {
		setCurrentBusinessName(cardPressed.businessName);
		setCurrentBusinessImage(cardPressed.businessImage);
		setCurrentCompletedStamps(cardPressed.completedStamps);
		setCurrentMaxStamps(cardPressed.maxStamps);
		setCurrentPrimaryColor(cardPressed.primaryColor);
	}

	const slug: string = `./card/${businessName}`;

	const fullStamps = [];
	const emptyStamps = [];

	for (let i = 0; i < completedStamps; i++) {
		fullStamps.push(<Stamp key={i} color={primaryColor} />);
	}

	for (let i = 0; i < maxStamps - completedStamps; i++) {
		emptyStamps.push(<EmptyStamp key={i} />);
	}

	return (
		<View className="h-64 flex-1 py-2">
			<Link href={slug} className="h-full w-full rounded-xl" asChild>
				<Pressable
					onPress={() => {
						handleCardClick({
							businessName: businessName,
							businessImage: businessImage,
							completedStamps: completedStamps,
							maxStamps: maxStamps,
							primaryColor: primaryColor,
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
									source={businessImage}
									className="rounded-lg w-[60px] h-[60px]"
								/>
								<Text className=" text-3xl font-bold text-center flex-1">
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
				</Pressable>
			</Link>
		</View>
	);
};

const Wallet = () => {
	return (
		<View className="h-full w-full bg-[#F7F8F8]">
			<View className="w-full bg-[#9FBAFF] pb-8 h-52 rounded-b-[40px] pt-32 px-8">
				<Text className="text-[#091540] text-3xl font-medium text-left">
					Your Cards
				</Text>
			</View>
			<FlatList
				className="h-full w-full px-6 pt-6 pb-32"
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
