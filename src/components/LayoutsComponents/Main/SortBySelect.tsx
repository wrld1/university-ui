import { useState } from "react";
import Select from "react-select";
import { getStudents } from "../../../api/students.api";
import { useAppDispatch } from "../../../utils/hooks/useAppDispatch";
import { setStudentApiData } from "../../../redux/students/students.slice";
import toast from "react-hot-toast";
import useFetchStudentsData from "../../../pages/StudentsPage/useFetchStudentsData";

type SortOption = {
  value: string[];
  label: string;
};

const SortBySelect = () => {
  const [selectedOption, setSelectedOption] = useState("all");
  const dispatch = useAppDispatch();
  const fetchStudentsData = useFetchStudentsData(getStudents);

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

  const options: any = [
    { value: ["name", "ASC"], label: "A-Z" },
    { value: ["name", "DESC"], label: "Z-A" },
    { value: ["createdAt", "ASC"], label: "Newest First" },
    { value: ["createdAt", "DESC"], label: "Oldest First" },
    { value: "all", label: "All" },
  ];

  const handleSelectChange: any = async (sortOption: SortOption) => {
    setSelectedOption(sortOption.label);
    try {
      const [sortField, sortOrder] = sortOption.value;
      const response = await getStudents(sortField, sortOrder);
      dispatch(setStudentApiData(response.data));
    } catch (error: any) {
      toast.error("Error fetching students:", error);
    }
  };

  return (
    <Select
      styles={customSelectStyles}
      options={options}
      value={selectedOption}
      onChange={handleSelectChange}
      placeholder="All"
    />
  );
};

export default SortBySelect;
