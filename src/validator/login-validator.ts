import { z } from "zod";

const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;

export const loginSchema = z.object({
  emailOrCpf: z.string().refine(
    (val) => {
      const isEmail = z.string().email().safeParse(val).success;
      const isCpf = cpfRegex.test(val);
      return isEmail || isCpf;
    },
    {
      message: "Insira um e-mail ou CPF válido",
    }
  ),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export function validateLogin(data: unknown) {
  return loginSchema.safeParse(data);
}
