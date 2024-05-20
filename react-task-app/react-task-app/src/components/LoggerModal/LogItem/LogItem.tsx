import { BsPerson } from "react-icons/bs";
import { Container, Main } from "./LogItem.css";
import { ILogItem } from "../../../types";

type Prop = {
  log: ILogItem;
};
export default function LogItem({ log }: Prop) {
  let timeOffset = new Date(Date.now() - Number(log.logTimestamp));
  console.log(timeOffset);
  const showOffsetTime = `
  ${timeOffset.getMinutes() > 0 ? `${timeOffset.getMinutes()}m` : ""}
  ${timeOffset.getSeconds() > 0 ? `${timeOffset.getSeconds()}s ago` : ""}
  ${timeOffset.getSeconds() === 0 ? "just now" : ""}
  `;
  console.log(showOffsetTime);

  return (
    <div className={Container}>
      <div>
        <BsPerson />
        <span>{log.logAuthor}</span>
      </div>
      <div className={Main}>
        <span>{log.logMessage}</span>
        <span>{showOffsetTime}</span>
      </div>
    </div>
  );
}
