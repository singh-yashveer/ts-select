import { useState } from "react";
import { Select } from "../widgets/Select/ui";
import { SelectOption } from "../widgets/Select/model/types";
import "./App.css";

const options = [
  { label: "JavaScript", value: "js" },
  { label: "TypeScript", value: "ts" },
  { label: "Python", value: "py" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
  { label: "C#", value: "csharp" },
  { label: "PHP", value: "php" },
  { label: "Ruby", value: "rb", disabled: true },
  { label: "Go", value: "go" },
];

function App() {
  const [singleValue, setSingleValue] = useState<SelectOption | undefined>();
  const [multipleValue, setMultipleValue] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function simulateLoading() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  // Custom option renderer example
  const customOptionRenderer = (option: SelectOption, isSelected: boolean) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div
        style={{
          width: "16px",
          height: "16px",
          backgroundColor: isSelected ? "#007bff" : "#ccc",
          borderRadius: "50%",
        }}
      />
      <span>{option.label}</span>
      <span style={{ fontSize: "12px", color: "#888" }}>({option.value})</span>
    </div>
  );

  return (
    <div className="container">
      <h1>Enhanced Select Components</h1>

      <section>
        <h2>Basic Select</h2>
        <Select
          options={options}
          value={singleValue}
          onChange={(option) => {
            setSingleValue(option);
          }}
          placeholder="Select a programming language"
        />
      </section>

      <section>
        <h2>Multiple Select</h2>
        <Select
          multiple
          options={options}
          value={multipleValue}
          onChange={(option) => {
            setMultipleValue(option);
          }}
          placeholder="Select multiple programming languages"
        />
      </section>

      <section>
        <h2>Searchable Select</h2>
        <Select
          options={options}
          value={singleValue}
          onChange={(option) => {
            setSingleValue(option);
          }}
          placeholder="Search and select a language"
          isSearchable
        />
      </section>

      <section>
        <h2>Loading State</h2>
        <button onClick={simulateLoading} className="loadButton">
          Simulate Loading
        </button>
        <Select
          options={options}
          value={singleValue}
          onChange={(option) => {
            setSingleValue(option);
          }}
          placeholder="Select a programming language"
          isLoading={isLoading}
        />
      </section>

      <section>
        <h2>Custom Option Rendering</h2>
        <Select
          options={options}
          value={singleValue}
          onChange={(option) => {
            setSingleValue(option);
          }}
          placeholder="Select with custom options"
          renderOption={customOptionRenderer}
        />
      </section>

      <section>
        <h2>Disabled Select</h2>
        <Select
          options={options}
          value={singleValue}
          onChange={(option) => {
            setSingleValue(option);
          }}
          placeholder="This select is disabled"
          isDisabled
        />
      </section>
    </div>
  );
}

export default App;
