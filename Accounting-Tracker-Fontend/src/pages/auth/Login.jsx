import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schemas/login.schema";
import Input from "../../components/common/Input";
import { actionLogin } from "../../api/auth.api";
import useAuthStore from "../../store/auth.store";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await actionLogin(data);

      login({
        token: result.token,
        user: result.user,
      });

      Swal.fire({
        icon: "success",
        title: "เข้าสู่ระบบสำเร็จ",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "เข้าสู่ระบบไม่สำเร็จ",
        text:
          err.response?.data?.message ||
          "Email หรือ Password ไม่ถูกต้อง",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            AccountingTracker
          </h1>

          <p className="text-gray-500">
            ระบบติดตามงานบัญชีและภาษี
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <Input
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />

          <button
            disabled={isSubmitting}
            className="
              w-full
              rounded-lg
              bg-blue-600
              py-3
              text-white
              hover:bg-blue-700
              disabled:opacity-50
            "
          >
            {isSubmitting
              ? "กำลังเข้าสู่ระบบ..."
              : "เข้าสู่ระบบ"}
          </button>
        </form>
      </div>
    </div>
  );
}