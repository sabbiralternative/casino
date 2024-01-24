import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API } from "../utils/Constant";
import UseTokenGenerator from "./UseTokenGenerator";
import UseEncryptData from "./UseEncryptData";
import useContextState from "./useContextState";

const useGetVideo = () => {
  const { eventId, eventTypeId } = JSON.parse(localStorage.getItem("casino"));
  const { token } = useContextState();
  const { data: videoUrl } = useQuery({
    queryKey: ["iFrameVideo"],
    queryFn: async () => {
      const generatedToken = UseTokenGenerator();
      const encryptedVideoData = UseEncryptData({
        eventId: eventId,
        eventTypeId: eventTypeId,
        token: generatedToken,
      });
      const res = await axios.post(API.accessToken, encryptedVideoData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res?.data?.result?.url;
      return data;
    },
  });
  return { videoUrl};
};

export default useGetVideo;
