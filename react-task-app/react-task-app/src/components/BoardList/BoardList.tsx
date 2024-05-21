import SideForm from "./SideForm/SideForm";
import { Container, LeftWrapper, BoardTitle, BoardListStyle, SideFormWarpper, ActiveBoard, Sign } from "./BoardList.css";
import { useBoundStore } from "../../store";
import clsx from "clsx";
import { GoSignOut, GoSignIn } from "react-icons/go";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase";
import { useAuth } from "../../hooks/useAuth";

type Props = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

export default function BoardList({ activeBoardId, setActiveBoardId }: Props) {
  const boardArr = useBoundStore((state) => state.boardArray);
  const setUser = useBoundStore((state) => state.setUser);
  const { isAuth, email, id } = useAuth();
  const resetUser = useBoundStore((state) => state.resetUser);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((userCrendential) => {
        console.log(userCrendential);
        setUser(userCrendential.user.email as string, userCrendential.user.uid);
      })
      .catch((err) => alert(err));
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        resetUser();
      })
      .catch((err) => alert(err));
  };

  return (
    <div className={Container}>
      <div className={LeftWrapper}>
        <div className={BoardTitle}>게시판</div>
        {boardArr.map((board) => (
          <div key={board.boardId} className={clsx(BoardListStyle, { [ActiveBoard]: activeBoardId === board.boardId })} onClick={() => setActiveBoardId(board.boardId)}>
            <div>{board.boardName}</div>
          </div>
        ))}
      </div>
      <div className={SideFormWarpper}>
        <SideForm />
        {isAuth ? <GoSignOut className={Sign} onClick={handleLogout} /> : <GoSignIn className={Sign} onClick={handleLogin} />}
      </div>
    </div>
  );
}
