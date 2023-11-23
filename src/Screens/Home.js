import { Text, TouchableOpacity, View, Image } from "react-native";
import Navbar from "../Components/Menu";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Divider, Modal, Portal, TextInput } from "react-native-paper";
import { PieChart } from "react-native-chart-kit";
import Logo from "../../assets/icon.png";
import { useEffect, useState } from "react";
import { ID, account, databases } from "../../AppWriteConfig";
import moment from "moment";
import { Query } from "appwrite";

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

export const containerStyle = {
  backgroundColor: "white",
  padding: 20,
  position: "absolute",
  bottom: 0,
  width: "100%",
  borderTopRightRadius: 20,
  borderTopLeftRadius: 20,
};

export const DailyExpenseCard = ({ purpose, time, amount }) => {
  return (
    <View className="mb-2 flex flex-row items-center justify-between">
      <View className="flex flex-row items-center">
        <View className="bg-bgGray p-2 rounded-full">
          <Ionicons name="ios-wallet-outline" size={20} color="red" />
        </View>
        <View className="ml-2">
          <Text className="text-base text-txtRed font-medium">{purpose}</Text>
          <Text className="text-xs text-txtBlue font-medium">{time}</Text>
        </View>
      </View>
      <Text className="text-lg text-txtRed font-semibold">₹ {amount}</Text>
    </View>
  );
};

