import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("รูปแบบอีเมลไม่ถูกต้อง")
    .required("กรุณากรอกอีเมล"),

  password: yup
    .string()
    .required("กรุณากรอกรหัสผ่าน"),
});