import { useUserStore } from "./users";

const appStore: any = {};

export const registerStore = () => {
  appStore.users = useUserStore();
};

export default appStore;