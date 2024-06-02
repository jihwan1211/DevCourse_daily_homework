import styled from "styled-components";
import { useState } from "react";
import Button from "./Button";
import { FaAngleDown } from "react-icons/fa";

interface Props {
  children: React.ReactNode;
  lineLimit: number;
}

export default function EllipsisBox({ children, lineLimit }: Props) {
  const [expanded, setExpaned] = useState(false);
  return (
    <EllipsisBoxStyle lineLimit={lineLimit} $expanded={expanded}>
      <p>{children}</p>
      <div className="toggle">
        <Button size="small" scheme="normal" onClick={() => setExpaned(!expanded)}>
          {expanded ? "접기" : "펼치기"} <FaAngleDown />
        </Button>
      </div>
    </EllipsisBoxStyle>
  );
}

interface EllipsisBoxStyleProps {
  lineLimit: number;
  $expanded: boolean;
}

const EllipsisBoxStyle = styled.div<EllipsisBoxStyleProps>`
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${({ lineLimit, $expanded }) => ($expanded ? "none" : lineLimit)};
    -webkit-box-orient: vertical;
    padding: 20px 0 0 0;
    margin: 0;
  }

  .toggle {
    display: flex;
    justify-content: end;
    svg {
      transform: ${({ $expanded }) => ($expanded ? "rotate(180deg)" : "rotate(0)")};
    }
  }
`;
