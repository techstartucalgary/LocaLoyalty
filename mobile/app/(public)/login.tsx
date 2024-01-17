import { useSignIn } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Pressable,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex justify-center my-auto items-center">
      <Spinner visible={loading} />

      <Text className="text-5xl text-center font-bold">LocaLoyalty</Text>
      <Text className="text-xl text-center font-bold">
        "Get rewarded for supporting local!"
      </Text>

      <Image
        source={require("../../assets/images/illustration-5.png")}
        className="h-72 w-72"
      />

      <TextInput
        autoCapitalize="none"
        placeholder="email"
        value={emailAddress}
        onChangeText={setEmailAddress}
        className="w-2/3 border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md py-1 px-3 transition ease-in-out duration-150 mb-3"
      />

      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="w-2/3 border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md py-1 px-3 transition ease-in-out duration-150 mb-5"
      />

      <TouchableOpacity onPress={onSignInPress}>
        <Text className="font-bold text-white bg-black px-10 py-1 text-xl rounded-md">
          Login
        </Text>
      </TouchableOpacity>

      <View className="flex flex-col items-center space-y-2 mt-2">
        <Link href="/reset" asChild>
          <Pressable>
            <Text>Forgot password?</Text>
          </Pressable>
        </Link>
        <Link href="/register" asChild>
          <Pressable>
            <Text>Create Account</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default Login;
