import styled from "styled-components";
import useToastStore, { Toast as IToast } from "@/store/toastStore";
import { FaPlus, FaBan, FaInfoCircle } from "react-icons/fa";
import { useState } from "react";
import useTimeout from "@/hooks/useTimeout";

export const TOAST_REMOVE_DELAY = 3000;

export default function Toast({ id, message, type }: IToast) {
  const removeToast = useToastStore((state) => state.removeToast);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleRemoveToast = () => {
    setIsFadingOut(true);
  };

  useTimeout(() => setIsFadingOut(true), TOAST_REMOVE_DELAY);

  const handleAnimationEnd = () => {
    if (isFadingOut) removeToast(id);
  };
  return (
    <ToastStyle className={isFadingOut ? "fade-out" : "fade-in"} onAnimationEnd={handleAnimationEnd}>
      {type === "info" && <FaInfoCircle />}
      {type === "error" && <FaBan />}
      <p>{message}</p>
      <button onClick={handleRemoveToast}>
        <FaPlus />
      </button>
    </ToastStyle>
  );
}

const ToastStyle = styled.div`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  &.fade-in {
    animation: fade-in 0.3s ease-in-out forwards;
  }
  &.fade-out {
    animation: fade-in 0.3s ease-in-out forwards;
  }

  background-color: ${({ theme }) => theme.color.background};
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.default};

  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 24px;
  opacity: 0;
  transition: all 0.3s ease-in-out;

  p {
    color: ${({ theme }) => theme.color.text};
    line-height: 1;
    margin: 0;
    flex: 1;

    display: flex;
    align-items: end;
    gap: 4px;
  }

  button {
    background-color: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;

    svg {
      transform: rotate(45deg);
    }
  }
`;
