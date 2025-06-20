# Enhanced TypeScript Select Component

A feature-rich, accessible, and customizable select component built with React and TypeScript.

## Features

- **Single and Multiple Selection** - Support for both single and multiple selection modes
- **Searchable** - Filter options by typing with searchable mode
- **Keyboard Accessibility** - Full keyboard navigation support (arrow keys, Enter, Escape, Space)
- **Custom Rendering** - Custom option rendering with your own components
- **Loading State** - Built-in loading indicator
- **Placeholder Support** - Display placeholder when no selection is made
- **Disabled Options** - Disable specific options or the entire select component
- **Accessible** - Built with ARIA attributes for better accessibility
- **Customizable Styling** - Easy to customize with CSS

## Usage

### Basic Select

```tsx
import { Select } from "./widgets/Select/ui";
import { SelectOption } from "./widgets/Select/model/types";

const options = [
  { label: "JavaScript", value: "js" },
  { label: "TypeScript", value: "ts" },
  { label: "Python", value: "py" },
];

function App() {
  const [value, setValue] = useState<SelectOption | undefined>();

  return <Select options={options} value={value} onChange={(option) => setValue(option)} placeholder="Select a language" />;
}
```

### Multiple Select

```tsx
function App() {
  const [value, setValue] = useState<SelectOption[]>([]);

  return <Select multiple options={options} value={value} onChange={(options) => setValue(options)} placeholder="Select multiple languages" />;
}
```

### Searchable Select

```tsx
<Select options={options} value={value} onChange={(option) => setValue(option)} placeholder="Search languages" isSearchable />
```

### Custom Option Rendering

```tsx
const customRenderer = (option: SelectOption, isSelected: boolean) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <span style={{ color: isSelected ? "blue" : "gray" }}>{option.label}</span>
    <small style={{ marginLeft: 8 }}>({option.value})</small>
  </div>
);

<Select options={options} value={value} onChange={(option) => setValue(option)} renderOption={customRenderer} />;
```

## Props

| Prop           | Type                                                                                 | Default  | Description                        |
| -------------- | ------------------------------------------------------------------------------------ | -------- | ---------------------------------- |
| `options`      | `SelectOption[]`                                                                     | Required | Array of options to display        |
| `value`        | `SelectOption \| SelectOption[] \| undefined`                                        | -        | Currently selected value(s)        |
| `onChange`     | `(option: SelectOption \| undefined) => void` or `(options: SelectOption[]) => void` | Required | Selection change handler           |
| `multiple`     | `boolean`                                                                            | `false`  | Enable multiple selection          |
| `placeholder`  | `string`                                                                             | -        | Placeholder text when no selection |
| `isLoading`    | `boolean`                                                                            | `false`  | Show loading state                 |
| `isDisabled`   | `boolean`                                                                            | `false`  | Disable the select                 |
| `isSearchable` | `boolean`                                                                            | `false`  | Enable search functionality        |
| `className`    | `string`                                                                             | -        | Additional CSS class               |
| `renderOption` | `(option: SelectOption, isSelected: boolean) => React.ReactNode`                     | -        | Custom option renderer             |

## Running the Demo

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser and navigate to the localhost URL displayed in the terminal

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
