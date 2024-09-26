import { Input } from "@/components/Input";
import { styled } from "styled-components/native";

export const View = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ViewBottomSheet = styled.View`
  height: 100%;
  width: 100%;
  padding: 5px;
`;

export const InputConfig = styled(Input)`
  border: 1px solid;
  height: 50px;
  width: 300px;
  border-radius: 15px;
  margin-top: 15px;
  text-align: center;
`;

export const Button = styled.TouchableOpacity`
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: blue;
  padding: 15px;
  border-radius: 15px;
`;

export const Text = styled.Text``;

export const TouchableOpacity = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 5px;
  gap: 5px;
`;
