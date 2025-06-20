// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SelectOption<T = any> = {
  label: string;
  value: T;
  disabled?: boolean;
};

type SingleSelectProps = {
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
  multiple?: false;
};

type MultipleSelectProps = {
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
  multiple: true;
};

type SelectProps = {
  options: SelectOption[];
  placeholder?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  isSearchable?: boolean;
  className?: string;
  renderOption?: (option: SelectOption, isSelected: boolean) => React.ReactNode;
} & (SingleSelectProps | MultipleSelectProps);

export type { SelectProps, SelectOption };
