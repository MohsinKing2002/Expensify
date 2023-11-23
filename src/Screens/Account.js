import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Avatar, ProgressBar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Img from "../../assets/icon.png";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { account } from "../../AppWriteConfig";
import LoadingScreen from "../Components/LoadingScreen";
import { useNavigation } from "@react-navigation/native";

const TransactionCard = ({ name, date, amount, BorrowedTab }) => {
  return (
    <View className="mb-3 flex flex-row items-center justify-between border-b border-gray-300 pb-1.5">
      <View className="flex flex-row items-center">
        <View className="bg-bgGray p-2 rounded-full">
          <Feather
            name={BorrowedTab ? "plus-circle" : "minus-circle"}
            size={20}
            color={BorrowedTab ? "red" : "green"}
          />
        </View>
        <View className="ml-2">
          <Text
            className={`text-base ${
              BorrowedTab ? "text-txtRed" : "text-txtGreen"
            } font-medium`}
          >
            {name}
          </Text>
          <Text className="text-xs text-txtGray font-medium">{date}</Text>
        </View>
      </View>
      <Text
        className={`text-lg ${
          BorrowedTab ? "text-txtRed" : "text-txtGreen"
        }  font-semibold`}
      >
        ₹ {amount}
      </Text>
    </View>
  );
};

