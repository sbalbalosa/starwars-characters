import { setupServer } from "msw/node";
import { handlers } from "./handlers";
import seed from "./seed";

seed();

export const server = setupServer(...handlers);
