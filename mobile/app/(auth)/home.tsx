import { View, Text } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useAuthStore } from "../../utils/loginStores";

const Home = () => {
  const { user } = useUser();
  const { token } = useAuthStore();

  //note to anthony when making api call to backend, make sure you use use the function defined in generalAxios.ts

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome, {user?.emailAddresses[0].emailAddress} 🎉</Text>
      <Link href={"/tutorial"}>
        <Text>go to tutorial</Text>
      </Link>
    </View>
  );
};

export default Home;
