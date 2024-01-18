import { useEffect, useState } from "react";
import UseEncryptData from "../../hooks/UseEncryptData";
import UseTokenGenerator from "../../hooks/UseTokenGenerator";
import { token } from "../../hooks/token";
import toast from "react-hot-toast";

const PlaceBet = ({
  setTotalSize,
  price,
  totalSize,
  setIsOpenBetEdit,
  placeBetValue,
  setClickedRunners,
  setPlaceBetValue,
  timer,
  data
}) => {

  // console.log({ totalSize }, { price });
  const [disabledButton, setDisabledButton] = useState(true);
  const handleOrderBets = () => {
   
    const generatedToken = UseTokenGenerator();
    const encryptedData = UseEncryptData([
      {
        betDelay: placeBetValue?.betDelay,
        btype: placeBetValue?.btype,
        eventTypeId: placeBetValue?.eventTypeId,
        marketId: placeBetValue?.marketId,
        price: price ? price : placeBetValue?.price,
        selectionId: placeBetValue?.selectionId,
        side: placeBetValue?.side,
        totalSize: "totalSize",
        token: generatedToken,
        maxLiabilityPerMarket: placeBetValue?.maxLiabilityPerMarket,
        isBettable: placeBetValue?.isBettable,
        maxLiabilityPerBet: placeBetValue?.maxLiabilityPerBet,
      },
    ]);
    console.log(    {
      betDelay: placeBetValue?.betDelay,
      btype: placeBetValue?.btype,
      eventTypeId: placeBetValue?.eventTypeId,
      marketId: placeBetValue?.marketId,
      price: price ? price : placeBetValue?.price,
      selectionId: placeBetValue?.selectionId,
      side: placeBetValue?.side,
      totalSize: totalSize,
      token: generatedToken,
      maxLiabilityPerMarket: placeBetValue?.maxLiabilityPerMarket,
      isBettable: placeBetValue?.isBettable,
      maxLiabilityPerBet: placeBetValue?.maxLiabilityPerBet,
    },);
    fetch("https://api7.live/api/exchange/diamond/order", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(encryptedData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.success) {
          setPlaceBetValue({})
          setDisabledButton(false)
          toast.success("Bet has been placed !");
          setClickedRunners([]);
        } else {
          // setPlaceBetValue({})
          // setDisabledButton(false)
          toast.error(data?.error?.status[0]?.description);
          setClickedRunners([]);
        }
      });
  };

  useEffect(() => {
    if(price){
      setDisabledButton(false)
    }else{
      setDisabledButton(true)
    }
  }, [price]);

  useEffect(()=>{
    if(price){
      const double = (totalSize * price).toFixed(2);
      setTotalSize(double)
    }
  },[price])
  return (
    <div className="Rn1q6VYPn_O3TZmJDoCW mt">
      <div className="Gj7cxQiFrgtmDF3EqwTu">
        <div className="oL88ikpsAMrzkY1rbEfr false">
          <div className="IsN5Zihf_sfeW9NjYMQ2">
            <button
              onClick={() => setTotalSize((prev) => parseFloat(prev) - 10)}
              type="button"
              className="y1I4WDlnt9vlYF2ba3QV Y8loyqlGwOHP3Ksi2qvx"
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="rgba(var(--white), 0.32"
              >
                <defs>
                  <linearGradient
                    id="minusicon_epqzvbga4"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      stopColor="rgba(var(--white), 0.32"
                    ></stop>
                    <stop
                      offset="100%"
                      stopColor="rgba(var(--white), 0.32"
                    ></stop>
                  </linearGradient>
                </defs>
                <path d="M1.59538 14.8C1.13295 14.8 0.739884 14.6857 0.416185 14.4571C0.138728 14.1905 0 13.8667 0 13.4857V11.3143C0 10.9333 0.138728 10.6286 0.416185 10.4C0.739884 10.1333 1.13295 10 1.59538 10H22.4046C22.9133 10 23.3064 10.1333 23.5838 10.4C23.8613 10.6286 24 10.9333 24 11.3143V13.4857C24 13.8667 23.8613 14.1905 23.5838 14.4571C23.3064 14.6857 22.9133 14.8 22.4046 14.8H1.59538Z"></path>
              </svg>
            </button>
            <input type="hidden" />
            <div
              onClick={() => setIsOpenBetEdit(true)}
              style={{ cursor: "pointer" }}
              className="PYZc1_ZvbywJnihyX1Jd"
            >
              {totalSize }
            </div>
            <button
              onClick={() => setTotalSize((prev) => parseFloat(prev) + 10)}
              type="button"
              className="y1I4WDlnt9vlYF2ba3QV Y8loyqlGwOHP3Ksi2qvx"
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="rgba(var(--white), 0.32"
              >
                <defs>
                  <linearGradient
                    id="plusicon_wycg97cr3"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      stopColor="rgba(var(--white), 0.32"
                    ></stop>
                    <stop
                      offset="100%"
                      stopColor="rgba(var(--white), 0.32"
                    ></stop>
                  </linearGradient>
                </defs>
                <path
                  d="M11.197 24C10.8996 24 10.6468 23.9101 10.4387 23.7303C10.2602 23.5206 10.171 23.2659 10.171 22.9663V13.618H1.02602C0.728625 13.618 0.475836 13.5281 0.267658 13.3483C0.0892193 13.1386 0 12.8839 0 12.5843V11.1461C0 10.8464 0.0892193 10.6067 0.267658 10.427C0.475836 10.2172 0.728625 10.1124 1.02602 10.1124H10.171V1.03371C10.171 0.734083 10.2602 0.494383 10.4387 0.314608C10.6468 0.104869 10.8996 0 11.197 0H12.7584C13.0558 0 13.2937 0.104869 13.4721 0.314608C13.6803 0.494383 13.7844 0.734083 13.7844 1.03371V10.1124H22.974C23.2714 10.1124 23.5093 10.2172 23.6877 10.427C23.8959 10.6067 24 10.8464 24 11.1461V12.5843C24 12.8839 23.8959 13.1386 23.6877 13.3483C23.5093 13.5281 23.2714 13.618 22.974 13.618H13.7844V22.9663C13.7844 23.2659 13.6803 23.5206 13.4721 23.7303C13.2937 23.9101 13.0558 24 12.7584 24H11.197Z"
                  fill="rgba(var(--white), 0.32"
                ></path>
              </svg>
            </button>
          </div>
          <div className="GISE4h9RdcmUQwKksvZQ un4K2gtXjSRNha6klDqw">
            <span className="vwc9L43LXPxl8ND_D5l9">x2</span>
          </div>
        </div>
      </div>

      <div className="sc-dYOqWG cSgZWC" style={{ paddingTop: "5px" }}>
        <button
          onClick={() => setTotalSize(10)}
          data-quickbet="10"
          className="sc-ghzrUh hzbNIm"
          style={{ color: "rgb(var(--white))" }}
        >
          <span>10</span>
        </button>
        <button
          onClick={() => setTotalSize(100)}
          data-quickbet="100"
          className="sc-ghzrUh hzbNIm"
          style={{ color: "rgb(var(--white))" }}
        >
          <span>100</span>
        </button>
        <button
          onClick={() => setTotalSize(200)}
          data-quickbet="200"
          className="sc-ghzrUh hzbNIm"
          style={{ color: "rgb(var(--white))" }}
        >
          <span>200</span>
        </button>
        <button
          onClick={() => setTotalSize(1000)}
          data-quickbet="1000"
          className="sc-ghzrUh hzbNIm"
          style={{ color: "rgb(var(--white))" }}
        >
          <span>1K</span>
        </button>
        <button
          onClick={() => setTotalSize(2000)}
          data-quickbet="2000"
          className="sc-ghzrUh hzbNIm"
          style={{ color: "rgb(var(--white))" }}
        >
          <span>2K</span>
        </button>
      </div>

      <button
        onClick={handleOrderBets}
        className={`KhBsqBeTVLjPdBWq4U3M ${disabledButton || timer < 1 || data[0]?.status === "SUSPENDED" ? "disabled" : ""}`}
        data-testid="b-btn"
      >
        <div className="sc-dycYrt eTFmIv">
          <span className="i8NQLBA6iKZyRHyZGxwd">Bet</span>
        </div>
      </button>
    </div>
  );
};

export default PlaceBet;
