import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { cardData } from "../../../content/temp-card-data";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { useExploreStore } from "../../../utils/exploreStore";
import { fetchAPI } from "../../../utils/generalAxios";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";

type ExploreCard = {
  businessID: number;
  businessName: string;
  businessImage: string;
  businessDesc: string;
};

const ExploreCard = ({
  businessID,
  businessName,
  businessImage,
  businessDesc,
}: ExploreCard) => {
  const {
    setCurrentExploreVendorID,
    setCurrentExploreName,
    setCurrentExploreImage,
    setCurrentExploreDescription,
  } = useExploreStore();

  function handleExploreCardPress() {
    setCurrentExploreVendorID(businessID);
    setCurrentExploreName(businessName);
    setCurrentExploreImage(businessImage);
    setCurrentExploreDescription(businessDesc);
  }

  return (
    <View className="w-1/2 px-4 py-4">
      <Link href={"./explore/details"} asChild>
        <TouchableOpacity
          onPress={() => {
            handleExploreCardPress();
          }}
        >
          <View className="h-32">
            <Image
              source={{ uri: businessImage }}
              className="w-full h-full rounded-md"
              style={{ resizeMode: "cover", backgroundColor: "#e1e4e8" }}
            />
          </View>
          <View className="pt-2">
            <Text>{businessName}</Text>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const ExploreCardList = () => {
  const { getToken } = useAuth();

  const { setRefetchFunc } = useExploreStore();

  const fetchVendors = async () => {
    return fetchAPI(
      process.env.EXPO_PUBLIC_NGROK + "/customer/vendors",
      "GET",
      await getToken(),
      null,
      {}
    );
  };

  const { data, isLoading, isError, refetch, isRefetching, error } = useQuery({
    queryKey: ["vendors"],
    queryFn: fetchVendors,
  });

  useEffect(() => {
    setRefetchFunc(refetch);
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  async function handleRefresh() {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  const vendorData: {
    vendor_id: number;
    name: string;
    business_image: string;
    description: string;
  }[] = data;

  return (
    <View className="items-center h-full w-full">
      {isError && <Text>{error.message}</Text>}
      {isLoading || isRefetching ? (
        <ActivityIndicator className="pt-16" />
      ) : (
        <FlatList
          className="h-full w-full px-4 pt-6"
          data={vendorData}
          numColumns={2}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          contentContainerStyle={{ paddingBottom: 250 }}
          renderItem={({ item }) => {
            return (
              <ExploreCard
                key={item.vendor_id}
                businessID={item.vendor_id}
                businessName={item.name}
                businessImage={item.business_image}
                businessDesc={item.description}
              />
            );
          }}
        />
      )}
    </View>
  );
};

const Explore = () => {
  return (
    <View className="h-full w-full bg-[#F7F8F8]">
      <View className="w-full bg-[#9FBAFF] pb-8 h-52 rounded-b-[40px] pt-32 px-8">
        <Text className="text-[#091540] text-2xl font-semibold text-left">
          Explore Businesses
        </Text>
      </View>
      <ExploreCardList />
    </View>
  );
};

export default Explore;
