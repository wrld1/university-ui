import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import styles from "../../../styles/forms/Form.module.scss";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import FormTitle from "../../FormTitle/FormTitle";
import { createGroup, getGroups } from "../../../api/groups.api";
import useFetchGroupsData from "../../../pages/GroupsPage/useFetchGroupsData";

export type AddGroupFormProps = {
  onClose: () => void;
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

type FormData = yup.InferType<typeof schema>;

const AddGroupForm: React.FC<AddGroupFormProps> = ({ onClose }) => {
  const fetchGroupsData = useFetchGroupsData(getGroups);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await createGroup({
        name: data.name,
      });

      console.log(response);
      toast.success("Group created successfully");
      fetchGroupsData();
      reset();
      onClose();
    } catch (error: any) {
      toast.error(`There is an error: ${error.response.data.message}`);
    }
  };

  return (
    <>
      <FormTitle title="Create new group" />
      <form className={styles.input__form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Name of Group"
          register={register}
          errors={errors}
        />
        <Button buttonText="Create Group" type="submit" />
      </form>
    </>
  );
};

export default AddGroupForm;
