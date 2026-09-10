import axios from "axios";
import { ENV } from "../../config";

export const stockService = {
  async getPrice() {
    try {
      // Use Yahoo Finance API as fallback since Google Finance async endpoint often breaks or returns empty data
      const bseUrl = 'https://query1.finance.yahoo.com/v8/finance/chart/MINDTECK.BO';
      const nseUrl = 'https://query1.finance.yahoo.com/v8/finance/chart/MINDTECK.NS';
      
      const [bseResponse, nseResponse] = await Promise.all([
        axios.get(bseUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }), 
        axios.get(nseUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } })
      ]);

      const extractData = (res) => {
        const result = res.data.chart.result[0];
        const price = result.meta.regularMarketPrice;
        const prevClose = result.meta.chartPreviousClose;
        const change = price - prevClose;
        const changePercent = (change / prevClose) * 100;
        
        return {
          price: price.toFixed(2),
          change: change.toFixed(2),
          changePercentage: changePercent.toFixed(2) + "%",
        };
      };

      const bseData = extractData(bseResponse);
      const nseData = extractData(nseResponse);

      return {
        bse: bseData,
        nse: nseData,
      };
    } catch (error) {
      console.error("Failed to fetch stock data:", error);
      return {
        bse: {
          price: null,
          change: null,
          changePercentage: null,
        },
        nse: {
          price: null,
          change: null,
          changePercentage: null,
        },
      };
    }
  },
};
