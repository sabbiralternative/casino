import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UseEncryptData from "./UseEncryptData";
import UseTokenGenerator from "./UseTokenGenerator";
import useContextState from "./useContextState";

const UseBalance = () => {
 const {token} = useContextState()
//  console.log(token);
 
  const { data: balance, refetch: refetchBalance } = useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      const generatedToken = UseTokenGenerator();
      const encryptedData = UseEncryptData(generatedToken);
      const res = await axios.post("https://api7.live/api/account/diamond/balance", encryptedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
      return data;
    },
    // staleTime: 6000,
  });

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     refetchBalance();
  //   }, 6000);
  //   return () => clearInterval(intervalId);
  // }, [refetchBalance]);

  return [balance, refetchBalance];
};

export default UseBalance;
