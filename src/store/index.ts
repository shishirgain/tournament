import { users } from "./users";

const appStore: any = {};

export const registerStore = () => {
  appStore.users = users();
};

export default appStore;