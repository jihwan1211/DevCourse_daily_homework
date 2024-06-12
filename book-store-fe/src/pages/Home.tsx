import styled from "styled-components";
import MainReview from "@/components/Main/MainReview";
import { useMain } from "@/hooks/useMain";
import Title from "@/components/common/Title";
import MainNewBooks from "@/components/Main/MainNewBooks";
import MainBestBooks from "@/components/Main/MainBestBooks";
import Banner from "@/components/common/banner/Banner";

export default function Home() {
  const { reviews, newBooks, bestBooks, banners } = useMain();
  return (
    <HomeStyle>
      <Banner banners={banners} />

      <section className="section">
        <Title size="large">베스트 셀러</Title>
        <MainBestBooks books={bestBooks} />
      </section>

      <section className="section">
        <Title size="large">신간 안내</Title>
        <MainNewBooks books={newBooks} />
      </section>

      <section className="section">
        <Title size="large">리뷰</Title>
        <MainReview reviews={reviews} />
      </section>
    </HomeStyle>
  );
}

const HomeStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
