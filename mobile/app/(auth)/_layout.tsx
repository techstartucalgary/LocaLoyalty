import { Link, Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { TouchableOpacity } from "react-native-gesture-handler";
import { cardData } from "../../content/temp-card-data";
import { useWalletStore } from "../../utils/walletStore";

export const LogoutButton = () => {
	const { signOut } = useAuth();

	const doLogout = () => {
		signOut();
	};

	return (
		<TouchableOpacity
			onPress={doLogout}
			className="flex flex-row items-center mr-5 space-x-1"
		>
			<Text>Logout</Text>
			<Ionicons name="log-out-outline" size={24} color={"#000000"} />
		</TouchableOpacity>
	);
};

// const SearchButton = () => {
// 	return (
// 		// TODO: Implement functionality of search button
// 		<Pressable className="pr-4">
// 			<Ionicons name="search" size={24} color={"#000"} />
// 		</Pressable>
// 	);
// };

// const PersonButton = () => {
// 	return (
// 		// TODO: Implement functionality of person button
// 		<Pressable className="pl-4">
// 			<Ionicons name="person-circle-outline" size={24} color={"#000"} />
// 		</Pressable>
// 	);
// };

const WalletHeader = () => {
	const { user } = useUser();

	return (
		<View className="bg-[#9FBAFF] pt-16 pb-8 gap-8 items-center px-12">
			<View className="flex flex-row w-full justify-between">
				<Pressable>
					<Ionicons name="person-outline" size={24} color={"#000"} />
				</Pressable>
				<Text className="text-[#EDEDFF] text-xl font-semibold">
					Hello, {user?.firstName}
				</Text>
				<Pressable>
					<Ionicons name="search" size={24} color={"#000"} />
				</Pressable>
			</View>
		</View>
	);
};

const BusinessCardHeader = () => {
	const { currentPrimaryColor } = useWalletStore();

	return (
		<View
			style={{ backgroundColor: currentPrimaryColor }}
			className="pt-16 gap-8 items-center px-12"
		>
			<View className="flex flex-row w-full justify-between">
				<Link href={"../wallet"}>
					<Ionicons name="arrow-back" size={24} color={"#000"} />
				</Link>
			</View>
		</View>
	);
};

const TabsPage = () => {
	const { isSignedIn } = useAuth();

	return (
		<>
			<Tabs
				screenOptions={{
					headerTransparent: true,
					headerShown: false,
				}}
			>
				<Tabs.Screen
					name="wallet"
					options={{
						// headerTitle: `Hello, ${user?.firstName}`,
						// headerStyle: {
						// 	backgroundColor: "#266055",
						// },
						// headerRight: () => <SearchButton />,
						// headerLeft: () => <PersonButton />,
						tabBarLabel: "Wallet",
						tabBarIcon: ({ color, size }) => (
							<Ionicons name="wallet" size={size} color={color} />
						),
						header: () => <WalletHeader />,
						// headerStyle: {
						// 	display: "flex",
						// 	alignItems: "center",
						// 	justifyContent: "center",
						// }
					}}
					redirect={!isSignedIn}
				/>
				<Tabs.Screen
					name="home"
					options={{
						headerTitle: "Home",
						tabBarIcon: ({ color, size }) => (
							<Ionicons name="home-outline" size={size} color={color} />
						),
						tabBarLabel: "Home",
					}}
					redirect={!isSignedIn}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						headerTitle: "",
						tabBarIcon: ({ color, size }) => (
							<Ionicons name="person-outline" size={size} color={color} />
						),
						tabBarLabel: "My Profile",
						headerRight: () => <LogoutButton />,
					}}
					redirect={!isSignedIn}
				/>
				<Tabs.Screen
					name="tutorial"
					options={{ tabBarButton: () => null, headerShown: false }}
				/>
				<Tabs.Screen
					name="card"
					options={{
						tabBarLabel: "New Wallet",
						tabBarIcon: ({ color, size }) => (
							<Ionicons name="wallet" size={size} color={color} />
						),
					}}
				/>
			</Tabs>
		</>
	);
};

export default TabsPage;
