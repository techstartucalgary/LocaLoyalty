import { View, Text, Image, FlatList, Pressable } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { cardData } from "../../../content/temp-card-data";
import Stamp from "../../../assets/images/stamp";
import EmptyStamp from "../../../assets/images/emptyStamp";
import { AntDesign } from "@expo/vector-icons";
import { useWalletStore } from "../../../utils/walletStore";
import { TouchableOpacity } from "react-native-gesture-handler";

type Card = {
	businessName: string;
	businessImage: any;
	businessDesc: string;
	completedStamps: number;
	maxStamps: number;
	primaryColor: string;
};

const Card = ({
	businessName,
	businessImage,
	businessDesc,
	completedStamps,
	maxStamps,
	primaryColor,
}: Card) => {
	const {
		setCurrentBusinessName,
		setCurrentBusinessImage,
		setCurrentBuisnessDescription,
		setCurrentCompletedStamps,
		setCurrentMaxStamps,
		setCurrentPrimaryColor,
	} = useWalletStore();

	function handleCardClick(cardPressed: Card) {
		setCurrentBusinessName(cardPressed.businessName);
		setCurrentBusinessImage(cardPressed.businessImage);
		setCurrentBuisnessDescription(cardPressed.businessDesc);
		setCurrentCompletedStamps(cardPressed.completedStamps);
		setCurrentMaxStamps(cardPressed.maxStamps);
		setCurrentPrimaryColor(cardPressed.primaryColor);
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
		<View className="flex-1 py-2">
			<Link href={slug} className="h-full w-full rounded-xl" asChild>
				<TouchableOpacity
					onPress={() => {
						handleCardClick({
							businessName: businessName,
							businessImage: businessImage,
							businessDesc: businessDesc,
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
				</TouchableOpacity>
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
				className="h-full w-full px-6 pt-6"
				data={cardData}
				renderItem={({ item }) => {
					return (
						<Card
							key={item.businessName}
							businessName={item.businessName}
							businessImage={item.businessImage}
							businessDesc={item.buisnessDesc}
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
