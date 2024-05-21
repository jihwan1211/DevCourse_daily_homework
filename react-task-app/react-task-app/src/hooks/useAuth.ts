import { useBoundStore } from "../store";

export function useAuth() {
  const email = useBoundStore((state) => state.email);
  const id = useBoundStore((state) => state.id);

  return {
    isAuth: !!email,
    email,
    id,
  };
}
