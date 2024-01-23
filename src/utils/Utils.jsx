import { config } from "./config";

export const token = localStorage.getItem("token");
export const virtualCasino = JSON.parse(localStorage.getItem("casino"));
export const virtualCasinoApi = config?.result?.endpoint?.odds;
export const getSingleCasinoApi = config?.result?.endpoint?.accessToken;
export const interval = config?.result?.settings?.interval;
export const oddsApi = config?.result?.endpoint?.odds;
export const exposerApi = config?.result?.endpoint?.exposure;
export const currentBetsApi = config?.result?.endpoint?.currentBets;

