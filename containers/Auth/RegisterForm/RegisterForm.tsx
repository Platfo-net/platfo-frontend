import React, { useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { registerUser } from "stores/actions/authAction";
import Input from "components/Input/Input";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "hooks/reduxHooks";

interface Props {}
type FormData = {
  email: "string";
  password: "string";
};
const RegisterForm: React.FC<Props> = () => {
  let { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await dispatch(registerUser(data));
      router.push("/auth/login");
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="flex justify-center">{t("register")}</h3>
      <form className="px-16 pb-0 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <div className="mb-8">
            <Input label={t("email")} {...register("email")} />
            <Input
              {...register("password")}
              type="password"
              label={t("password")}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between">
          <button className="w-full primary" type="submit">
            {t("register")}
          </button>
        </div>
      </form>
      <button
        className="w-full mb-4"
        onClick={() => router.push("/auth/login")}
      >
        {t("login")}
      </button>
    </div>
  );
};

export default RegisterForm;
