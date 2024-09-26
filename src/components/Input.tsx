import { styled } from "styled-components/native";

import { useController } from "react-hook-form";
import { TextInputProps } from "react-native";

interface Props extends TextInputProps {
  control: any;
  name: string;
}

export function Input(props: Props) {
  const { control, name, onChangeText, ...rest } = props;
  const { field } = useController({
    control,
    name,
  });

  return (
    <TextInput
      {...rest}
      value={field.value}
      onChangeText={(e) => {
        field.onChange(e);
        onChangeText?.(e);
      }}
    />
  );
}

const TextInput = styled.TextInput``;
