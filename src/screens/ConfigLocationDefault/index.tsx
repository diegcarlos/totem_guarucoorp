import {
  SearchAddress,
  SearchAddressLocation,
} from "@/app/services/SearchAddress";
import { BottomSheet } from "@/components/BottomSheet";
import Icon from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, FlatList, TextInput } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Divider } from "../Content/styled";
import {
  Button,
  InputConfig,
  Text,
  TouchableOpacity,
  View,
  ViewBottomSheet,
} from "./styled";
export default function ConfigLocationDefault() {
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: { lat: "", lng: "" },
  });

  const [resultSearch, setResultSearch] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [pass, setPass] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [snapPoints, setSnapPoints] = useState(["15%", "37%"]);

  const handleChangeAddress = async (input: string) => {
    try {
      setResultSearch([]);
      if (input.length > 3) {
        const searchAddress = await SearchAddress(input);

        setResultSearch(searchAddress);
        setSnapPoints(["15%", "37%"]);
        setIsOpen(true);
      }
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };

  const onFinish = async (data: any) => {
    try {
      const value = JSON.stringify(data);
      await AsyncStorage.setItem("location-default", value);

      const location = await AsyncStorage.getItem("location-default");

      if (location !== null) {
        Alert.alert("Sucesso", "Localização salva com sucesso", [
          { text: "Fechar" },
        ]);
      }
    } catch (error) {
      Alert.alert("Error", JSON.stringify(error), [{ text: "Fechar" }]);
    }
  };

  const handlePressAddress = async (data: any) => {
    const resp = await SearchAddressLocation(data.place_id);
    setValue("lat", String(resp.lat));
    setValue("lng", String(resp.lng));
  };
  useEffect(() => {
    const fetch = setTimeout(async () => {
      handleChangeAddress(search);
    }, 1000);
    return () => {
      clearTimeout(fetch);
    };
  }, [search]);
  return (
    <GestureHandlerRootView>
      <View>
        {pass === "masterPass" ? (
          <>
            <InputConfig
              name="address"
              control={control}
              onChangeText={setSearch}
              placeholder="Endereço"
            />
            <InputConfig
              readOnly
              name="lat"
              control={control}
              placeholder="Latitude"
            />
            <InputConfig
              readOnly
              name="lng"
              control={control}
              placeholder="Longitude"
            />
            <Button onPress={handleSubmit(onFinish)}>
              <Text style={{ color: "#fff" }}>Salvar</Text>
            </Button>
            <BottomSheet isOpen={isOpen} snapPoints={snapPoints}>
              <ViewBottomSheet>
                <FlatList
                  ItemSeparatorComponent={Divider}
                  style={{ height: "100%" }}
                  showsVerticalScrollIndicator={true}
                  data={resultSearch}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => handlePressAddress(item)}
                      >
                        <Icon size={20} key={item.place_id} name="pushpin" />
                        <Text>{item.description}</Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </ViewBottomSheet>
            </BottomSheet>
          </>
        ) : (
          <TextInput
            style={{
              borderStyle: "solid",
              width: 300,
              borderRadius: 15,
              borderColor: "#000",
              borderWidth: 1,
              height: 50,
              textAlign: "center",
            }}
            passwordRules=""
            secureTextEntry
            placeholder="Senha para alterar configurações"
            onChangeText={setPass}
            value={pass}
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
}
