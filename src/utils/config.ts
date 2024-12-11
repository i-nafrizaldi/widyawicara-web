import { config } from "dotenv";
import { resolve } from "path";

const envFile = ".env";

config({ path: resolve(__dirname, `../../${envFile}`) });

export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
