import {
  Button,
  TextInput,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";
import { useState } from "react";
import { Stack } from "expo-router";
import { useRegisterStore } from "../../utils/loginStores";

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const {
    loading,
    email,
    password,
    phone,
    pendingVerification,
    code,
    setLoading,
    setEmail,
    setPassword,
    setPhone,
    setPendingVerification,
    setCode,
    setNewUser,
  } = useRegisterStore();

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading();

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress: email,
        phoneNumber: phone,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to verify the email address
      setPendingVerification();
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading();
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading();

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      setNewUser();
      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading();
    }
  };

  return (
    <View className="flex my-auto items-center">
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <View className="w-full flex items-center">
          <Text className="text-5xl text-center font-bold">
            Create Your Account
          </Text>

          <Image
            source={require("../../assets/images/illustration-1.png")}
            className="h-72 w-72"
          />

          <TextInput
            autoCapitalize="none"
            placeholder="coolemail@gmail.com"
            value={email}
            onChangeText={setEmail}
            className="w-2/3 border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md py-1 px-3 transition ease-in-out duration-150 mb-3"
          />
          <TextInput
            autoCapitalize="none"
            placeholder="4031231234"
            value={phone}
            onChangeText={setPhone}
            className="w-2/3 border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md py-1 px-3 transition ease-in-out duration-150 mb-3"
          />
          <TextInput
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            className="w-2/3 border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md py-1 px-3 transition ease-in-out duration-150 mb-3"
            secureTextEntry
          />

          <TouchableOpacity onPress={onSignUpPress}>
            <Text className="font-bold text-white bg-black px-10 py-1 text-xl rounded-md mt-5">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {pendingVerification && (
        <View className="w-full flex items-center">
          <Text className="text-5xl text-center font-bold">
            Enter Your Code
          </Text>

          <Image
            source={require("../../assets/images/illustration-1.png")}
            className="h-72 w-72"
          />

          <TextInput
            value={code}
            placeholder="Code..."
            onChangeText={setCode}
            className="w-2/3 border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md py-1 px-3 transition ease-in-out duration-150 mb-3"
          />

          <TouchableOpacity onPress={onPressVerify}>
            <Text className="font-bold text-white bg-black px-10 py-1 text-xl rounded-md mt-5">
              Verify Email
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Register;
