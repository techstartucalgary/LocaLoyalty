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
import { useWalletStore } from "../../utils/walletStore";
import { useRedeemStore } from "../../utils/redeemStore";

const Scanner = () => {
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const [scanned, setScanned] = useState<boolean>(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [barcodeData, setBarcodeData] = useState(null);
	const [modalText, setModalText] = useState<string>("");
	const [authenticated, setAuthenticated] = useState<boolean>(false);
	const [stampsToAdd, setStampsToAdd] = useState<number>(1);
	const [vendor_id, setVendor_id] = useState<number>(-1);
	const { getToken } = useAuth();
	const { walletRefetchFunc } = useWalletStore();
	const { redeemRefetchFunc } = useRedeemStore();

	useEffect(() => {
		const getBarCodeScannerPermissions = async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === "granted");
		};

		getBarCodeScannerPermissions();
	}, []);

	const scanBarcode = async () => {
		return fetchAPI(
			process.env.EXPO_PUBLIC_NGROK + "/customer/scanBarcode",
			"POST",
			await getToken(),
			{
				barcodeData: barcodeData,
			},
			{}
		);
	};


	const scanMutation = useMutation({
		mutationFn: scanBarcode,
		onSuccess: () => {
			console.log("Success");
			console.log(`Success data`, scanMutation.data);
			// walletRefetchFunc(); // refetch all loyalty card info
			// redeemRefetchFunc();
			setModalText("Successfully scanned and authenticated QR code. Enter points earned for this transaction:")
			setAuthenticated(true)
		},
		onError: () => {
			console.log("ERRORRRRRRR");

			setModalText("Invalid QR code")
			setAuthenticated(false)
		}

	});


	useEffect(() => {
		if (scanMutation.data) {
			setVendor_id(scanMutation.data.vendor_id)
		}
	}, [scanMutation.data])

	const addStamps = async () => {
		return fetchAPI(
			process.env.EXPO_PUBLIC_NGROK + "/customer/addStamps",
			"POST",
			await getToken(),
			{
				vendor_id: vendor_id,
				stampsToAdd: stampsToAdd,
			},
			{}
		);
	};

	const addStampMutation = useMutation({
		mutationFn: addStamps,
		onSuccess: () => {
			walletRefetchFunc(); // refetch all loyalty card info
			redeemRefetchFunc();
			setModalVisible(false)
		},
		// onError: () => {
		// 	setModalText("Unknown/unauthenticated/invalid QR code")
		// 	setAuthenticated(false)
		// }

	});

	const handleBarCodeScanned = ({ type, data }: { type: any; data: any }) => {
		setBarcodeData(data);
		scanMutation.mutate()
		setScanned(true);
		setModalVisible(true);
		// alert(`Bar code with type ${type} and data ${data} has been scanned!`);
	};

	const handleAddPointsSubmit = () => {
		addStampMutation.mutate()
	}

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View className="">
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(false);
				}}
			>
				<View className="w-full h-full px-8 flex justify-center items-center bg-black/75 ">
					<TouchableOpacity
						className="bg-white rounded-lg py-6 px-6 items-center"
						activeOpacity={1}
					>
						{scanMutation.isPending || addStampMutation.isPending ? (
							<ActivityIndicator className="pt-16" />
						) : (
							<View className="w-full items-center">
								<Text className="text-2xl font-bold text-[#153463]">QR Code</Text>
								<View className="pt-2 w-full items-center">
									<Text className="text-lg text-center">{modalText}</Text>
									{authenticated ? (
										<View className="w-full items-center">
											<View className="flex-row justify-center items-center py-4">
												<View className="pr-8">
													<Ionicons onPress={() => setStampsToAdd((prev) => prev > 1 ? prev - 1 : prev)} name="remove-circle-outline" size={92} color={"#000"} />
												</View>
												<Text className="text-6xl">{stampsToAdd}</Text>
												<View className="pl-8">
													<Ionicons onPress={() => setStampsToAdd((prev) => prev + 1)} name="add-circle-outline" size={92} color={"#000"} />
												</View>
											</View>
											<View className="pt-4 w-full flex-row justify-around">
												<TouchableOpacity
													className="w-32 bg-[#9C3232] px-4 py-2 rounded-full mr-8"
													onPress={() => {
														setModalVisible(false);
														setScanned(false);
														setStampsToAdd(1)
													}}
												>
													<Text className="text-center text-white text-lg">
														Scan Again
													</Text>
												</TouchableOpacity>
												<TouchableOpacity
													className="w-32 bg-[#81DA8A] px-4 py-2 rounded-full"
													onPress={() => handleAddPointsSubmit()}
												>
													<Text className="text-center text-white text-lg">
														Confirm
													</Text>
												</TouchableOpacity>
											</View>
										</View>
									) : (
										<View className="pt-4 flex-row justify-around">
											<TouchableOpacity
												className="w-32 bg-[#9C3232] px-4 py-2 rounded-full"
												onPress={() => {
													setModalVisible(false);
													setScanned(false);
													setStampsToAdd(1)
												}}
											>
												<Text className="text-center text-white text-lg">
													Scan Again
												</Text>
											</TouchableOpacity>
										</View>)}
								</View>
							</View>
						)}
					</TouchableOpacity>
				</View>
			</Modal>
			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				className="w-full h-full border border-red-500"
			/>
		</View>
	);
};

export default Scanner;
