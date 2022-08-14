import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import useTranslation from "next-translate/useTranslation";
import { register } from "stores/actions/authAction";
import Input from "components/Input/Input";
import Link from "next/link";

interface Props {}
const RegisterForm: React.FC<Props> = () => {
  let { t } = useTranslation("common");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const data = {
        email: event.target.email.value,
        password: event.target.password.value,
      };
      await dispatch(register(data));
      router.push("/auth/login");
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="flex justify-center">{t("register")}</h3>
      <form className="px-16 pb-8 mb-4" onSubmit={onSubmit}>
        <div className="mb-4">
          <div className="mb-8">
            <Input label={t("email")} id="ad" />
            <Input
              id="password"
              type="password"
              placeholder="*******"
              label={t("password")}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between">
          <button className="w-full primary py-4" type="submit">
            {t("register")}
          </button>
          <button
            className="w-full py-4"
            onClick={() => router.push("/auth/login")}
          >
            {t("login")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
