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
import RecentWinner from "./RecentWinner";
import useFullScreenToggle from "../../hooks/useFullScreenToggle";
import DragonTigerLion from "./GameType/DragonTigerLion";

const DiamondCasino = () => {
  const { eventId } = useParams();
  const [placeBetValue, setPlaceBetValue] = useState({});
  const [price, setPrice] = useState("");
  const [totalSize, setTotalSize] = useState("");
  const [isOpenBetEdit, setIsOpenBetEdit] = useState(false);
  const [clickedRunners, setClickedRunners] = useState([]);
  const { token, oddsData, setOddsData, setShowTapToPlay, showTapToPlay } =
    useContextState();
  const storedTotalWin = localStorage.getItem("totalWin");
  const [totalPlaceOrder, setTotalPlaceOrder] = useState([]);
  const { videoUrl } = useGetVideo();
  const [loading, setLoading] = useState(true);
  const [showPlaceBet, setShowPlaceBet] = useState(false);
  const [showRecentWinner, setShowRecentWinner] = useState(true);
  const [placeBetBorder, setPlaceBetBorder] = useState({});
  const { toggleFullScreen } = useFullScreenToggle();
  const showLastWin = localStorage.getItem("showLastWinner");
  /* Hide the banner */
  useEffect(() => {
    const isTapToPlay = sessionStorage.getItem("isTapToPlay");
    if (!isTapToPlay) {
      setShowTapToPlay(true);
    }
    localStorage.removeItem("showLastWinner");
  }, [eventId]);

  /* Calculate the balance */
  useEffect(() => {
    if (storedTotalWin > 0) {
      const balance = JSON.parse(localStorage.getItem("balance"));
      const newBalance = balance + parseFloat(storedTotalWin);
      localStorage.setItem("balance", JSON.stringify(newBalance));
    }
  }, [storedTotalWin]);

  /* Successfully total bet sum */
  useEffect(() => {
    if (oddsData?.length > 0) {
      let getTotalPlaceOrder = localStorage.getItem("totalBetPlace");
      if (getTotalPlaceOrder && getTotalPlaceOrder !== "undefined") {
        getTotalPlaceOrder = JSON.parse(getTotalPlaceOrder);
        const filterOrderByEventId = getTotalPlaceOrder?.filter(
          (order) => order?.eventId === oddsData[0]?.eventId
        );
        setTotalPlaceOrder(filterOrderByEventId);
      }
    }
  }, [oddsData]);

  useEffect(() => {
    if (oddsData?.length > 0) {
      /* Get round-event-id from local Storage */
      const storedRoundEventId = localStorage.getItem("roundEventId");
      let existingRoundEventId = [];
      if (storedRoundEventId) {
        existingRoundEventId = JSON.parse(storedRoundEventId);
      }
      /* Get round-event-id from local Storage */

      /* Find current event-round-Id from localeStorage */
      const filterStoredRoundEvent = existingRoundEventId?.find(
        (item) => item?.eventId === oddsData[0]?.eventId
      );
      /* Find current event-round-Id from localeStorage */

      /* Get total bet from locale Storage */
      let parseTotalPlaceBet;
      const totalPlaceBet = localStorage.getItem("totalBetPlace");
      if (totalPlaceBet && totalPlaceBet !== "undefined") {
        parseTotalPlaceBet = JSON.parse(totalPlaceBet);
      }
      /* Get total bet from locale Storage */

      /* Remove placed bet if roundId change */
      if (filterStoredRoundEvent?.roundId !== oddsData[0]?.roundId) {
        const filterTotalPlaceBet = parseTotalPlaceBet?.filter(
          (item) => item.eventId !== oddsData[0]?.eventId
        );
        localStorage.setItem(
          "totalBetPlace",
          JSON.stringify(filterTotalPlaceBet)
        );
      }
      /* Remove placed bet if roundId change */

      /* Create round-event-id */
      const roundEventId = {
        eventId: oddsData[0]?.eventId,
        roundId: oddsData[0]?.roundId,
      };
      /* Create round-event-id */

      /* Remove duplicate event-round-id */
      const isEventIdAlreadyStored = existingRoundEventId.some(
        (existingEvent) => existingEvent.eventId === roundEventId.eventId
      );

      if (isEventIdAlreadyStored) {
        existingRoundEventId = existingRoundEventId.filter(
          (existingEvent) => existingEvent.eventId !== roundEventId.eventId
        );
      }
      /* Remove duplicate event-round-id */

      /* Set round-event-id */
      existingRoundEventId.push(roundEventId);
      if (existingRoundEventId) {
        localStorage.setItem(
          "roundEventId",
          JSON.stringify(existingRoundEventId)
        );
      }
      /* Set round-event-id */
    }
  }, [oddsData?.[0]?.roundId]);

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

      if (data.success) {
        setLoading(false);
        setOddsData(data.result);
      }
    };
    getGameDetails();
    const intervalId = setInterval(getGameDetails, 600);
    return () => clearInterval(intervalId);
  }, [setOddsData, token, eventId]);

  /* Handle place bet */
  const handlePlaceBet = (game, runner) => {
    setShowRecentWinner(false);
    setShowPlaceBet(true);
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
      name: runner?.name,
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

  /* Price */
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
    const timers = counter - (currentTimestamp - roundStart);
   
    setTimer(timers);
  
    if (timer > 0) {
    
      const interval = setInterval(() => {
        setTimer((prevCount) => prevCount - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [roundIdForTimer,timer]);
  // console.log(timer);
  /* Timer end */

  /* Remove border color */
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
      item?.runners?.forEach((runner) => {
        if (runner?.status === "WINNER") {
          newChangedPrices[`${runner?.id}-${runner?.name}`] = true;
          setWinnerRunner({ ...newChangedPrices });
          setTimeout(() => {
            newChangedPrices[`${runner?.id}-${runner?.name}`] = false;
            setWinnerRunner({ ...newChangedPrices });
          }, 300);
        }
      });
    });
  }, [oddsData, timer]);

  /* Total win and set red border color */
  useEffect(() => {
    const placedBetBorder = {};
    let totalWin = 0;
    setPlaceBetBorder({});

    if (totalPlaceOrder && totalPlaceOrder?.length > 0) {
      totalPlaceOrder?.forEach((singleOrder) => {
        placedBetBorder[`${singleOrder?.id}-${singleOrder?.name}`] = true;
        setPlaceBetBorder({ ...placedBetBorder });
      });
    }
    if (totalPlaceOrder && totalPlaceOrder.length > 0) {
      oddsData?.forEach((games) => {
        games?.runners?.forEach((runner) => {
          if (runner?.status === "WINNER") {
            localStorage.setItem("showLastWinner", "true");
            setPlaceBetBorder({});
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

            localStorage.setItem("totalWin", totalWin.toString());
          }
        });
      });
      // localStorage.setItem("totalWin", totalWin.toString());
    } else {
      const storedTotalWin = localStorage.getItem("totalWin");
      if (storedTotalWin) {
        totalWin = parseFloat(storedTotalWin);
      }
    }
  }, [oddsData, totalPlaceOrder]);

  /* hide show place bet and show recent winner */
  useEffect(() => {
    if (timer === 0) {
      setShowPlaceBet(false);
      setShowRecentWinner(true);
    }
  }, [timer]);

  let parseTotalPlaceBet;

  const totalPlaceBet = localStorage.getItem("totalBetPlace");

  if (totalPlaceBet && totalPlaceBet !== "undefined") {
    try {
      parseTotalPlaceBet = JSON.parse(totalPlaceBet);
      parseTotalPlaceBet = parseTotalPlaceBet?.filter(
        (placedBet) => placedBet?.eventId === oddsData[0]?.eventId
      );
    } catch (error) {
      console.error("Error parsing JSON:", error);
      // Handle the error, such as setting parseTotalPlaceBet to a default value
      // or displaying a message to the user.
    }
  }

  const [timerValue, setTimerValue] = useState("");
  const [newTimerValue, setNewTimerValue] = useState("");
  useEffect(() => {
    let calculatedTimerValue = "";
    if (timer > 5) {
      calculatedTimerValue = `PLACE YOUR BETS ${timer}`;
      setNewTimerValue(calculatedTimerValue);
      setTimerValue(calculatedTimerValue);
    } else if (timer <= 5 && timer > 0) {
      calculatedTimerValue = `BETS CLOSING ${timer}`;
    } else if (timer < 1) {
      calculatedTimerValue = `BETS CLOSED`;
      if (timerValue === "BETS CLOSED") {
        setTimerValue(calculatedTimerValue);
        setTimeout(() => {
          if (parseTotalPlaceBet?.length > 0) {
            setNewTimerValue("BETS ACCEPTED");
          } else {
            setNewTimerValue("WAIT FOR NEXT GAME");
          }
        }, 3000);

        return;
      }
    }

    setTimerValue(calculatedTimerValue);
    setNewTimerValue(calculatedTimerValue);
  }, [timer, timerValue, parseTotalPlaceBet]);



  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div
        onClick={toggleFullScreen}
        className="css-1lkepkh e1bi9tuq11"
        data-e2e="preloader"
        style={{ color: "rgb(255, 255, 255)" }}
      >
        <div
          className=" css-17pdoa6 e1bi9tuq0"
          style={{
            background: "rgb(0, 0, 0)",
            transform: `translateY(${showTapToPlay ? "0" : "-1200"}px)`,
          }}
        >
          <div
            className="css-1te3lh6 e1bi9tuq9"
            style={{
              backgroundImage:
                'url("https://conf.ezassets.io/CustomAssets/operator_background/newdragontiger150.jpg")',
            }}
          ></div>

          <div className="css-17zrqdz e1bi9tuq2">
            <span color="#ffffff" className="css-1fvtxkv e1bi9tuq10"></span>
            <p className="css-4lpehb e1bi9tuq1">Tap to play</p>
          </div>
        </div>
      </div>

      <div className="">
        <div className="IZi6anh0l0XCig_RhoF_">
          <div>
            <div>
              <div className={`bseTNUfpf1We9ygRGnGP `}>
                <iframe
                  allow="fullscreen;"
                  allowFullScreen={true}
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
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "transparent",
                  }}
                ></div>
              </div>
              <div
                className={`HV96yYgACaO7yk_UDHSY  marginBottom ${
                  timer > 0 ? "textBlink" : ""
                } `}
              >
                <div className={`${timer > 0 ? "openText" : "suspendedText"}`}>
                  {newTimerValue}
                </div>
              </div>
              {(eventId == "10004" || eventId == "10005") &&
              oddsData?.length > 0 ? (
                <AmarAkbarAnthony
                  WinnerRunner={WinnerRunner}
                  clickedRunners={clickedRunners}
                  data={oddsData}
                  handlePlaceBet={handlePlaceBet}
                  timer={timer}
                  placeBetBorder={placeBetBorder}
                />
              ) : null}
              {eventId === "10006" && oddsData?.length > 0 ? (
                <BollywoodCasino
                  WinnerRunner={WinnerRunner}
                  clickedRunners={clickedRunners}
                  data={oddsData}
                  handlePlaceBet={handlePlaceBet}
                  timer={timer}
                  placeBetBorder={placeBetBorder}
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
                    placeBetBorder={placeBetBorder}
                  />
                )}
              {eventId === "10007" && oddsData?.length > 0 && (
                <DragonTigerLion
                  WinnerRunner={WinnerRunner}
                  clickedRunners={clickedRunners}
                  data={oddsData}
                  handlePlaceBet={handlePlaceBet}
                  timer={timer}
                  placeBetBorder={placeBetBorder}
                />
              )}
              {showRecentWinner || timer < 1 ? (
                <RecentWinner data={oddsData} />
              ) : null}
            </div>
          </div>
          {showPlaceBet && timer > 0 && (
            <div className="df2usAO24F5Qe9k7Y0dH" style={{ height: "8em" }}>
              <PlaceBet
                setShowRecentWinner={setShowRecentWinner}
                setShowPlaceBet={setShowPlaceBet}
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
          )}
          {showLastWin && (
            <h3
              style={{
                padding: "4px",
              }}
            >
              Last Win: {storedTotalWin}
            </h3>
          )}
          {!showLastWin && (
            <h3
              style={{
                padding: "4px",
              }}
            >
              Total Bet: {totalOrderPlaced}
            </h3>
          )}
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
