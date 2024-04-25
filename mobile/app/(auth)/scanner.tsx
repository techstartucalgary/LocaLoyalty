import {
	View,
	Text,
	Button,
	Modal,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Ionicons } from "@expo/vector-icons";
import { fetchAPI } from "../../utils/generalAxios";
import { useAuth } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";

const Scanner = () => {
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const [scanned, setScanned] = useState<boolean>(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [barcodeData, setBarcodeData] = useState(null);
	const [modalText, setModalText] = useState<string>("");
	const { getToken } = useAuth();

	useEffect(() => {
		const getBarCodeScannerPermissions = async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === "granted");
		};

		getBarCodeScannerPermissions();
	}, []);

	const handleBarCodeScanned = ({ type, data }: { type: any; data: any }) => {
		setScanned(true);
		setModalVisible(true);
		setBarcodeData(data);
		setModalText("qrcode type: " + type + "\ndata:" + data);
		// alert(`Bar code with type ${type} and data ${data} has been scanned!`);
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	// const scanBarcode = async () => {
	// 	return fetchAPI(
	// 		// TODO: Implement endpoint
	// 		process.env.EXPO_PUBLIC_NGROK + "/customer/scanBarcode",
	// 		"POST",
	// 		await getToken(),
	// 		{
	// 			barcodeData: barcodeData,
	// 		},
	// 		{}
	// 	);
	// };

	// const scanMutation = useMutation({
	// 	mutationFn: scanBarcode,
	// 	onSuccess: () => {
	// 		console.log("Success");
	// 		console.log(`Success data`, scanMutation.data);
	// 		// walletRefetchFunc(); // refetch all loyalty card info
	// 		// redeemRefetchFunc();
	// 		setModalText("Successfully scanned barcode to authenticate");
	// 	},
	// });

	return (
		<View className="p-4">
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
						{/* {redeemMutation.isPending ? (
								<ActivityIndicator className="pt-16" />
							) : */}
						{/* ( */}
						<View className="w-full items-center">
							<Text className="text-2xl font-bold text-[#153463]">
								To Redeem
							</Text>
							<View className="flex-row items-start pt-2">
								<View className="p-2">
									<Ionicons name="warning-outline" size={24} color={"#000"} />
								</View>
								<Text className="text-lg">{modalText}</Text>
							</View>
							<View className="pt-4 w-full flex-row justify-around">
								<Button
									title={"Tap to Scan Again"}
									onPress={() => {
										setModalVisible(false);
										setScanned(false);
									}}
								/>
							</View>
						</View>
						{/* )}  */}
					</TouchableOpacity>
				</View>
			</Modal>
			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				className="w-full h-full border border-red-500"
			/>
			{/* {scanned && (
				
			)} */}
		</View>
	);
};

export default Scanner;
