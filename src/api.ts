
const BASE_URL = `./data`;


export function fetchCoins() {
    return fetch(`${BASE_URL}/coins.json`).then((response) => response.json());
}
export function fetchCoinInfo(coinId: string) {
    return fetch(`${BASE_URL}/coins/${coinId}.json`).then((response) =>
        response.json()
    );
}
export function fetchCoinTickers(coinId: string) {
    return fetch(`${BASE_URL}/tickers/${coinId}.json`).then((response) =>
        response.json()
    );
}

export function fetchCoinHistory(coinId: string) {
    return fetch(
      `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
    ).then((response) => response.json());
  }