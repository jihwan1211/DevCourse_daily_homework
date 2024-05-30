import Footer from "../common/Footer";
import Header from "../common/Header";
import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <LayoutStyle>{children}</LayoutStyle>
      <Footer />
    </>
  );
}

const LayoutStyle = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};

  padding: 20px 0;
`;
