import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import styles from "../../../styles/forms/Form.module.scss";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import FormTitle from "../../FormTitle/FormTitle";
import { useAppSelector } from "../../../utils/hooks/useAppSelector";
import { selectLectorApiData } from "../../../redux/lectors/lectors.slice";
import { GroupApiResponse } from "../../../types/Group.interface";
import { editGroup, getGroups } from "../../../api/groups.api";
import useFetchGroupsData from "../../../pages/GroupsPage/useFetchGroupsData";

interface GroupFormData {
  name?: string;
}

export type EditGroupFormProps = {
  entityId: string;
  onClose: () => void;
};

const schema = yup.object().shape({
  name: yup.string().optional(),
});

const EditGroupForm: React.FC<EditGroupFormProps> = ({ entityId, onClose }) => {
  const groupData: GroupApiResponse[] = useAppSelector(selectLectorApiData);
  const currentGroup = groupData.find((item) => item.id === entityId);
  const fetchGroupsData = useFetchGroupsData(getGroups);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GroupFormData>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit: SubmitHandler<GroupFormData> = async (
    data: GroupFormData
  ) => {
    try {
      const editedData: GroupFormData = {};

      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const typedKey = key as keyof GroupFormData;
          if (
            data[typedKey] !== undefined &&
            data[typedKey] !== null &&
            data[typedKey] !== ""
          ) {
            editedData[typedKey] = data[typedKey];
          }
        }
      }

      if (Object.keys(editedData).length === 0) {
        toast.error("No changes detected.");
        return;
      }

      await editGroup(entityId, editedData);
      toast.success("Data edited successfully");
      reset();
      onClose();
      fetchGroupsData();
    } catch (error: any) {
      toast.error(`There is an error: ${error.response.data.message}`);
    }
  };

  return (
    <>
      <FormTitle title="Edit Group" />
      <form className={styles.input__form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder={currentGroup?.name}
          register={register}
          errors={errors}
        />
        <Button buttonText="Edit Course" type="submit" />
      </form>
    </>
  );
};

export default EditGroupForm;
