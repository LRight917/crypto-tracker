
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;


const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Notice = styled.h3`
  font-size: 16px;
  color: red;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const ToggleBtn = styled.button`
  
  background-color : ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  padding : 10px;
  cursor: pointer;
`;

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const setterFn = useSetRecoilState(isDarkAtom);
  return (
    <Container>
       <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <Notice>coinpaprika's API is not free. This site uses stored coin resources. coin resoursces provide only the top 3 coins.</Notice>
        <ToggleBtn onClick={()=> setterFn((current)=>!current)}>Toggle Light&Dark</ToggleBtn>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.map((coin, index) => (
            <Coin key={coin.id}>
              {index < 3 ? (
                <Link
                  to={`/${coin.id}`}
                  state={{ name: coin.name }}
                >
                  <Img
                    src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  {coin.name} &rarr;
                </Link>
              ) : (
                <Link
                  to={`/no-data`} 
                >
                  <Img
                    src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  {coin.name} &rarr;
                </Link>
              )}
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;