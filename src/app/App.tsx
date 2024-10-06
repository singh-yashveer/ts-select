import { useState } from "react";
import { Select } from "../widgets/Select/ui";
import { SelectOption } from "../widgets/Select/model/types";

const options = [
  { label: "First", value: "1" },
  { label: "Second", value: "2" },
  { label: "Third", value: "3" },
  { label: "Forth", value: "4" },
];

function App() {
  const [singleValue, setSingleValue] = useState<SelectOption | undefined>(options[0]);
  const [multipleValue, setMultipleValue] = useState<SelectOption[]>([options[0]]);

  return (
    <>
      <Select
        options={options}
        value={singleValue}
        onChange={(option) => {
          setSingleValue(option);
        }}
      />
      <br />
      <Select
        multiple
        options={options}
        value={multipleValue}
        onChange={(option) => {
          setMultipleValue(option);
        }}
      />
    </>
  );
}

export default App;
