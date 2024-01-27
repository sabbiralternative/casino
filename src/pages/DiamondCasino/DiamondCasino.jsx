import { useEffect, useState } from "react";
import axios from "axios";
import BetSlip from "../../components/BetSlip/BetSlip";
import PlaceBet from "../../components/BetSlip/PlaceBet";
import useContextState from "../../hooks/useContextState";
import { API } from "../../utils/Constant";
import AmarAkbarAnthony from "./GameType/AmarAkbarAnthony";
import BollywoodCasino from "./GameType/BollywoodCasino";
import LuckySeven from "./GameType/LuckySeven";
import { useParams } from "react-router-dom";
import useGetVideo from "../../hooks/useGetVideo";
import Loader from "../../components/Loader/Loader";


const DiamondCasino = () => {
  const { eventId } = useParams();
  const [placeBetValue, setPlaceBetValue] = useState({});
  const [price, setPrice] = useState("");
  const [totalSize, setTotalSize] = useState("");
  const [isOpenBetEdit, setIsOpenBetEdit] = useState(false);
  const [clickedRunners, setClickedRunners] = useState([]);
  const { token, oddsData, setOddsData } = useContextState();
  const storedTotalWin = localStorage.getItem("totalWin");
  const [totalPlaceOrder, setTotalPlaceOrder] = useState([]);
  const { videoUrl } = useGetVideo();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (storedTotalWin > 0) {
      const balance = JSON.parse(localStorage.getItem("balance"));
      const newBalance = balance + parseFloat(storedTotalWin);
      localStorage.setItem("balance", JSON.stringify(newBalance));
    }
  }, [storedTotalWin]);

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

  /* Get odds */
  useEffect(() => {
    const getGameDetails = async () => {
      const res = await axios.get(`${API.odds}/${1000}/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
      // console.log(data);
      if (data.success) {
        setLoading(false);
        setOddsData(data.result);
      }
    };
    getGameDetails();
    const intervalId = setInterval(getGameDetails, 600);
    return () => clearInterval(intervalId);
  }, [setOddsData, token, eventId]);

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
  }, [roundIdForTimer]);
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
                WinnerSum += winner?.price * winner?.totalSize;
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
  // console.log(eventId);
  // console.log(oddsData);
  // console.log(oddsData);
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="">
        <div className="IZi6anh0l0XCig_RhoF_">
          <div>
            <div>
              <div className="bseTNUfpf1We9ygRGnGP">
                <iframe
                  allow="fullscreen;"
                  src={videoUrl && videoUrl}
                  style={{
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: "100%",
                    border: 0,
                    overflowClipMargin: "clip !important",
                    overflow: "clip !important",
                  }}
                ></iframe>
              </div>
              {(eventId == "10004" || eventId == "10005") &&
              oddsData?.length > 0 ? (
                <AmarAkbarAnthony
                  WinnerRunner={WinnerRunner}
                  clickedRunners={clickedRunners}
                  data={oddsData}
                  handlePlaceBet={handlePlaceBet}
                  timer={timer}
                />
              ) : null}
              {eventId === "10006" && oddsData?.length > 0 ? (
                <BollywoodCasino
                  WinnerRunner={WinnerRunner}
                  clickedRunners={clickedRunners}
                  data={oddsData}
                  handlePlaceBet={handlePlaceBet}
                  timer={timer}
                />
              ) : null}
              {(eventId === "10001" ||
                eventId === "10002" ||
                eventId === "10003") &&
                oddsData?.length > 0 && (
                  <LuckySeven
                    WinnerRunner={WinnerRunner}
                    clickedRunners={clickedRunners}
                    data={oddsData}
                    handlePlaceBet={handlePlaceBet}
                    timer={timer}
                  />
                )}
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
    </>
  );
};

export default DiamondCasino;
