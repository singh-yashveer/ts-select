import { Select } from "../widgets/Select/ui";

function App() {
  return (
    <Select
      options={[
        { label: "First", value: "1" },
        { label: "Second", value: "2" },
        { label: "Third", value: "3" },
        { label: "Forth", value: "4" },
      ]}
      onChange={(option) => {
        console.log(option);
      }}
    />
  );
}

export default App;
