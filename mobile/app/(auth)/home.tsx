import { View, Text } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useAuthStore } from "../../utils/loginStores";

const Home = () => {
  const { user } = useUser();
  const { token } = useAuthStore();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
      }}
    >
      <Text>Hello, {user?.emailAddresses[0].emailAddress} 🎉</Text>
      <Link href={"/tutorial"}>
        <Text>go to tutorial</Text>
      </Link>
      <Link href={"/wallet"}>
        <Text>go to wallet</Text>
      </Link>
    </View>
  );
};

export default Home;