const Account = () => {
  const navigation = useNavigation();
  const [Loading, setLoading] = useState(false);
  const [LoadingLO, setLoadingLO] = useState(false);
  const [BudgetTab, setBudgetTab] = useState(true);
  const [BorrowedTab, setBorrowedTab] = useState(false);

  const [userSession, setUserSession] = useState(null);
  // console.log("user", userSession);

  const logoutUser = async () => {
    setLoadingLO(true);
    return await account
      .deleteSession("current")
      .then((res) => {
        setLoadingLO(false);
        setUserSession(null);
        navigation.navigate("Login");
      })
      .catch((err) => {
        setLoadingLO(false);
        console.log("logout err", err);
      });
  };

  const getUserData = async () => {
    try {
      setLoading(true);
      const data = await account.get();
      setUserSession(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      navigation.navigate("Login");
      console.log("get user data error in account", error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return Loading ? (
    <LoadingScreen />
  ) : (
    <>
      <View className="h-full bg-bgGray px-4 py-2">
        {/* user profile and edit option */}
        <View className="bg-white shadow-xl py-2 px-4 rounded-lg mb-2.5 flex  flex-row items-center justify-between">
          <View className="flex items-center flex-row">
            <Avatar.Text
              className="bg-txtBlue"
              size={60}
              label={`${userSession?.name
                ?.split(" ")[0]
                ?.slice(0, 1)}${userSession?.name?.split(" ")[1]?.slice(0, 1)}`}
            />
            <View className="ml-6">
              <Text className="text-xl text-txtBlue font-semibold mb-0.5">
                {userSession?.name}
              </Text>
              <Text className="text-base text-txtBlue font-medium">
                {userSession?.email}
              </Text>
            </View>
          </View>
          <View className="flex gap-2">
            <TouchableOpacity className="bg-blue-400 p-2 px-3 rounded-md">
              <Entypo name="edit" size={16} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={logoutUser}
              className="bg-red-800 p-2 px-3 rounded-md"
            >
              <AntDesign name="logout" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="bg-white shadow-xl p-3 rounded-lg">
          {/* budget and personal(due, borrow) tabs */}
          <View className="flex flex-row items-center justify-between mb-5 border-b border-gray-300">
            <TouchableOpacity
              onPress={() => setBudgetTab(true)}
              className={`flex flex-row items-center justify-center  px-4 py-2 w-[50%] border-b ${
                BudgetTab ? "border-txtBlue" : "border-bgGray"
              }`}
            >
              <AntDesign
                name="creditcard"
                size={20}
                color={BudgetTab ? "#00008b" : "gray"}
              />
              <Text
                className={`ml-3 text-base font-semibold ${
                  BudgetTab ? "text-txtBlue" : "text-txtGray"
                }`}
              >
                Budget
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setBudgetTab(false)}
              className={`flex flex-row items-center justify-center px-4 py-2 w-[50%] border-b ${
                !BudgetTab ? "border-txtBlue" : "border-bgGray"
              }`}
            >
              <AntDesign
                name="wallet"
                size={20}
                color={BudgetTab ? "gray" : "#00008b"}
              />
              <Text
                className={`ml-3 text-base font-semibold ${
                  !BudgetTab ? "text-txtBlue" : "text-txtGray"
                }`}
              >
                Wallet
              </Text>
            </TouchableOpacity>
          </View>
          {BudgetTab ? (
            <>
              {/* budget overview and calculation */}
              <View className="border border-gray-300 p-2 rounded-lg mb-6">
                <View className="border-b border-gray-300 pb-1 mb-2 flex flex-row items-center justify-between">
                  <Text className="text-lg text-txtBlue font-medium">
                    November
                  </Text>
                  <TouchableOpacity className=" px-2">
                    <AntDesign name="edit" size={20} color="#00008b" />
                  </TouchableOpacity>
                </View>
                <View className="flex items-center justify-between flex-row">
                  <View>
                    <Text className="text-txtGreen text-base font-medium my-1">
                      Budget
                    </Text>
                    <Text className="text-txtRed text-base font-medium">
                      Expense
                    </Text>
                  </View>
                  <View>
                    <Text className="text-txtGreen text-base font-semibold my-1">
                      ₹ 5000
                    </Text>
                    <Text className="text-txtRed text-base font-semibold">
                      ₹ 2000
                    </Text>
                  </View>
                </View>

                {/* progressbar   */}
                <ProgressBar
                  className="mt-3.5 mb-1.5 rounded-lg"
                  style={{ height: 14 }}
                  progress={0.5}
                  color="rgb(59 7 100)"
                />
                <View className="flex flex-row items-center justify-between">
                  <Text className="text-base font-medium text-txtBlue">
                    ₹ 0
                  </Text>
                  <Text className="text-base font-medium text-txtRed">
                    ₹ 3000
                  </Text>
                  <Text className="text-base font-medium text-txtGreen">
                    ₹ 5000
                  </Text>
                </View>
              </View>
              {/* expense calculation */}
              <View className="border border-gray-300 rounded-lg p-2 flex flex-row items-center justify-between mb-6">
                <View className="flex gap-1">
                  <Text className="text-txtBlue text-lg font-medium">Type</Text>
                  <Text className="text-txtBlue text-base font-medium ">
                    Amount
                  </Text>
                  <Text className="text-txtBlue text-base font-medium ">
                    Days
                  </Text>
                  <Text className="text-txtBlue text-base font-medium">
                    ₹ Exp/day
                  </Text>
                </View>
                <View className="flex gap-1">
                  <Text className="text-txtGreen text-lg font-medium">
                    Budget
                  </Text>
                  <Text className="text-txtGreen text-base font-medium">
                    ₹ 5000
                  </Text>
                  <Text className="text-txtGreen text-base font-medium">
                    30 Days
                  </Text>
                  <Text className="text-txtGreen text-base font-medium">
                    ₹ {parseFloat(5000 / 30).toFixed(2)}/day
                  </Text>
                </View>
                <View className="flex gap-1">
                  <Text className="text-txtRed text-lg font-medium">
                    Expenses
                  </Text>
                  <Text className="text-txtRed text-base font-medium">
                    ₹ 2000
                  </Text>
                  <Text className="text-txtRed text-base font-medium">
                    14 Days
                  </Text>
                  <Text className="text-txtRed text-base font-medium">
                    ₹ {parseFloat(2000 / 14).toFixed(2)}/day
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <View className="border border-gray-300 rounded-lg p-2 mb-6">
              {/* given and borrowed tabs */}
              <View className="flex flex-row items-center justify-between mb-5 border-b border-gray-300">
                <TouchableOpacity
                  onPress={() => setBorrowedTab(false)}
                  className={`flex flex-row items-center justify-center  px-4 py-2 w-[50%] border-b ${
                    !BorrowedTab ? "border-txtGreen" : "border-bgGray"
                  }`}
                >
                  <MaterialCommunityIcons
                    name="credit-card-minus"
                    size={18}
                    color={!BorrowedTab ? "green" : "gray"}
                  />
                  <Text
                    className={`ml-3 text-base font-semibold ${
                      !BorrowedTab ? "text-txtGreen" : "text-txtGray"
                    }`}
                  >
                    Given
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setBorrowedTab(true)}
                  className={`flex flex-row items-center justify-center px-4 py-2 w-[50%] border-b ${
                    BorrowedTab ? "border-txtRed" : "border-bgGray"
                  }`}
                >
                  <MaterialCommunityIcons
                    name="credit-card-plus"
                    size={18}
                    color={!BorrowedTab ? "gray" : "red"}
                  />
                  <Text
                    className={`ml-3 text-base font-semibold ${
                      BorrowedTab ? "text-txtRed" : "text-txtGray"
                    }`}
                  >
                    Borrowed
                  </Text>
                </TouchableOpacity>
              </View>
              {BorrowedTab ? (
                <View>
                  <TransactionCard
                    name={"Asif"}
                    date={"12/11/2023 10:10pm"}
                    amount={100}
                    BorrowedTab={BorrowedTab}
                  />
                  <View className="flex flex-row items-center justify-between">
                    <Text className="text-txtBlue text-base font-semibold">
                      Total Amount
                    </Text>
                    <Text className="text-txtRed text-base font-semibold">
                      ₹ 3000
                    </Text>
                  </View>
                </View>
              ) : (
                <View>
                  <TransactionCard
                    name={"Asif"}
                    date={"12/11/2023 10:10pm"}
                    amount={100}
                    BorrowedTab={BorrowedTab}
                  />
                  <TransactionCard
                    name={"Parwez"}
                    date={"12/11/2023 10:10pm"}
                    amount={100}
                    BorrowedTab={BorrowedTab}
                  />
                  <View className="flex flex-row items-center justify-between">
                    <Text className="text-txtBlue text-base font-semibold">
                      Total Amount
                    </Text>
                    <Text className="text-txtGreen text-base font-semibold">
                      ₹ 3000
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
      {!BudgetTab && (
        <View className="flex items-center justify-center bg-sky-50 p-1 absolute bottom-2 w-full">
          <View className="bg-bgGray rounded-full p-1.5 z-10">
            <TouchableOpacity
              // onPress={() => setAddNewExpenseModalOpen(true)}
              className="bg-sky-50 p-3 rounded-full"
            >
              <AntDesign name="pluscircleo" size={28} color="darkblue" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default Account;
