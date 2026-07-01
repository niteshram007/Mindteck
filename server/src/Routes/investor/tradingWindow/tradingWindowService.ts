import { Collection } from "mongodb";
import { TradingWindowType, TradingWindowUpsertType } from "./tradingWindowSchemas";

const TRADING_WINDOW_KEY = "investor-trading-window";

const getDefaultTradingWindow = (): TradingWindowType => ({
  key: TRADING_WINDOW_KEY,
  isVisible: true,
  openDate: "2025-07-01",
  closeDate: "2025-08-10",
  boardMeetingDate: "2025-08-07",
});

export const tradingWindowService = {
  async getTradingWindow(tradingWindowCollection: Collection<TradingWindowType>) {
    const data =
      (await tradingWindowCollection.findOne({ key: TRADING_WINDOW_KEY })) ||
      getDefaultTradingWindow();

    return { data };
  },

  async upsertTradingWindow(
    tradingWindowCollection: Collection<TradingWindowType>,
    payload: TradingWindowUpsertType,
  ) {
    await tradingWindowCollection.updateOne(
      { key: TRADING_WINDOW_KEY },
      {
        $set: {
          key: TRADING_WINDOW_KEY,
          isVisible: payload.isVisible,
          openDate: payload.openDate || "",
          closeDate: payload.closeDate || "",
          boardMeetingDate: payload.boardMeetingDate || "",
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    );

    const data =
      (await tradingWindowCollection.findOne({ key: TRADING_WINDOW_KEY })) ||
      getDefaultTradingWindow();

    return { message: "Trading window updated successfully", data };
  },
};
