import axios from "axios";
import { ENV } from "../../config";

export const stockService = {
  async getPrice() {
    try {
      const [bseResponse, nseResponse] = await Promise.all([axios.get(ENV.BSE_URL), axios.get(ENV.NSE_URL)]);

      const bseData = bseResponse.data.split(")]}'")[1];
      const bseArray = JSON.parse(bseData);

      const bseDetails = bseArray["PriceUpdate"][0][0][0][17];
      const bsePrice = parseFloat(bseDetails[3].replace(/,/g, "")).toFixed(2);
      const bseChange = parseFloat(bseDetails[5].replace("−", "-").replace(/,/g, "")).toFixed(2);
      const bseChangePercentage = bseDetails[6];

      const nseData = nseResponse.data.split(")]}'")[1];
      const nseArray = JSON.parse(nseData);

      const nseDetails = nseArray["PriceUpdate"][0][0][0][17];
      const nsePrice = parseFloat(nseDetails[3].replace(/,/g, "")).toFixed(2);
      const nseChange = parseFloat(nseDetails[5].replace("−", "-").replace(/,/g, "")).toFixed(2);
      const nseChangePercentage = nseDetails[6];

      return {
        bse: {
          price: bsePrice,
          change: bseChange,
          changePercentage: bseChangePercentage,
        },
        nse: {
          price: nsePrice,
          change: nseChange,
          changePercentage: nseChangePercentage,
        },
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
