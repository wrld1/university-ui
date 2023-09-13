import styles from "./StudentPageSelect.module.scss";
import FormTitle from "../../FormTitle/FormTitle";
import { useEffect, useState } from "react";
import { getGroups } from "../../../api/groups.api";
import toast from "react-hot-toast";
import Select from "react-select";
import { GroupApiResponse } from "../../../types/Group.interface";
import { addGroupToStudent, getStudents } from "../../../api/students.api";
import useFetchStudentsData from "../../../pages/StudentsPage/useFetchStudentsData";

export type StudentPageSelectProps = {
  studentId: string;
};

const StudentPageSelect: React.FC<StudentPageSelectProps> = ({ studentId }) => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const fetchStudentsData = useFetchStudentsData(getStudents);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getGroups();
        const groupsData: GroupApiResponse[] = response.data;

        const formattedOptions = groupsData.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setOptions(formattedOptions);
      } catch (error: any) {
        toast.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = async (
    selectedOption: { value: string; label: string } | null
  ) => {
    setSelectedOption(selectedOption);
    if (selectedOption) {
      const studentResponse = await addGroupToStudent(`${studentId}`, {
        group: selectedOption.value,
      });
      fetchStudentsData();
    }
  };

  return (
    <div className={styles.select__wrapper}>
      <FormTitle title="Courses and Groups" />{" "}
      <div>
        <Select
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
          placeholder="Select an option"
        />
      </div>
    </div>
  );
};

export default StudentPageSelect;
