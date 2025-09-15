import { z } from "zod";

const processEnv = {
  POSTGRES_URL: process.env.POSTGRES_URL,
};

const clientEnv = z
  .object({
    POSTGRES_URL: z.string(),
  })
  .safeParse(processEnv);

if (!clientEnv.success) {
  console.error(
    "Invalid environment variables:",
    clientEnv.error.flatten().fieldErrors
  );
  throw new Error("Invalid environment variables");
}

export const env = clientEnv.data;
