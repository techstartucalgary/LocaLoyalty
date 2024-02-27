import { Link, Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useWalletStore } from "../../../utils/walletStore";

const WalletHeader = () => {
	const { user } = useUser();

	return (
		<View className="bg-[#9FBAFF] pt-16 pb-8 gap-8 items-center px-12">
			<View className="flex flex-row w-full justify-between">
				<Pressable>
					<Ionicons name="person-outline" size={24} color={"#000"} />
				</Pressable>
				<Text className="text-[#EDEDFF] text-xl font-medium">
					Hello, {user?.firstName}
				</Text>
				<Pressable>
					<Ionicons name="search" size={24} color={"#000"} />
				</Pressable>
			</View>
		</View>
	);
};

const LoyaltyCardBackButton = ({ onPress }: { onPress: () => void }) => {
	return (
		<Pressable onPress={onPress}>
			<Ionicons name="arrow-back" size={24} color={"#000"} />
		</Pressable>
	);
};

export default function WalletPage() {
	const { currentPrimaryColor } = useWalletStore();

	return (
		<Stack screenOptions={{
			headerTransparent: true
		}}>
			<Stack.Screen
				name="index"
				options={{
					header: () => <WalletHeader />,
				}}
			/>
			<Stack.Screen
				name="[businessName]"
				options={{
					headerTitle: "",
					headerStyle: {
						backgroundColor: currentPrimaryColor
					},
					headerTintColor: "#000"
				}}
			/>
		</Stack>
	);
}
