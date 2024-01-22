import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import axios from "axios";
import UseTokenGenerator from "./hooks/UseTokenGenerator";
import UseEncryptData from "./hooks/UseEncryptData";
import BetSlip from "./components/BetSlip/BetSlip";
import PlaceBet from "./components/BetSlip/PlaceBet";
import { Toaster } from "react-hot-toast";
import UseBalance from "./hooks/UseBalance";
import useContextState from "./hooks/useContextState";

const App = () => {
  const [fontSize, setFontSize] = useState("");
  const [sidebar, setSidebar] = useState(false);
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);
  const [placeBetValue, setPlaceBetValue] = useState({});
  const [price, setPrice] = useState("");
  const [totalSize, setTotalSize] = useState("");
  const [isOpenBetEdit, setIsOpenBetEdit] = useState(false);
  const [clickedRunners, setClickedRunners] = useState([]);
  const { token } = useContextState();
  const [balance] = UseBalance();
  const storedTotalWin = localStorage.getItem("totalWin");
  const [totalPlaceOrder, setTotalPlaceOrder] = useState([]);
  const [isWinner, setIsWinner] = useState(false);

  useEffect(() => {
    if (data?.length > 0) {
      const getTotalPlaceOrder = JSON.parse(
        localStorage.getItem("totalBetPlace")
      );
      if(!getTotalPlaceOrder){
        localStorage.removeItem('totalWin')
      }
      const filterOrderByEventId = getTotalPlaceOrder?.filter(
        (order) => order?.eventId === data[0]?.eventId
      );
      setTotalPlaceOrder(filterOrderByEventId);
    }
  }, [data]);

  useEffect(() => {
    if (data?.length > 0) {
      const roundId = localStorage.getItem("roundId");
      if (roundId != data[0]?.roundId) {
        localStorage.removeItem("totalBetPlace");
      }
      localStorage.setItem("roundId", data[0]?.roundId);
    }
  }, [data]);

  let totalOrderPlaced = 0;
  if (totalPlaceOrder) {
    for (const order of totalPlaceOrder) {
      totalOrderPlaced = parseFloat(
        (totalOrderPlaced + order?.totalSize).toFixed(2)
      );
    }
  }

  useEffect(() => {
    const deviceWidth = (window.innerWidth * 0.04266674418).toFixed(4);
    setFontSize(deviceWidth);
  }, []);

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
      const res = await axios.get(
        `${"https://cache.api7.live/api/exchange/diamond/odds/event"}/${1000}/${10004}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      if (data.success) {
        setData(data.result);
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
  const roundIdForTimer = data[0]?.roundId;
  useEffect(() => {
    const roundStart = data[0]?.roundStart;
    const counter = data[0]?.counter;
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

  const isBorderActiveStatus = data[0]?.status;
  useEffect(() => {
    if (isBorderActiveStatus === "SUSPENDED" || timer < 1) {
      setClickedRunners([]);
    }
  }, [isBorderActiveStatus, timer]);

  const [WinnerRunner, setWinnerRunner] = useState({});

  /* Blink color */
  useEffect(() => {
    const newChangedPrices = {};
    data?.forEach((item) => {
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
  }, [data, timer]);

  useEffect(() => {
    let totalWin = 0;

    // Check if totalPlaceOrder is available
    if (totalPlaceOrder && totalPlaceOrder.length > 0) {
      // console.log({totalPlaceOrder});
      data?.forEach((games) => {
        games?.runners?.forEach((runner) => {
          // if (runner?.status === 'WINNER' && runner?.status === 'ACTIVE'){
            if(runner?.status === "WINNER"){
              setIsWinner(true);
            }else{
              setIsWinner(false);
            }
        

          const winnerFilter = totalPlaceOrder?.filter(
            (order) => order?.id === runner?.id && runner?.status === "WINNER"
          );

          const looserFilter = totalPlaceOrder?.filter(
            (order) => order?.id === runner?.id && runner?.status === "ACTIVE"
          );

          let WinnerSum = 0;
          let looserSum = 0;
          // console.log({ looserFilter });
          // console.log({ winnerFilter });
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
          // }
        });
      });
      localStorage.setItem("totalWin", totalWin.toString()); //
    } else {
      const storedTotalWin = localStorage.getItem("totalWin");
      if (storedTotalWin) {
        totalWin = parseFloat(storedTotalWin);
      }
    }
  }, [data, totalPlaceOrder]);

  return (
    <div
      className="App AppMobile AppGame"
      style={{ fontSize: `${fontSize}px` }}
    >
      {/*   <!-- device width x 0.04266674418 , answer value upto 4 decimal--> */}
      <div className="AppInner" style={{ fontSize: `${fontSize}px` }}>
        {/*  <!-- device width x 0.04266674418,  answer value upto 4 decimal --> */}
        <div className="cMnblziyKBAjFO7y0HNB">
          <div className="IvCnwQ5KzFVqbGS7Gn23">
            <div className="blurred">
              <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
            </div>
            <div>
              <div className="sc-cPyLVi cyGWxV">
                <div className="sc-eXAmlR kzOxAO">
                  <div className="sc-dovdUy hebIcs">
                    <span
                      onClick={() => setSidebar(!sidebar)}
                      className="sc-fwwElh dGZMLl"
                    >
                      <svg
                        fill="rgb(var(--white))"
                        width="100%"
                        height="100%"
                        viewBox="0 0 24 24"
                        data-testid=""
                      >
                        <path d="M5.81216 17.025C5.56528 17.025 5.35669 16.9395 5.18638 16.7686C5.01606 16.5976 4.93091 16.3883 4.93091 16.1405C4.93091 15.8926 5.01606 15.6844 5.18638 15.5156C5.35669 15.3469 5.56528 15.2625 5.81216 15.2625H18.1872C18.434 15.2625 18.6426 15.348 18.8129 15.5189C18.9833 15.6898 19.0684 15.8992 19.0684 16.147C19.0684 16.3948 18.9833 16.6031 18.8129 16.7719C18.6426 16.9406 18.434 17.025 18.1872 17.025H5.81216ZM5.81216 12.8812C5.56528 12.8812 5.35669 12.7958 5.18638 12.6248C5.01606 12.4539 4.93091 12.2445 4.93091 11.9967C4.93091 11.7489 5.01606 11.5406 5.18638 11.3719C5.35669 11.2031 5.56528 11.1187 5.81216 11.1187H18.1872C18.434 11.1187 18.6426 11.2042 18.8129 11.3751C18.9833 11.5461 19.0684 11.7555 19.0684 12.0033C19.0684 12.2511 18.9833 12.4594 18.8129 12.6281C18.6426 12.7969 18.434 12.8812 18.1872 12.8812H5.81216ZM5.81216 8.73749C5.56528 8.73749 5.35669 8.65202 5.18638 8.48108C5.01606 8.31013 4.93091 8.10076 4.93091 7.85296C4.93091 7.60514 5.01606 7.39374 5.18638 7.21874C5.35669 7.04374 5.56528 6.95624 5.81216 6.95624H18.1872C18.434 6.95624 18.6426 7.04483 18.8129 7.22202C18.9833 7.39922 19.0684 7.61172 19.0684 7.85952C19.0684 8.10733 18.9833 8.31561 18.8129 8.48436C18.6426 8.65311 18.434 8.73749 18.1872 8.73749H5.81216Z"></path>
                      </svg>
                    </span>
                  </div>
                  <div className="sc-dovdUy hebIcs">
                    <div className="sc-gmgFlS bksTTY">
                      <div className="sc-fiCwlc egxImh"></div>
                    </div>
                  </div>
                </div>
                <div className="sc-eXAmlR kzOxAO">
                  <div className="sc-nZgfj dCDjpI">
                    <div className="sc-dovdUy bCchIz">
                      <div className="sc-jSoCLE dwyFfV">ID :</div>
                      <div className="sc-jSoCLE beVjVm">{data[0]?.roundId}</div>
                      {/*    <!-- result0 >> roundId --> */}
                    </div>
                    <div className="sc-dovdUy bCchIz">
                      <div className="sc-jSoCLE uFgqG">
                        <div className="sc-dSIIpw iyQpmJ">
                          <div
                            data-testid="amount-box"
                            className="sc-kzqdkY fZXvkF"
                            style={{ direction: "ltr" }}
                          >
                            <span
                              data-testid="amount-box_amount"
                              className="sc-bDpDS fPaONI"
                            >
                              {balance?.result?.availBalance}
                            </span>
                            <b
                              data-testid="amount-box_currency"
                              className="sc-bVHCgj eALdQB"
                            >
                              INR
                            </b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*      <!-- backdrop menu open --> */}

            {sidebar && (
              <div
                data-testid="glass-backdrop"
                className="sc-cgjDci aZvWD"
                style={{ zIndex: 5, top: "0px", bottom: "0px" }}
              ></div>
            )}
            {/*       <!-- backdrop menu open  --> */}

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

                    <div
                      className="ufCz6c1IqcZ7Cx4Or7Pi "
                      style={{ height: "3.4em" }}
                    >
                      {data[0]?.runners?.map((runner, i) => {
                        const isRunnerClicked = clickedRunners.includes(
                          runner.id
                        );
                        return (
                          <div
                            onClick={() => handlePlaceBet(data[0], runner)}
                            key={runner?.id}
                            className={`QIGYZANQUJzivDLQDHjm ${
                              isRunnerClicked && data[0]?.status === "OPEN"
                                ? "border-green-color"
                                : ""
                            } 
                            ${
                              WinnerRunner[`${runner?.id}-${i}`]
                                ? "border-green-color"
                                : ""
                            } 
                            ${
                              data[0]?.status === "OPEN" && timer > 0
                                ? ""
                                : "disabled"
                            } `}
                            style={{ width: "6.8em" }}
                            data-combination="3"
                            data-testid=""
                          >
                            <span className="DYt62YNc0fa3zJ7_yedE">
                              {" "}
                              {runner?.name?.substring(3)}
                            </span>
                            <div className="ji7Xi0_VRN0zb5QA2gcA">
                              <div className="ji7Xi0_VRN0zb5QA2gcA">
                                x{runner?.back[0]?.price}
                              </div>
                            </div>
                            {/*   <!-- result0 >> runners0 >> back --> */}
                          </div>
                        );
                      })}
                    </div>

                    <div
                      className="ufCz6c1IqcZ7Cx4Or7Pi "
                      style={{ height: "5.8em" }}
                    >
                      {data?.slice(1, 4)?.map((games) =>
                        games?.runners?.map((runner, i) => {
                          const isRunnerClicked = clickedRunners.includes(
                            runner.id
                          );
                          return (
                            <div
                              onClick={() => {
                                handlePlaceBet(games, runner);
                              }}
                              key={runner?.id}
                              className={`${
                                isRunnerClicked && data[0]?.status === "OPEN"
                                  ? "border-green-color"
                                  : ""
                              } QIGYZANQUJzivDLQDHjm ${
                                runner?.name === "Red"
                                  ? "Jd_FQ2o2GATSrBeLJ2Rw"
                                  : ""
                              } ${
                                data[0]?.status === "OPEN" && timer > 0
                                  ? ""
                                  : "disabled"
                              }  ${
                                WinnerRunner[`${runner?.id}-${i}`]
                                  ? "border-green-color"
                                  : ""
                              } `}
                              style={{
                                width: "6.8em",
                                height: "2.1875em",
                              }}
                              data-combination="3"
                              data-testid=""
                            >
                              <span className="DYt62YNc0fa3zJ7_yedE">
                                {runner?.name}
                              </span>
                              <div className="ji7Xi0_VRN0zb5QA2gcA">
                                x{runner?.back[0]?.price}
                              </div>
                              {/*  <!-- result1 >> runners0 >> back --> */}
                            </div>
                          );
                        })
                      )}
                    </div>

                    <div className="B8EAcQGrnzn_Hl8mH6Hk">
                      <div className="TbDJtMH0Lesra_HZpmsu">
                        <span className="PzV26OxN2WKtuj8Y9FHR"></span>
                        <span
                          className={`dZ2gRLY67cqVBgNjZAFl  ${
                            data[0]?.status === "OPEN" && timer > 0
                              ? ""
                              : "disabled"
                          }`}
                        >
                          x{data[4]?.runners[0]?.back[0]?.price}
                        </span>
                        <span className="g4jdfxv4yJMhUCeEyYRD"></span>
                      </div>
                      <div className="HIZjOTeNz60Nkxq2F8yF">
                        {data[4]?.runners?.map((runner, i) => {
                          const isRunnerClicked = clickedRunners.includes(
                            runner.id
                          );
                          return (
                            <div
                              onClick={() => handlePlaceBet(data[4], runner)}
                              key={runner?.id}
                              className={`eiFJV7HiEPLhZOWBIVL_ ${
                                isRunnerClicked && data[0]?.status === "OPEN"
                                  ? "border-green-color"
                                  : ""
                              } ${
                                data[0]?.status === "OPEN" && timer > 0
                                  ? ""
                                  : "disabled"
                              }  ${
                                WinnerRunner[`${runner?.id}-${i}`]
                                  ? "border-green-color"
                                  : ""
                              } `}
                              data-combination="09"
                              style={{ width: "7.2%" }}
                            >
                              <span className="phht8116FLncA8Oh2SMh">
                                {runner?.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
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
                    data={data}
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
                  Total Win: { storedTotalWin > 0 ? storedTotalWin : 0 }
                </h3>
              </div>
            </div>
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
      </div>
      <Toaster containerStyle={{ top: "40px" }} />
    </div>
  );
};

export default App;
