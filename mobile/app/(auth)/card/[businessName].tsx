import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import SmallStamp from "../../../assets/images/smallStamp";
import SmallEmptyStamp from "../../../assets/images/smallEmptyStamp";
import { useWalletStore } from "../../../utils/walletStore";
import ExtraSmallStamp from "../../../assets/images/extraSmallStamp";
import { useAuth } from "@clerk/clerk-expo";
import { fetchAPI } from "../../../utils/generalAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import MapView from "react-native-maps";

const Reward = ({
  requiredStamps,
  title,
  reward_id,
}: {
  requiredStamps: number,
  title: string,
  reward_id: number,
}) => {

  const { getToken } = useAuth();
  const { currentBusinessName, currentCompletedStamps, currentLoyaltyID, refetchFunc } = useWalletStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalReward, setModalReward] = useState("");

  function handleRewardPress(requiredStamps: number, rewardName: string) {
    if (currentCompletedStamps < requiredStamps) {
      return
    }
    setModalReward(rewardName)
    setModalVisible(true)
  }


  const redeemReward = async () => {
    return fetchAPI(
      process.env.EXPO_PUBLIC_NGROK + "/customer/redeem",
      "POST",
      await getToken(),
      {
        points_cost: requiredStamps,
        reward_id: reward_id,
        loyalty_id: currentLoyaltyID,
      },
      {}
    );
  };

  const redeemMutation = useMutation({
    mutationFn: redeemReward,
    onSuccess: () => {
      console.log("Success");
      console.log(`Success data`, redeemMutation.data);
      refetchFunc() // refetch all loyalty card info
      setModalVisible(false)
    }
  })

  function handleRedeem() {
    redeemMutation.mutate()
  }

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View className="w-full h-full px-12 flex justify-center items-center bg-black/75 ">
          <TouchableOpacity
            className="bg-white rounded-lg py-6 px-6 items-center"
            activeOpacity={1}
          >
            {redeemMutation.isPending ? (
              <ActivityIndicator className="pt-16" />
            ) : (
              <View className="w-full items-center">
                <Text className="text-2xl font-bold text-[#153463]">
                  To Redeem
                </Text>
                <Text className="text-lg font-medium text-[#153463]">
                  {modalReward}
                </Text>
                <Text className="text-lg italic font-semibold text-[#ACACAC]">
                  {currentBusinessName}
                </Text>
                <View className="flex-row items-start pt-2">
                  <View className="p-2">
                    <Ionicons name="warning-outline" size={24} color={"#000"} />
                  </View>
                  <Text className="text-lg">
                    Please confirm that the store approves of this redemption.
                    Once you redeem the stamp at this store, it will be
                    permanently removed from your Ready to Redeem Rewards.
                  </Text>
                </View>
                <View className="pt-4 w-full flex-row justify-around">
                  <TouchableOpacity
                    className="w-28 bg-[#9C3232] px-4 py-2 rounded-full"
                    onPress={() => setModalVisible(false)}
                  >
                    <Text className="text-center text-white text-lg">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="w-28 bg-[#81DA8A] px-4 py-2 rounded-full"
                    onPress={() => handleRedeem()}
                  >
                    <Text className="text-center text-white text-lg">
                      Confirm
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity disabled={currentCompletedStamps < requiredStamps} onPress={() => handleRewardPress(requiredStamps, title)}>
        <View
          className="bg-[#EBEBEB] p-3 shadow my-4 rounded-xl flex-row justify-between items-center"
          style={{ backgroundColor: currentCompletedStamps < requiredStamps ? "#EBEBEB" : "#FFFFFF" }}
        >
          <Text className="text-xl font-semibold">{title}</Text>
          <View className="flex-row items-center">
            <Text className="text-2xl font-medium">
              {requiredStamps}
            </Text>
            <ExtraSmallStamp className="scale-150 px-4" />
          </View>
        </View>
      </TouchableOpacity>
    </>
  )
}

const RewardsSection = () => {
  const { getToken } = useAuth();
  const { currentBusinessID } = useWalletStore();

  const fetchRewards = async () => {
    return fetchAPI(
      `${process.env.EXPO_PUBLIC_NGROK}/customer/rewards/${currentBusinessID}`,
      "GET",
      await getToken(),
      null,
      {}
    );
  };


  const { data, isError, fetchStatus } = useQuery({
    queryKey: ["rewards"],
    queryFn: fetchRewards,
  });

  const rewards: {
    reward_id: number;
    title: string;
    requiredStamps: number;
  }[] = data;




  return (
    <View className="h-full w-full items-center">
      {isError && <Text>Failed to load...</Text>}
      {fetchStatus === "fetching" ? (
        <ActivityIndicator className="pt-16" />
      ) : (
        <FlatList
          className="h-full w-full px-12 py-4"
          data={rewards}
          renderItem={({ item }) => {
            return (
              <Reward
                requiredStamps={item.requiredStamps}
                reward_id={item.reward_id}
                title={item.title}
                key={item.reward_id}
              />
            );
          }}
        />
      )}
    </View>
  );
};

