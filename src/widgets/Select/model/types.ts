type SelectProps = {
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
  options: SelectOption[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SelectOption<T = any> = {
  label: string;
  value: T;
};

export type { SelectProps, SelectOption };
