import React from 'react';
import { useController } from 'react-hook-form';
import Dropdown from 'react-native-input-select';

interface Props {
  control: any;
  name: string;
}

export function Select(props: any) {
  const { control, name, onValueChange, ...rest } = props;
  const { field } = useController({
    control,
    name,
  });

  return (
    <Dropdown
      selectedValue={field.value}
      onValueChange={e => {
        field.onChange(e);
        onValueChange?.(e);
      }}
      {...rest}
    />
  );
}
