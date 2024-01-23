import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useUser } from "@clerk/clerk-expo";

const Profile = () => {
  const { user } = useUser();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  //const [phone, setPhone] = useState(user?.phoneNumbers[0].phoneNumber);

  const onSaveUser = async () => {
    try {
      // This is not working!
      const result = await user?.update({
        firstName: firstName!,
        lastName: lastName!,
      });

      if (result) {
        Alert.alert(
          "Info Updated Successfully",
          "",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ],
          { cancelable: false }
        );
      }
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  };

  return (
    <View className="flex my-auto items-center">
      <Text className="text-5xl text-center font-bold mb-10">
        Edit your profile
      </Text>

      <View className="flex w-full items-center">
        <View className="flex w-2/3 my-2">
          <Text>First Name</Text>
          <TextInput
            placeholder="First Name"
            value={firstName!}
            onChangeText={setFirstName}
            className="border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md py-1 px-3 transition ease-in-out duration-150"
          />
        </View>

        <View className="flex w-2/3 my-2">
          <Text>Last Name</Text>
          <TextInput
            placeholder="Last Name"
            value={lastName!}
            onChangeText={setLastName}
            className="border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md py-1 px-3 transition ease-in-out duration-150"
          />
        </View>
      </View>

      <TouchableOpacity onPress={onSaveUser}>
        <Text className="font-bold text-white bg-black px-10 py-1 text-xl rounded-md mt-5">
          Update account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
