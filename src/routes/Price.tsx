import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";
import { useQuery } from "react-query";

const Container = styled.div`
  border-radius: 10px;
  background-color: ${(props)=>props.theme.cardBgColor};

  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

interface IOutletContext{
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Price() {
  const {coinId} = useOutletContext<IOutletContext>();
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickersInPrice", coinId],
    () => fetchCoinTickers(coinId!)
  );
  console.log(coinId);
    return (
      <Container>
        <span>현재가격: ${tickersData?.quotes.USD.price.toFixed(3)}</span>
        <span>시가총액: ${tickersData?.quotes.USD.market_cap}</span>
        <span>역대 최고가: ${tickersData?.quotes.USD.ath_price.toFixed(3)}</span>
        <span>24시간 거래량: {tickersData?.quotes.USD.volume_24h.toFixed(3)}</span>
        <span>변동률:</span>
        <span style={{padding: "0 0 0 10px"}}>15분: {tickersData?.quotes.USD.percent_change_15m}%</span>
        <span style={{padding: "0 0 0 10px"}}>30분: {tickersData?.quotes.USD.percent_change_30m}%</span>
        <span style={{padding: "0 0 0 10px"}}>1시간: {tickersData?.quotes.USD.percent_change_1h}%</span>
        <span style={{padding: "0 0 0 10px"}}>6시간: {tickersData?.quotes.USD.percent_change_6h}%</span>
        <span style={{padding: "0 0 0 10px"}}>24시간: {tickersData?.quotes.USD.percent_change_24h}%</span>
        
      </Container>
    );

  }
  export default Price;