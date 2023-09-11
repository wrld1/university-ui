import Select from "react-select";

const SortBySelect = () => {
  const customSelectStyles = {
    container: (provided: any, state: any) => ({
      ...provided,
      minHeight: "38px",
      display: "flex",
      alignItems: "center",
      minWidth: "140px",
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      border: "1px solid #e4e7ed",
      borderRadius: "6px",
      backgroundColor: "white",
      padding: "4px 13px 4px 14px",
      cursor: "pointer",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "blue" : "white",
      color: state.isSelected ? "white" : "black",
      cursor: "pointer",
      padding: "8px",
    }),
    indicatorSeparator: (provided: any, state: any) => ({
      ...provided,
      display: "none",
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      color: state.selectProps.menuIsOpen ? "gray" : "black",
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: 0,
    }),
    indicatorContainer: (provided: any) => ({
      ...provided,
      padding: 0,
    }),
  };

  const options = [
    { value: "asc", label: "A-Z" },
    { value: "desc", label: "Z-A" },
    { value: "newest", label: "Newest First" },
    { value: "latest", label: "Latest First" },
    { value: "all", label: "All" },
  ];

  return <Select styles={customSelectStyles} options={options} />;
};

export default SortBySelect;