const Home = () => {
  const [AddNewExpenseModalOpen, setAddNewExpenseModalOpen] = useState(false);
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [allExpenses, setAllExpenses] = useState([]);
  const [budgetDetails, setBudgetDetails] = useState({});
  const [data, setData] = useState([]);
  const [todayTotal, setTodayTotal] = useState(0);
  // console.log("data", allExpenses);

  const createExpense = async () => {
    const user = await account.get();
    // console.log(user);
    return await databases
      .createDocument(
        "6554ca013cea177e6ab3",
        "6554ca412b4adff127e4",
        ID.unique(),
        {
          user_id: user.$id,
          purpose: purpose,
          amount: amount,
          createdAt: moment().format("hh:mm a"),
        }
      )
      .then((res) => {
        databases
          .updateDocument(
            "6554ca013cea177e6ab3",
            "6554d739898bea38353b",
            "6554d88c624531cdf3e9",
            {
              remaing: `${Number(budgetDetails.remaing - Number(amount))}`,
              expense: `${Number(budgetDetails.expense) + Number(amount)}`,
            }
          )
          .then((res) => {
            setAmount("");
            setPurpose("");
            setAddNewExpenseModalOpen(false);
            getAllExpenses();
            getBudgetDetails();
          });
      })
      .catch((err) => {
        console.log("err in create expense", err);
      });
  };

  const getAllExpenses = async () => {
    let user = await account.get();
    return await databases
      .listDocuments("6554ca013cea177e6ab3", "6554ca412b4adff127e4", [
        Query.equal("user_id", [user.$id]),
      ])
      .then((res) => {
        setAllExpenses(res.documents.reverse());
      })
      .catch((err) => console.log("get all expense error", err));
  };
  const getBudgetDetails = async () => {
    return await databases
      .getDocument(
        "6554ca013cea177e6ab3",
        "6554d739898bea38353b",
        "6554d88c624531cdf3e9"
      )
      .then((res) => {
        // setAllExpenses(res.documents.reverse());
        setBudgetDetails(res);
      })
      .catch((err) => console.log("get budget details error", err));
  };

  useEffect(() => {
    if (Object.keys(budgetDetails).length > 0) {
      const data = [
        {
          name: "Budget",
          population: Number(budgetDetails?.budget),
          color: "rgb(22 163 74)",
          legendFontColor: "rgb(21 128 61)",
          legendFontSize: 14,
        },
        {
          name: "Expenses",
          population: Number(budgetDetails?.expense),
          color: "rgb(220 38 38)",
          legendFontColor: "rgb(185 28 28)",
          legendFontSize: 14,
        },
        {
          name: "Remaining",
          population: Number(budgetDetails?.remaing),
          color: "rgb(59 7 100)",
          legendFontColor: "rgb(59 7 100)",
          legendFontSize: 14,
        },
      ];
      setData(data);
    } else setData([]);

    if (allExpenses.length > 0) {
      const total = allExpenses.reduce(
        (total, item) => total + Number(item.amount),
        0
      );
      setTodayTotal(total);
    }
  }, [budgetDetails, allExpenses]);

  useEffect(() => {
    getAllExpenses();
    getBudgetDetails();
  }, []);

  return (
    <View className="h-full bg-bgGray">
      {/* ********************** Header icon with app logo ************************************ */}
      <View className="bg-white mt-9 w-full p-2 flex flex-row items-center justify-center">
        <Image
          source={Logo}
          alt="logo"
          style={{
            height: 50,
            width: 50,
            borderRadius: 100,
            objectFit: "contain",
          }}
        />
        <View className="ml-3">
          <Text className="text-txtBlue text-xl font-semibold">Expensify</Text>
          <Text className="text-txtBlue text-sm font-medium">
            Monitor Your Expenses
          </Text>
        </View>
      </View>

      <View className="px-4 py-2">
        <View className="bg-white shadow-xl p-1 rounded-lg mb-2.5 flex items-center">
          <PieChart
            data={data}
            width={300}
            height={130}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            center={[10, 0]}
            // absolute
          />
        </View>

        <View className="bg-white shadow-xl py-2 px-4 rounded-lg mb-2.5 flex  flex-row items-center justify-between">
          <View>
            <Text className="text-txtGreen text-base font-medium">
              Budget Amount
            </Text>
            <Text className="text-txtRed text-base font-medium my-1">
              Expense Amount
            </Text>
            <Text className="text-txtBlue text-base font-medium">
              Remaining Amount
            </Text>
          </View>
          <View>
            <Text className="text-txtGreen text-base font-semibold">
              ₹ {budgetDetails?.budget}
            </Text>
            <Text className="text-txtRed text-base font-semibold my-1">
              ₹ {budgetDetails?.expense}
            </Text>
            <Text className="text-txtBlue text-base font-semibold">
              ₹ {budgetDetails?.remaing}
            </Text>
          </View>
        </View>

        <View className="bg-white shadow-xl py-2 px-4 rounded-lg mb-1.5">
          <Text className="text-txtBlue text-base font-semibold">
            Today's Expenses
          </Text>
          <Divider bold className="my-2" />
          {allExpenses?.map((item) => (
            <DailyExpenseCard
              key={item.$id}
              amount={item.amount}
              purpose={item.purpose}
              time={item.createdAt}
            />
          ))}
          <Divider bold className="my-2" />
          <View className="flex flex-row items-center justify-between">
            <Text className="text-txtBlue text-base font-semibold">
              Today's Expenses
            </Text>
            <Text className="text-txtRed text-base font-semibold">
              ₹ {todayTotal}
            </Text>
          </View>
        </View>

        <View className="py-1.5 px-2.5 bg-white rounded w-[80%] flex flex-row items-center">
          <AntDesign name="star" size={18} color={"green"} />
          <Text className="ml-1.5 text-txtGreen text-sm font-medium">
            Spend ₹ {3000 / 20} per day
          </Text>
        </View>
      </View>

      {/* ********************** Navbar menu and create expense button ************************************ */}
      <View className="bg-sky-50 absolute bottom-1 w-full">
        <View className="absolute right-6 top-[-40px] bg-bgGray rounded-full p-1.5 z-10">
          <TouchableOpacity
            onPress={() => setAddNewExpenseModalOpen(true)}
            className="bg-sky-50 p-3 rounded-full"
          >
            <AntDesign name="pluscircleo" size={35} color="darkblue" />
          </TouchableOpacity>
        </View>
        <Navbar />
      </View>

      <Portal>
        <Modal
          visible={AddNewExpenseModalOpen}
          onDismiss={() => setAddNewExpenseModalOpen(false)}
          contentContainerStyle={containerStyle}
        >
          <View className="p-2">
            <View className="border-b border-gray-300 flex flex-row items-center justify-between pb-3 mb-4">
              <Text className="text-lg text-txtBlue font-medium">
                Add New Expense
              </Text>
              <TouchableOpacity
                onPress={() => setAddNewExpenseModalOpen(false)}
              >
                <AntDesign name="closecircleo" size={24} color="#00008b" />
              </TouchableOpacity>
            </View>
            <View className="flex gap-4">
              <TextInput
                outlineStyle={{ borderRadius: 8 }}
                label="Purpose"
                mode="outlined"
                value={purpose}
                onChangeText={(text) => setPurpose(text)}
              />

              <TextInput
                outlineStyle={{ borderRadius: 8 }}
                label="Amount"
                mode="outlined"
                value={amount}
                keyboardType="number-pad"
                onChangeText={(text) => setAmount(text)}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <FontAwesome name="rupee" size={16} color="black" />
                    )}
                  />
                }
              />

              <TouchableOpacity
                className={
                  " items-center justify-center flex-row py-3 px-8 rounded-lg bg-purple-950"
                }
                onPress={createExpense}
              >
                <Text className="font-bold text-white text-xl">Add</Text>
                <View className={`ml-6 bg-purple-900 p-1.5 rounded-full`}>
                  <AntDesign
                    name="check"
                    size={18}
                    color="white"
                    className=""
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default Home;
