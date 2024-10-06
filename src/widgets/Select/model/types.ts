// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SelectOption<T = any> = {
  label: string;
  value: T;
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
} & (SingleSelectProps | MultipleSelectProps);

export type { SelectProps, SelectOption };
