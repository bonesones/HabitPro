import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/shared/lib";

export const { POST, GET } = toNextJsHandler(auth);
