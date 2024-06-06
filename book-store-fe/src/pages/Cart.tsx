import styled from "styled-components";
import Title from "../components/common/Title";
import CartItem from "../components/Cart/CartItem";
import { useCart } from "../hooks/useCart";
import { useMemo, useState } from "react";
import Empty from "../components/common/Empty";
import { FaShoppingCart } from "react-icons/fa";
import CartSummary from "../components/Cart/CartSummary";
import Button from "../components/common/Button";
import { useAlert } from "../hooks/useAlert";
import { OrderSheet } from "../models/order.model";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { carts, isEmpty, deleteCartItem } = useCart();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const { showAlert, showConfirm } = useAlert();
  const navigate = useNavigate();

  const handleCheckItem = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  const handleItemDelete = (id: number) => {
    deleteCartItem(id);
  };

  const totalQuantity = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.id)) return acc + cart.quantity;
      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const totalPrice = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.id)) return acc + cart.price * cart.quantity;
      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const handleOrder = () => {
    if (checkedItems.length === 0) {
      showAlert("주문할 상푸을 선택해주세요.");
      return;
    }

    const orderData: Omit<OrderSheet, "delivery"> = {
      items: checkedItems,
      totalPrice,
      totalQuantity,
      firstBookTitle: carts[0].title,
    };
    showConfirm("주문하시겠습니까?", () => {
      navigate("/order", { state: orderData });
    });
  };

  return (
    <>
      <Title size="large">장바구니</Title>
      <CartStyle>
        {isEmpty ? (
          <Empty title="장바구니가 비었습니다." icon={<FaShoppingCart />} description={<>장바구니를 채워보세요</>} />
        ) : (
          <>
            <div className="content">
              {carts.map((item) => (
                <CartItem key={item.id} cart={item} checkedItems={checkedItems} onCheck={handleCheckItem} onDelete={handleItemDelete} />
              ))}
            </div>
            <div className="summary"></div>
          </>
        )}
        <div className="content">
          {carts.map((item) => (
            <CartItem key={item.id} cart={item} checkedItems={checkedItems} onCheck={handleCheckItem} onDelete={handleItemDelete} />
          ))}
        </div>
        <div className="summary">
          <CartSummary totalPrice={totalPrice} totalQuantity={totalQuantity} />
          <Button size="large" scheme="primary" onClick={handleOrder}>
            주문하기
          </Button>
        </div>
      </CartStyle>
    </>
  );
}

export const CartStyle = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding: 24px 0 0 0;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .order-info {
    h1 {
      padding: 0 0 24px 0;
    }
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 12px;
  }

  .delivery {
    .error-text {
      color: red;
      margin: 0;
      padding: 0 0 12px 0;
      text-align: right;
    }

    fieldset {
      border: 0;
      margin: 0;
      padding: 0 0 12px 0;
      display: flex;
      justify-content: start;
      gap: 8px;

      label {
        width: 80px;
      }

      .input {
        flex: 1;
        input {
          width: 100%;
        }
      }
    }
  }
`;
