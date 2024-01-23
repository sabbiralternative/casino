import axios from "axios";
import { API } from "../utils/Constant";
import { useQuery } from "@tanstack/react-query";

const useDiamondCasinoName = () => {
  const { data: diamondCasinoNav } = useQuery({
    queryKey: ["diamondCasinoName"],
    queryFn: async () => {
      const res = await axios.get(API.diamondCasino);
      const data = res.data;
      return data.sort((Link, b) => Link.sort - b.sort);
    },
  });
  return { diamondCasinoNav };
};

export default useDiamondCasinoName;
