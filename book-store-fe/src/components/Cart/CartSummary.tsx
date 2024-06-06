import styled from "styled-components";
import { formatNumber } from "../../utils/format";

interface Props {
  totalQuantity: number;
  totalPrice: number;
}

export default function CartSummary({ totalQuantity, totalPrice }: Props) {
  return (
    <CartSummaryStyle>
      <h1>주문 요약</h1>
      <dl>
        <dt></dt>
        <dd>{totalQuantity}권</dd>
      </dl>
      <dl>
        <dt></dt>
        <dd>{formatNumber(totalPrice)}원</dd>
      </dl>
    </CartSummaryStyle>
  );
}

const CartSummaryStyle = styled.div`
  border: 1px soild ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: 12px;
  width: 240px;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 12px;
  }

  dl {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    dd {
      font-weight: 700;
    }
  }
`;
