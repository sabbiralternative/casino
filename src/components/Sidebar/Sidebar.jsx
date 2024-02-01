import { useRef } from "react";
import CloseModalClickOutside from "../../hooks/CloseModalClickOutside";
import useDiamondCasinoName from "../../hooks/useDiamondCasinoName";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ sidebar, setSidebar }) => {
  const { diamondCasinoNav } = useDiamondCasinoName();
  const leftMenuRef = useRef();
  CloseModalClickOutside(leftMenuRef, () => {
    setSidebar(false);
  });
  const navigate = useNavigate();
  const saveGameDetails = (games) => {
    
    setSidebar(false);
    navigate(`/${games?.eventId}`);
  };
  return (
    <div>
      <div
        className="sc-xwuxA gVEPyV"
        style={{ transform: `translateX(${sidebar ? "0" : "-17"}em)` }}
        ref={leftMenuRef}
      >
        {/*       <!-- translateX(0em) menu open --> */}
        <div className="sc-fPgHrj LjQWv">
          <img
            src="https://nar-fg.cchhllpp.net/prd/images/hilo/mobile/asideLogo.webp"
            alt=""
            className="sc-jJcwTH jgOHIE"
          />
        </div>
        <div className="sc-cepbVR hgJfd">
          <Link 
          to='/'
          onClick={() => setSidebar(false)}
          className="sc-etKGGb bhWlty">
            <span className="sc-cDltVh kWWYqr">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="var(--asideIconColor)"
                stroke="var(--asideIconBorderColor)"
                strokeWidth="1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.035 19.0198V19.0187V16.5725C15.035 16.2325 14.8989 15.9066 14.6571 15.6666C14.4153 15.4265 14.0876 15.2918 13.7461 15.2918H11.4467C10.7359 15.2918 10.1578 15.8642 10.1578 16.5725V18.9103L10.1371 18.9172L10.1363 19.0247C10.133 19.4804 9.75959 19.85 9.29784 19.85H7.76494C6.31971 19.85 5.15 18.6872 5.15 17.2551V10.2953C5.16348 9.74451 5.42586 9.22859 5.86509 8.89061L5.8651 8.89064L5.86735 8.88884L11.082 4.71469L11.0821 4.71476L11.0861 4.71129C11.932 3.98358 13.1816 3.96105 14.0536 4.65787L14.054 4.65823L19.3891 8.8882C19.8082 9.23677 20.05 9.75136 20.05 10.2935V17.2623C20.05 17.9494 19.7746 18.6085 19.2842 19.0941C18.7938 19.5797 18.1286 19.8518 17.4354 19.85H17.4351H15.8664C15.6445 19.85 15.432 19.7621 15.276 19.6061C15.12 19.4501 15.0334 19.2391 15.035 19.0198Z"></path>
              </svg>
            </span>
            <span className="sc-einZSS gkiEbN">Home</span>
          </Link>
          <div className="sc-etKGGb bhWlty">
            <span className="sc-cDltVh kWWYqr">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="var(--asideIconColor)"
                stroke="var(--asideIconBorderColor)"
                strokeWidth="1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3.48405 12.1519H3.63405V12.0019C3.63405 6.47251 8.08845 2.00078 13.5177 2.15382C18.519 2.29588 22.7074 6.58344 22.8463 11.7172C22.9958 17.2906 18.6266 21.85 13.2401 21.85C11.0103 21.85 8.97285 21.0739 7.35076 19.7616L7.34902 19.7602C6.91376 19.4185 6.88041 18.7342 7.27703 18.3277C7.61278 17.9836 8.13278 17.9545 8.50681 18.2512C9.81149 19.3048 11.4595 19.9282 13.2401 19.9282C17.555 19.9282 21.0334 16.3125 20.9782 11.889V11.8889C20.923 7.67843 17.4677 4.13239 13.3506 4.07568L13.3505 4.07568C9.01406 4.019 5.50206 7.58939 5.50206 12.0019V12.1519H5.65206H7.59244C7.94125 12.1519 8.12304 12.5876 7.87533 12.8414L7.87514 12.8416L4.85094 15.9519C4.85088 15.952 4.85082 15.9521 4.85075 15.9521C4.69287 16.1137 4.45408 16.1137 4.2962 15.9521C4.29613 15.9521 4.29607 15.952 4.29601 15.9519L1.27181 12.8416L1.27183 12.8416L1.26995 12.8398C1.01426 12.5859 1.19513 12.1519 1.54367 12.1519H3.48405ZM13.6321 12.1575V12.2418L13.7042 12.2856L16.8255 14.1849C16.8256 14.1849 16.8257 14.185 16.8258 14.1851C17.1342 14.3749 17.2439 14.7951 17.056 15.1263C16.8698 15.4435 16.4641 15.551 16.1468 15.3617C16.1467 15.3616 16.1465 15.3615 16.1464 15.3614L12.7659 13.3072C12.7658 13.3072 12.7657 13.3071 12.7656 13.3071C12.4851 13.1345 12.3061 12.8165 12.3061 12.4796V8.39153C12.3061 8.01542 12.611 7.70835 12.9691 7.70835C13.3286 7.70835 13.6321 8.01673 13.6321 8.38042V12.1575Z"></path>
              </svg>
            </span>
            <span className="sc-einZSS gkiEbN">History</span>
          </div>

          <div className="sc-etKGGb bhWlty">
            <span className="sc-cDltVh kWWYqr">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="var(--asideIconColor)"
                stroke="var(--asideIconBorderColor)"
                strokeWidth="1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.67736 7.81606L7.81604 6.67738C8.12129 6.37213 8.6162 6.37213 8.92146 6.67738L21.621 19.377C21.9263 19.6822 21.9263 20.1771 21.621 20.4824L20.4824 21.6211C20.1771 21.9263 19.6822 21.9263 19.3769 21.6211L6.67736 8.92148C6.3721 8.61623 6.3721 8.12132 6.67736 7.81606ZM2.37894 12.1145L4.13168 10.3618C4.43693 10.0565 4.93185 10.0565 5.2371 10.3618L8.83202 13.9567C9.13727 14.2619 9.13727 14.7568 8.83202 15.0621L7.07928 16.8148C6.77402 17.1201 6.27911 17.1201 5.97386 16.8148L2.37894 13.2199C2.07369 12.9147 2.07369 12.4197 2.37894 12.1145ZM10.3617 4.13168L12.1144 2.37894C12.4197 2.07369 12.9146 2.07369 13.2199 2.37894L16.8148 5.97386C17.12 6.27911 17.12 6.77402 16.8148 7.07928L15.062 8.83202C14.7568 9.13727 14.2619 9.13727 13.9566 8.83202L10.3617 5.2371C10.0564 4.93185 10.0564 4.43693 10.3617 4.13168Z"></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 21C2 20.4477 2.44772 20 3 20H11C11.5523 20 12 20.4477 12 21C12 21.5523 11.5523 22 11 22H3C2.44772 22 2 21.5523 2 21Z"
                ></path>
              </svg>
            </span>
            <span className="sc-einZSS gkiEbN">Rules</span>
          </div>

          <h3 className="sc-WsMwQ ceOqOo">Similar Games</h3>
          <div className="sc-cMRZhK lcUxUW">
            <div className="sc-deXhhX fyfjSh">
              {diamondCasinoNav?.map((games, i) => {
                return (
                  <div
                    onClick={() => saveGameDetails(games)}
                    key={i}
                    className="sc-dQEtJz kjzsDm"
                  >
                    <div className="sc-imwsjW iYUjrP">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 24 24"
                        fill="var(--asideIconColor)"
                        stroke="var(--asideIconBorderColor)"
                        strokeWidth="1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M13.9148 4.77746C13.9671 4.58778 14.1784 4.45557 14.4013 4.51368L14.5274 4.02984L14.4013 4.51368L23.2112 6.81023C23.4293 6.86709 23.538 7.07452 23.4873 7.25857L19.9167 20.2225C19.8645 20.4122 19.6531 20.5444 19.4302 20.4863L10.6203 18.1898C10.4022 18.1329 10.2936 17.9255 10.3442 17.7414L13.9148 4.77746ZM10.0852 4.77746L10.5561 6.48718L7.6535 17.0258C7.40365 17.9329 7.59177 18.8508 8.0865 19.5696L4.56977 20.4863C4.34689 20.5444 4.13554 20.4122 4.0833 20.2225L0.512727 7.25857C0.462035 7.07452 0.570652 6.86709 0.788794 6.81023L9.59871 4.51368C9.8216 4.45557 10.0329 4.58778 10.0852 4.77746Z"></path>
                      </svg>
                    </div>
                    <span className="sc-kCMKrZ bEodAn">{games?.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
