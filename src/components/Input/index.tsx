import { styled } from 'styled-components/native';

import { useController } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { TextLabel, ViewRoot } from './styled';

interface Props extends TextInputProps {
  control: any;
  name: string;
  label?: string;
}

export function Input(props: Props) {
  const { label, control, name, onChangeText, ...rest } = props;
  const { field } = useController({
    control,
    name,
  });

  return (
    <ViewRoot>
      <TextLabel>{label}</TextLabel>
      <TextInput
        {...rest}
        value={field.value}
        onChangeText={e => {
          field.onChange(e);
          onChangeText?.(e);
        }}
      />
    </ViewRoot>
  );
}

const TextInput = styled.TextInput``;
