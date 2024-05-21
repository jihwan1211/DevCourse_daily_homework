import { TBoardState, TLoggerState, TModalState, TUserState } from "../../types";
import { StateCreator } from "zustand";

export const createUserSlice: StateCreator<TBoardState & TLoggerState & TModalState & TUserState, [], [], TUserState> = (set) => ({
  email: "",
  id: "",
  setUser: (email: string, id: string) => set(() => ({ email: email, id: id })),
  resetUser: () => set(() => ({ email: "", id: "" })),
});
