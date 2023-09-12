import React, { memo, useCallback, useState } from "react";
import styles from "./DataRow.module.scss";
import { ReactComponent as EditIcon } from "../../assets/icons/EditIcon.svg";
import Modal from "../Modal/Modal";
import { areEqual } from "../../utils/memoCompare";
import EditLectorForm, {
  EditLectorFormProps,
} from "../forms/LectorForm/EditLectorForm";
import { PageType } from "../../types/PageType.type";
import EditCourseForm, {
  EditCourseFormProps,
} from "../forms/CourseForm/EditCourseForm";
import EditGroupForm, {
  EditGroupFormProps,
} from "../forms/GroupForm/EditGroupForm";
import EditStudentForm, {
  EditStudentFormProps,
} from "../forms/StudentForm/EditStudentForm";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import { selectPageType } from "../../redux/data/data.slice";
import { Link } from "react-router-dom";

export type DataRowProps = {
  data: any;
  style: {
    gridTemplateColumns: string;
    gridGap: string;
  };
};
let count = 0;

const DataRow: React.FC<DataRowProps> = ({ data, style }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pageType: PageType = useAppSelector(selectPageType);

  const formComponents: Record<
    PageType,
    React.FC<
      | EditLectorFormProps
      | EditCourseFormProps
      | EditGroupFormProps
      | EditStudentFormProps
    >
  > = {
    lectors: EditLectorForm,
    courses: EditCourseForm,
    groups: EditGroupForm,
    students: EditStudentForm,
  };

  count++;
  console.log("component render number: ", count);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    document.body.classList.add("modal__open");
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.classList.remove("modal__open");
  }, []);

  const FormComponent = formComponents[pageType];

  return (
    <div className={styles.content__row}>
      <Link
        to={`/${pageType}/${data.id}`}
        key={data.id}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className={styles["content__row--data"]} style={style}>
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className={styles["content__property--name"]}>
              {String(value)}
            </div>
          ))}
        </div>
      </Link>
      <div className={styles.edit__button} onClick={openModal}>
        <EditIcon className={styles.edit__icon} />
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <FormComponent entityId={data.id} onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default memo(DataRow, areEqual);
