import { get } from "./request";

const prefix = "/";

export const testApi = {
  hello() {
    return get<string>(prefix);
  },
};
