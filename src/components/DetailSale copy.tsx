import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  dataLocation: {
    startAddress: string;
    endAddress: string;
    distance: string;
    duration: string;
    valueDistance: number;
    valueDuration: number;
    summary: string;
    warning: string;
  };
  onPressConfirm?: () => void;
  onPressCancel?: () => void;
}

export const DetailSale = (props: Props) => {
  const { dataLocation, onPressConfirm, onPressCancel } = props;
  const [totais, setTotais] = useState({ real: 0, dolar: 0 });
  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    setTotais({
      real: (dataLocation.valueDistance / 1000) * 1.57,
      dolar: (dataLocation.valueDistance / 1000) * 0.28,
    });
  }, [dataLocation]);

  return (
    <View
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <View style={styles.groupsInputs}>
        <Text style={styles.total}>R$ {totais.real.toFixed(2)}</Text>
        <Text>{dataLocation.distance}</Text>
      </View>

      <View style={styles.resumo}>
        <Text
          style={{ fontSize: 18, fontWeight: 500, width: width - 50 }}
          numberOfLines={1}
        >
          {dataLocation.summary}
        </Text>
        <Text style={{ width: width - 50 }} numberOfLines={1}>
          {dataLocation.warning}
        </Text>
      </View>

      <View style={styles.control}>
        <TouchableOpacity
          onPress={onPressCancel}
          style={{ ...styles.button, ...styles.buttonRed }}
        >
          <Text style={styles.text}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressConfirm}
          style={{ ...styles.button, ...styles.buttonBlue }}
        >
          <Text style={styles.text}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  control: {
    width: "100%",
    position: "absolute",
    display: "flex",
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    bottom: 0,
  },
  button: {
    backgroundColor: "#021e7e",
    width: "40%",
    display: "flex",
    alignContent: "center",
    padding: 10,
    borderRadius: 50,
  },
  buttonRed: { backgroundColor: "#ff3131" },
  buttonBlue: { backgroundColor: "#021e7e" },
  text: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  groupsInputs: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingLeft: 25,
    paddingRight: 25,
    width: "100%",
    gap: 12,
    top: 0,
  },
  resumo: {
    maxWidth: 300,
    gap: 4,
    display: "flex",
    flexDirection: "column",
    paddingRight: 25,
    paddingLeft: 25,
    paddingTop: 5,
    width: "100%",
  },
  total: {
    fontSize: 22,
    fontWeight: "700",
  },
});
