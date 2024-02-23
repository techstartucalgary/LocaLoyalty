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
					name="card"
					options={{
						tabBarLabel: "New Wallet",
						tabBarIcon: ({ color, size }) => (
							<Ionicons name="wallet" size={size} color={color} />
						),
					}}
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
			</Tabs>
		</>
	);
};

export default TabsPage;
