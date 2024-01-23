import { useEffect, useState } from "react";
import axios from "axios";
import UseTokenGenerator from "../../hooks/UseTokenGenerator";
import UseEncryptData from "../../hooks/UseEncryptData";
import BetSlip from "../../components/BetSlip/BetSlip";
import PlaceBet from "../../components/BetSlip/PlaceBet";
import { Toaster } from "react-hot-toast";
import useContextState from "../../hooks/useContextState";
import { API } from "../../utils/Constant";
import AmarAkbarAnthony from "./GameType/AmarAkbarAnthony";
import BollywoodCasino from "./GameType/BollywoodCasino";
import LuckySeven from "./GameType/LuckySeven";
import { useParams } from "react-router-dom";

const DiamondCasino = () => {
  const { eventId: eventIdParams } = useParams();
  const [url, setUrl] = useState("");
  const [placeBetValue, setPlaceBetValue] = useState({});
  const [price, setPrice] = useState("");
  const [totalSize, setTotalSize] = useState("");
  const [isOpenBetEdit, setIsOpenBetEdit] = useState(false);
  const [clickedRunners, setClickedRunners] = useState([]);
  const { token, oddsData, setOddsData } = useContextState();
  const storedTotalWin = localStorage.getItem("totalWin");
  const [totalPlaceOrder, setTotalPlaceOrder] = useState([]);
  const { eventId, eventTypeId } = JSON.parse(localStorage.getItem("casino"));

  useEffect(() => {
    if (oddsData?.length > 0) {
      const getTotalPlaceOrder = JSON.parse(
        localStorage.getItem("totalBetPlace")
      );
      if (!getTotalPlaceOrder) {
        localStorage.removeItem("totalWin");
      }
      const filterOrderByEventId = getTotalPlaceOrder?.filter(
        (order) => order?.eventId === oddsData[0]?.eventId
      );
      setTotalPlaceOrder(filterOrderByEventId);
    }
  }, [oddsData]);

  useEffect(() => {
    if (oddsData?.length > 0) {
      const roundId = localStorage.getItem("roundId");
      if (roundId != oddsData[0]?.roundId) {
        localStorage.removeItem("totalBetPlace");
      }
      localStorage.setItem("roundId", oddsData[0]?.roundId);
    }
  }, [oddsData]);

  let totalOrderPlaced = 0;
  if (totalPlaceOrder) {
    for (const order of totalPlaceOrder) {
      totalOrderPlaced = parseFloat(
        (totalOrderPlaced + order?.totalSize).toFixed(2)
      );
    }
  }

  useEffect(() => {
    const generatedToken = UseTokenGenerator();
    const encryptedVideoData = UseEncryptData({
      eventId: 10004,
      eventTypeId: 1000,
      token: generatedToken,
    });
    const getCasinoVideo = async () => {
      const res = await axios.post(
        "https://api7.live/api/exchange/diamond/accessToken",
        encryptedVideoData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      if (data.success) {
        setUrl(data?.result?.url);
      }
    };
    getCasinoVideo();
  }, [token]);

  /* Get odds */
  useEffect(() => {
    const getGameDetails = async () => {
      const res = await axios.get(`${API.odds}/${eventTypeId}/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;

      if (data.success) {
        setOddsData(data.result);
      }
    };
    getGameDetails();
    const intervalId = setInterval(getGameDetails, 600);
    return () => clearInterval(intervalId);
  }, []);

  const handlePlaceBet = (game, runner) => {
    setPlaceBetValue({});
    setPlaceBetValue({
      price: runner?.back[0]?.price,
      side: 0,
      selectionId: runner?.id,
      btype: game?.btype,
      eventTypeId: game?.eventTypeId,
      eventId: game?.eventId,
      betDelay: game?.betDelay,
      marketId: game?.id,
      back: true,
      isWeak: game?.isWeak,
      maxLiabilityPerMarket: game?.maxLiabilityPerMarket,
      isBettable: game?.isBettable,
      maxLiabilityPerBet: game?.maxLiabilityPerBet,
      borderActive: true,
    });

    setClickedRunners([]);
    setClickedRunners((prevClickedRunners) => {
      const updatedRunners = [...prevClickedRunners];
      const index = updatedRunners.indexOf(runner.id);
      if (index === -1) {
        updatedRunners.push(runner.id);
      } else {
        updatedRunners.splice(index, 1);
      }
      return updatedRunners;
    });
  };

  useEffect(() => {
    setPrice(placeBetValue?.price);
  }, [placeBetValue]);

  /* Timer start */
  const [timer, setTimer] = useState("");
  const roundIdForTimer = oddsData[0]?.roundId;
  useEffect(() => {
    const roundStart = oddsData[0]?.roundStart;
    const counter = oddsData[0]?.counter;
    const currentTimestamp = Math.floor(new Date().getTime() / 1000);
    const timer = counter - (currentTimestamp - roundStart);
    setTimer(timer);
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevCount) => prevCount - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [roundIdForTimer, timer]);
  /* Timer end */

  const isBorderActiveStatus = oddsData[0]?.status;
  useEffect(() => {
    if (isBorderActiveStatus === "SUSPENDED" || timer < 1) {
      setClickedRunners([]);
    }
  }, [isBorderActiveStatus, timer]);

  const [WinnerRunner, setWinnerRunner] = useState({});

  /* Blink color */
  useEffect(() => {
    const newChangedPrices = {};
    oddsData?.forEach((item) => {
      item?.runners?.forEach((runner, runnerIndex) => {
        if (runner?.status === "WINNER") {
          newChangedPrices[`${runner?.id}-${runnerIndex}`] = true;
          setWinnerRunner({ ...newChangedPrices });
          setTimeout(() => {
            newChangedPrices[`${runner?.id}-${runnerIndex}`] = false;
            setWinnerRunner({ ...newChangedPrices });
          }, 300);
        }
      });
    });
  }, [oddsData, timer]);

  useEffect(() => {
    let totalWin = 0;
    if (totalPlaceOrder && totalPlaceOrder.length > 0) {
      oddsData?.forEach((games) => {
        games?.runners?.forEach((runner) => {
          if (runner?.status === "WINNER") {
            const winnerFilter = totalPlaceOrder?.filter(
              (order) => order?.id === runner?.id && runner?.status === "WINNER"
            );

            const looserFilter = totalPlaceOrder?.filter(
              (order) => order?.id === runner?.id && runner?.status === "ACTIVE"
            );

            let WinnerSum = 0;
            let looserSum = 0;
            if (looserFilter) {
              for (const looser of looserFilter) {
                looserSum = looserSum + -looser?.totalSize;
              }
            }

            if (winnerFilter) {
              for (const winner of winnerFilter) {
                WinnerSum +=
                  winner?.price * winner?.totalSize - winner?.totalSize;
              }
            }

            totalWin += looserSum + WinnerSum;
          }
        });
      });
      localStorage.setItem("totalWin", totalWin.toString());
    } else {
      const storedTotalWin = localStorage.getItem("totalWin");
      if (storedTotalWin) {
        totalWin = parseFloat(storedTotalWin);
      }
    }
  }, [oddsData, totalPlaceOrder]);

  return (
    <>
      <div className="">
        <div className="IZi6anh0l0XCig_RhoF_">
          <div>
            <div>
              <div className="bseTNUfpf1We9ygRGnGP">
                <iframe
                  allow="fullscreen;"
                  src={url}
                  style={{
                    left: 0,
                    top: 0,
                    height: "100%",
                    border: 0,
                    overflowClipMargin: "clip !important",
                    overflow: "clip !important",
                  }}
                ></iframe>
              </div>
              {eventIdParams == "10004" || eventIdParams == "10005" ? (
                <AmarAkbarAnthony
                  WinnerRunner={WinnerRunner}
                  clickedRunners={clickedRunners}
                  data={oddsData}
                  handlePlaceBet={handlePlaceBet}
                  timer={timer}
                />
              ) : null}
              {eventIdParams === "10006" && oddsData?.length > 0 && (
                <BollywoodCasino
                  WinnerRunner={WinnerRunner}
                  clickedRunners={clickedRunners}
                  data={oddsData}
                  handlePlaceBet={handlePlaceBet}
                  timer={timer}
                />
              )}
              {eventIdParams === "10001" && <LuckySeven />}
            </div>
          </div>
          <div className="df2usAO24F5Qe9k7Y0dH" style={{ height: "8em" }}>
            <PlaceBet
              totalSize={totalSize}
              placeBetValue={placeBetValue}
              setTotalSize={setTotalSize}
              setIsOpenBetEdit={setIsOpenBetEdit}
              price={price}
              setClickedRunners={setClickedRunners}
              setPlaceBetValue={setPlaceBetValue}
              timer={timer}
              data={oddsData}
            />
          </div>
          <h3
            style={{
              padding: "4px",
            }}
          >
            {timer > 0 ? timer : 0}
          </h3>
          <h3
            style={{
              padding: "4px",
            }}
          >
            Total Bet: {totalOrderPlaced}
          </h3>
          <h3
            style={{
              padding: "4px",
            }}
          >
            Total Win: {storedTotalWin > 0 ? storedTotalWin : 0}
          </h3>
        </div>
      </div>

      {/* <!--  Bet slip buttons -->*/}
      {isOpenBetEdit && (
        <BetSlip
          totalSize={totalSize}
          price={price}
          setTotalSize={setTotalSize}
          setIsOpenBetEdit={setIsOpenBetEdit}
        />
      )}
      <div className="sc-fmzyuX bxpLFZ">
        <div className="sc-cspYLC beuanj"></div>
      </div>
      <Toaster containerStyle={{ top: "40px" }} />
    </>
  );
};

export default DiamondCasino;
