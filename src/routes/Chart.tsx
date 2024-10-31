import { useOutletContext } from "react-router";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface IOutletContext {
  coinId: string;
}
function Chart() {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useOutletContext<IOutletContext>();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((item) => ({
                x: +item.time_close * 1000,
                y: [item.open, item.high, item.low, item.close]
              }))
                || [],
            },
          ]}
          options={{
            grid: { show: false },
            theme: {
              mode: isDark ? "dark" : "light"
            },
            chart: {
              type: "candlestick",
              height: 350,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            xaxis: {
              type: "datetime",
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
            },
            yaxis: {
              tooltip: { enabled: false },
              show: false,
            },
            tooltip: {

            }
          }}
        />
      )}
    </div>
  );
}
export default Chart;