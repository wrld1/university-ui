import styles from "./Main.module.scss";
import { ReactComponent as PlusIcon } from "../../../assets/icons/PlusIcon.svg";
import { useLocation } from "react-router-dom";
import Modal from "../../Modal/Modal";
import AddLectorForm, {
  AddLectorFormProps,
} from "../../forms/LectorForm/AddLectorForm";
import { useCallback, useState } from "react";
import { PageType } from "../../../types/PageType.type";
import AddCourseForm, {
  AddCourseFormProps,
} from "../../forms/CourseForm/AddCourseForm";
import AddGroupForm, {
  AddGroupFormProps,
} from "../../forms/GroupForm/AddGroupForm";
import AddStudentForm, {
  AddStudentFormProps,
} from "../../forms/StudentForm/AddStudentForm";

const AddButton: React.FC = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formComponents: Record<
    PageType,
    React.FC<
      | AddLectorFormProps
      | AddCourseFormProps
      | AddGroupFormProps
      | AddStudentFormProps
    >
  > = {
    lectors: AddLectorForm,
    courses: AddCourseForm,
    groups: AddGroupForm,
    students: AddStudentForm,
  };

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    document.body.classList.add("modal__open");
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.classList.remove("modal__open");
  }, []);

  const currentPathname = location.pathname;

  const modifiedPathname = currentPathname.slice(0, -1).toLowerCase();
  const capitalizedPathname =
    modifiedPathname.charAt(1).toUpperCase() + modifiedPathname.slice(2);
  const pageTypeFromPath = currentPathname.slice(1).toLowerCase();

  const pageType: PageType = pageTypeFromPath as PageType;
  const FormComponent = formComponents[pageType];

  return (
    <>
      <button className={styles.add_button} onClick={openModal}>
        <PlusIcon /> Add new {capitalizedPathname}
      </button>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <FormComponent onClose={closeModal} />
        </Modal>
      )}
    </>
  );
};

export default AddButton;
