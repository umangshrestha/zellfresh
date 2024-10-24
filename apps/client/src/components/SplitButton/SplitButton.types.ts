export interface SplitButtonProps<T> {
  options: SplitButtonType<T>[];
  onClick: (value: T) => void;
}

export interface SplitButtonType<T> {
  label: string;
  value: T;
}
