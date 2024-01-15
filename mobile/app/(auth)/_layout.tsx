import { Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";

export const LogoutButton = () => {
	const { signOut } = useAuth();

	const doLogout = () => {
		signOut();
	};

	return (
		<Pressable onPress={doLogout} style={{ marginRight: 10 }}>
			<Ionicons name="log-out-outline" size={24} color={"#fff"} />
		</Pressable>
	);
};

const SearchButton = () => {
  return (
    // TODO: Implement functionality of search button
    <Pressable className="pr-4">
      <Ionicons name="search" size={24} color={"#000"} />
    </Pressable>
  )
}

const PersonButton = () => {
  return (
    // TODO: Implement functionality of person button
    <Pressable className="pl-4">
      <Ionicons name="person-circle-outline" size={24} color={"#000"} />
    </Pressable>
  )
}

const WalletHeader = () => {
	const { user } = useUser();

	return (
		<View className="bg-[#266055] flex pt-12 pb-8 gap-8 rounded-b-3xl justify-center">
			<View className="flex flex-row w-full justify-between px-12">
				<Pressable>
					<Ionicons name="person-outline" size={24} color={"#000"} />
				</Pressable>
				<Text className="text-[#E9BCB7] text-xl font-semibold">
					Hello, {user?.firstName}
				</Text>
        <Pressable>
					<Ionicons name="search" size={24} color={"#000"} />
				</Pressable>
			</View>
			<Text className="text-[#E9BCB7] text-3xl font-medium">Your Cards</Text>
		</View>
	);
};

const TabsPage = () => {
	const { isSignedIn } = useAuth();
	const { user } = useUser();

	return (
		<>
			<Tabs
				screenOptions={{
					headerStyle: {
						backgroundColor: "#6c47ff",
					},
					headerTintColor: "#fff",
				}}
			>
				<Tabs.Screen
					name="wallet"
					options={{
						headerTitle: `Hello, ${user?.firstName}`,
						tabBarLabel: "Wallet",
						headerStyle: {
                backgroundColor: "#266055",
            },
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="wallet" size={size} color={color} />
            ),
            headerRight: () => <SearchButton />,
            headerLeft: () => <PersonButton />,
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
						headerTitle: "My Profile",
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
