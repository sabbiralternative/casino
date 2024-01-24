import { useEffect, useState } from "react";
import UseBalance from "../hooks/UseBalance";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import useContextState from "../hooks/useContextState";
const Main = () => {
  const [fontSize, setFontSize] = useState("");
  const [sidebar, setSidebar] = useState(false);
  const [balance] = UseBalance();
  const { oddsData } = useContextState();
  const storageBalance = localStorage.getItem('balance')
  
  // console.log(storageBalance);
  useEffect(() => {
    const deviceWidth = (window.innerWidth * 0.04266674418).toFixed(4);
    setFontSize(deviceWidth);
    localStorage.removeItem("balance");
    localStorage.setItem(
      "balance",
      JSON.stringify(balance?.result?.availBalance)
    );
  }, [balance]);

 

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
                      <div className="sc-jSoCLE beVjVm">
                        {oddsData[0]?.roundId}
                      </div>
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
                              {storageBalance && parseFloat(storageBalance).toFixed(2)}
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

            <Outlet />
          </div>
        </div>

        <div className="sc-fmzyuX bxpLFZ">
          <div className="sc-cspYLC beuanj"></div>
        </div>
      </div>
    </div>
  );
};

export default Main;
