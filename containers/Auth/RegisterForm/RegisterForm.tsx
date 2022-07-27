import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import useTranslation from "next-translate/useTranslation";
import { register } from "stores/actions/authAction";
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
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={onSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
          <Link href="/auth/login">
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Sign In
            </a>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
