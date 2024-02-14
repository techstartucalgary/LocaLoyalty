import { View, Text, Image, FlatList, Pressable } from "react-native";
import { cardData } from "../../../content/temp-card-data";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";

type ExploreCard = {
    businessName: string,
    businessLogo: any,
}

const ExploreCard = ({
    businessName,
    businessLogo,
}: ExploreCard) => {

    function handleExploreCardPress() {

    }

    return (
        // <Link href={"./details"} className="h-full w-full" asChild>
        <View className="flex-1 px-4 py-4">
            <Link href={"./explore/details"} asChild>
                <TouchableOpacity onPress={() => {
                    handleExploreCardPress()
                }}>
                    <View className="h-32">
                        <Image source={businessLogo} className="w-full h-full rounded-md" style={{ resizeMode: "cover" }} />
                    </View>
                    <View className="pt-2">
                        <Text>{businessName}</Text>
                    </View>
                </TouchableOpacity>
            </Link>
        </View>
        // </Link>
    )
}

const ExploreCardList = () => {

    return (
        <FlatList
            className="h-full w-full px-4 pt-6"
            data={cardData}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 32 }}
            renderItem={({ item }) => {
                return (
                    <ExploreCard
                        key={item.businessName}
                        businessName={item.businessName}
                        businessLogo={item.businessImage}
                    />
                );
            }}
        />
    )
}

const Explore = () => {

    return (
        <View className="h-full w-full bg-[#F7F8F8]">
            <View className="w-full bg-[#9FBAFF] pb-8 h-52 rounded-b-[40px] pt-32 px-8">
                <Text className="text-[#091540] text-3xl font-medium text-left">
                    Explore Businesses
                </Text>
            </View>
            <ExploreCardList />
        </View>
    );
}

export default Explore;