import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UseEncryptData from "./UseEncryptData";
import UseTokenGenerator from "./UseTokenGenerator";
import useContextState from "./useContextState";
import { API } from "../utils/Constant";
import { useEffect } from "react";

const UseBalance = () => {
  const { token } = useContextState();
  const { data: balance, refetch: refetchBalance } = useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      const generatedToken = UseTokenGenerator();
      const encryptedData = UseEncryptData(generatedToken);

      const res = await axios.post(API.balance, encryptedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
      if (data?.success) {
        return data?.result?.availBalance;
      }
    },
    enabled: false,
  });
  useEffect(() => {
    refetchBalance();
  }, [refetchBalance]);
  return [balance, refetchBalance];
};

export default UseBalance;
