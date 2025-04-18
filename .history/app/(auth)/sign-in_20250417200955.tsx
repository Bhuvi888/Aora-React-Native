import { View, Text, Image, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { signin, getCurrentUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const Signin = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setisSubmitting] = useState(false);
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("error", "Please fill in all the fields");
    }

    setisSubmitting(true);
    try {
      await signin(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("error", error.message);
    } finally {
      setisSubmitting(false);
    }
  };
  return (
    <SafeAreaProvider style={{ backgroundColor: "#161622", height: "100%" }}>
      <ScrollView>
        <View className="w-full min-h-[83vh] flex justify-center my-6 px-4">
          <Image
            source={images.logo}
            className="w-[15px] h-[34px]"
          />
          <Text className="text-2xl text-white font-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            placeholder="Enter your email"
            value={form.email}
            handleChangeText={(text: any) => setform({ ...form, email: text })}
            otherStyles="mt-7"
            keyboardType="emailAddress"
          />
          <FormField
            title="Password"
            placeholder="Enter your password"
            value={form.password}
            handleChangeText={(text: any) =>
              setform({ ...form, password: text })
            }
            otherStyles="mt-7"
            keyboardType="emailAddress"
          />

          <CustomButton
            title="Sign in"
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyle="mt-7"
          />

          <View className="pt-5 justify-center text-center flex-row gap-2">
            <Text className="text-lg text-gray-200 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg  text-secondary font-psemibold"
            >
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Signin;
