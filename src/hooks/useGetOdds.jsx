import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { API } from "../utils/Constant";

const useGetOdds = () => {
  const { eventId, eventTypeId } = JSON.parse(localStorage.getItem("casino"));
  const { data, refetch: refetchOdds } = useQuery({
    queryKey: ["odds"],
    queryFn: async () => {
      const res = await axios.post(`${API.odds}/${eventTypeId}/${eventId}`);
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
