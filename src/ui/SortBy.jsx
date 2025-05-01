import { useSearchParams } from "react-router-dom";
import Select from "./Select";

/*
-Adds query strings to the URL for sorting purposes.
-options: an array with objects for the different sorting values, and a label for the buttons
*/
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentValue = searchParams.get("sortBy") || "";
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      value={currentValue}
      onChange={handleChange}
      type="white"
    />
  );
}

export default SortBy;
