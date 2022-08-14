import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { loggedIn } from "stores/actions/authAction";
import Input from "components/Input/Input";
import useTranslation from "next-translate/useTranslation";

interface Props {}
const SigninForm: React.FC<Props> = () => {
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("common");

  const onSubmit = async (event: any) => {
    console.log("it;s ok");
    event.preventDefault();

    setLoading(true);
    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    await dispatch(loggedIn(data));
    setLoading(false);
    router.push("/dashboard");

    // setLoading(false);
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="flex justify-center">{t("login")}</h3>
      <form className="px-12 pb-8 mb-4" onSubmit={onSubmit}>
        <div className="mb-8">
          <Input label={t("email")} id="ad" />
          <Input
            id="password"
            type="password"
            placeholder="*******"
            label={t("password")}
          />
        </div>
        <div className="flex flex-col items-center justify-between">
          <button className="w-full primary py-4" type="submit">
            {t("login")}
          </button>
          <button
            className="w-full py-4"
            onClick={() => router.push("/auth/register")}
          >
            {t("register")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
