import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Stack } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { usePasswordResetStore } from "../../utils/loginStores";

const PwReset = () => {
  const {
    email,
    password,
    code,
    successfulCreation,
    setEmail,
    setPassword,
    setSuccessfulCreation,
    setCode,
  } = usePasswordResetStore();
  const { signIn, setActive } = useSignIn();

  // Request a passowrd reset code by email
  const onRequestReset = async () => {
    try {
      await signIn!.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setSuccessfulCreation();
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      console.log(result);
      alert("Password reset successfully");

      // Set the user session active, which will log in the user automatically
      await setActive!({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  return (
    <View className="flex my-auto items-center">
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

      {!successfulCreation && (
        <View className="w-full flex items-center">
          <Text className="text-5xl text-center font-bold">Password Reset</Text>

          <Image
            source={require("../../assets/images/illustration-2.png")}
            className="h-72 w-72"
          />

          <TextInput
            autoCapitalize="none"
            placeholder="coolemail@gmail.com"
            value={email}
            onChangeText={setEmail}
            className="w-2/3 border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md py-1 px-3 transition ease-in-out duration-150"
          />

          <TouchableOpacity onPress={onRequestReset}>
            <Text className="font-bold text-white bg-black px-10 py-1 text-xl rounded-md mt-5">
              Send Reset Email
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {successfulCreation && (
        <View className="w-full flex items-center">
          <Text className="text-5xl text-center font-bold">Password Reset</Text>

          <Image
            source={require("../../assets/images/illustration-2.png")}
            className="h-72 w-72"
          />

          <TextInput
            value={code}
            placeholder="Code..."
            onChangeText={setCode}
            className="w-2/3 border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md py-1 px-3 transition ease-in-out duration-150"
          />
          <TextInput
            placeholder="New password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="w-2/3 border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md py-1 px-3 transition ease-in-out duration-150 mt-3"
          />

          <TouchableOpacity onPress={onReset}>
            <Text className="font-bold text-white bg-black px-10 py-1 text-xl rounded-md mt-5">
              Change Password
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PwReset;
