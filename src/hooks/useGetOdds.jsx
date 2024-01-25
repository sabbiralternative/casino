import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { API } from "../utils/Constant";
import { useParams } from "react-router-dom";

const useGetOdds = () => {
  const { eventId } = useParams();
  const { data, refetch: refetchOdds } = useQuery({
    queryKey: ["odds"],
    queryFn: async () => {
      const res = await axios.post(`${API.odds}/${1000}/${eventId}`);
      const data = res.data;
      if (data.success) {
        return data.result;
      }
    },
    staleTime: 600,
  });
  useEffect(() => {
    const intervalId = setInterval(() => {
      refetchOdds();
    }, 600);
    return () => clearInterval(intervalId);
  }, [refetchOdds]);

  return [data, refetchOdds];
};

export default useGetOdds;
