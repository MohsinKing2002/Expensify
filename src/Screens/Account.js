import { View, Text, TouchableOpacity } from "react-native";
import { Avatar, ProgressBar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Img from "../../assets/icon.png";
import { useState } from "react";

const Account = () => {
  const [BudgetTab, setBudgetTab] = useState(true);
  const [BorrowedTab, setBorrowedTab] = useState(false);
  return (
    <View className="h-full bg-bgGray px-4 py-2">
      {/* user profile and edit option */}
      <View className="bg-white shadow-xl py-2 px-4 rounded-lg mb-2.5 flex  flex-row items-center justify-between">
        <View className="flex items-center flex-row">
          <Avatar.Image size={60} source={Img} />
          <View className="ml-6">
            <Text className="text-xl text-txtBlue font-semibold mb-0.5">
              Mohsin King
            </Text>
            <Text className="text-base text-txtBlue font-medium">
              +91 8670562921
            </Text>
          </View>
        </View>
        <TouchableOpacity className="bg-bgGray p-3 rounded-full">
          <Entypo name="edit" size={20} color="#00008b" />
        </TouchableOpacity>
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
                <Text className="text-base font-medium text-txtBlue">₹ 0</Text>
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
            {/* review and suggestion based on expense */}
            <View className="border border-gray-300 rounded-lg p-2">
              <Text>Review</Text>
            </View>
          </>
        ) : (
          <View className="border border-gray-300 rounded-lg p-2">
            <View className="flex flex-row items-center justify-between mb-5 border-b border-gray-300">
              <TouchableOpacity
                onPress={() => setBorrowedTab(false)}
                className={`flex flex-row items-center justify-center  px-4 py-2 w-[50%] border-b ${
                  !BorrowedTab ? "border-txtBlue" : "border-bgGray"
                }`}
              >
                <MaterialCommunityIcons
                  name="credit-card-minus"
                  size={18}
                  color={!BorrowedTab ? "#00008b" : "gray"}
                />
                <Text
                  className={`ml-3 text-base font-semibold ${
                    !BorrowedTab ? "text-txtBlue" : "text-txtGray"
                  }`}
                >
                  Given
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setBorrowedTab(true)}
                className={`flex flex-row items-center justify-center px-4 py-2 w-[50%] border-b ${
                  BorrowedTab ? "border-txtBlue" : "border-bgGray"
                }`}
              >
                <MaterialCommunityIcons
                  name="credit-card-plus"
                  size={18}
                  color={!BorrowedTab ? "gray" : "#00008b"}
                />
                <Text
                  className={`ml-3 text-base font-semibold ${
                    BorrowedTab ? "text-txtBlue" : "text-txtGray"
                  }`}
                >
                  Borrowed
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Account;
