import { useBoundStore } from "../../store";
import LogItem from "./LogItem/LogItem";
import { Container, Wrapper, Header, Cancle, Main, Title } from "./LoggerModal.css";
import { BsXLg } from "react-icons/bs";

export default function LoggerModal() {
  const setModalActiveStatus = useBoundStore((state) => state.setModalActiveStatus);
  const modalReset = useBoundStore((state) => state.reset);
  const logArr = useBoundStore((state) => state.logArr);

  return (
    <div className={Container}>
      <div className={Wrapper}>
        <div className={Header}>
          <div className={Title}>활동 기록</div>
          <BsXLg
            className={Cancle}
            onClick={() => {
              setModalActiveStatus(false);
              modalReset();
            }}
          />
        </div>

        <div className={Main}>
          {logArr.map((log) => (
            <LogItem key={log.logId} log={log} />
          ))}
        </div>
      </div>
    </div>
  );
}
