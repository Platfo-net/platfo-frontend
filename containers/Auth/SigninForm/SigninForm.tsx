import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { loggedIn } from "stores/actions/authAction";
import Input from "components/Input/Input";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";

interface Props {}
type FormData = {
  email: "string";
  password: "string";
};

const SigninForm: React.FC<Props> = () => {
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();
  const { t } = useTranslation("common");

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      const response = await dispatch(loggedIn(data));
      setLoading(false);

      router.push("/dashboard/connections/accounts");
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="flex justify-center">{t("login")}</h3>
      <form className="px-16 pb-0 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8">
          <Input label={t("email")} {...register("email")} />
          <Input
            {...register("password")}
            type="password"
            label={t("password")}
          />
        </div>
        <div className="flex flex-col items-center justify-between">
          <button className="w-full primary" type="submit">
            {t("login")}
          </button>
        </div>
      </form>
      <button
        className="w-full mb-4"
        onClick={() => router.push("/auth/register")}
      >
        {t("register")}
      </button>
    </div>
  );
};

export default SigninForm;