const LoyaltyCardPage = () => {
  const {
    currentBusinessName,
    currentBusinessLogo,
    currentBusinessEmail,
    currentBusinessPhone,
    currentBusinessDescription,
    currentCompletedStamps,
    currentMaxStamps,
    currentPrimaryColor,
    currentCarry_over_amt,
    currentSpending_per_point,
  } = useWalletStore();

  const [isDetailsSelected, setDetailsSelected] = useState<boolean>(false);

  function handleDetailButtonPress() {
    if (isDetailsSelected) {
      return;
    }
    setDetailsSelected(true);
  }

  function handleRewardButtonPress() {
    if (!isDetailsSelected) {
      return;
    }
    setDetailsSelected(false);
  }

  const stampArray = []; // Boolean array representing if completed stamp or not

  for (let i = 0; i < currentCompletedStamps; i++) {
    stampArray.push(true);
  }

  for (let i = 0; i < currentMaxStamps - currentCompletedStamps; i++) {
    stampArray.push(false);
  }

  return (
    <View className="w-full h-full">
      <View
        style={{ backgroundColor: currentPrimaryColor }}
        className="w-full h-52 pt-28 mb-28 rounded-b-[40px]"
      >
        <View className="h-full px-12">
          <View className="w-full border-2 rounded-xl">
            <View className="items-center px-6 bg-[#F7F8F8] rounded-xl">
              <View className="flex-row pt-5 w-full items-center">
                <Image
                  source={{ uri: currentBusinessLogo }}
                  className="rounded-lg w-16 h-16"
                />
                <Text className="flex-1 text-2xl font-bold text-center">
                  {currentBusinessName}
                </Text>
              </View>
              <FlatList
                data={stampArray}
                renderItem={({ item }) => {
                  if (item) {
                    return <SmallStamp color={"#000"} />;
                  } else {
                    return <SmallEmptyStamp />;
                  }
                }}
                className="w-full py-4"
                horizontal={true}
              ></FlatList>
              <View className="flex-row gap-2 py-4">
                <View className="flex-row">
                  <AntDesign name="phone" size={16} color="black" />
                  <Text className="text-xs font-semibold pl-1">
                    {currentBusinessPhone}
                  </Text>
                </View>
                <View className="flex-row">
                  <AntDesign name="mail" size={16} color="black" />
                  <Text className="text-xs font-semibold pl-1">
                    {currentBusinessEmail}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="py-6">
        <View className="flex-row justify-between w-full px-12">
          <Text>Your Progress:</Text>
          <Text className="text-[#7B7B7B]">{`$${currentCarry_over_amt} / $${currentSpending_per_point}`}</Text>
        </View>
        <View className="w-full px-12 py-1">
          <View className="relative w-full h-3 border border-[#999999] rounded-full">
            <View
              style={{
                backgroundColor: currentPrimaryColor,
                width: `${(currentCarry_over_amt / currentSpending_per_point) * 100
                  }%`,
              }}
              className="absolute h-full rounded-full"
            ></View>
          </View>
        </View>
        <View className="flex-row justify-between w-full px-12">
          <Text>{`$${currentCarry_over_amt}`}</Text>
          <Text>{`$${currentSpending_per_point}`}</Text>
        </View>
      </View>

      <View className="flex-row h-12 px-10 w-full">
        <Pressable
          onPress={handleRewardButtonPress}
          disabled={!isDetailsSelected}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1.0,
              flex: 1,
              borderStyle: "solid",
              borderColor: isDetailsSelected ? "#B1B1B1" : currentPrimaryColor,
              borderWidth: 2,
              backgroundColor: pressed ? "#B1B1B1" : "transparent",
            },
          ]}
        >
          <View className="w-full h-full justify-center items-center">
            <Text className="text-lg">Rewards</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={handleDetailButtonPress}
          disabled={isDetailsSelected}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1.0,
              flex: 1,
              borderStyle: "solid",
              borderColor: isDetailsSelected ? currentPrimaryColor : "#B1B1B1",
              borderWidth: 2,
              backgroundColor: pressed ? "#B1B1B1" : "transparent",
            },
          ]}
        >
          <View className="w-full h-full justify-center items-center">
            <Text className="text-lg">Details</Text>
          </View>
        </Pressable>
      </View>

      {isDetailsSelected ? (
        <ScrollView
          className="h-full px-12 pt-4"
          contentContainerStyle={{ paddingBottom: 64 }}
        >
          <Text className="text-lg font-semibold pb-2">
            About {currentBusinessName}
          </Text>
          <Text className="pb-8">{currentBusinessDescription}</Text>
          <MapView className="w-full aspect-square" />
        </ScrollView>
      ) : (
        <RewardsSection />
      )}
    </View>
  );
};

export default LoyaltyCardPage;
