const RecentWinner = ({ data }) => {
  return (
    <div className="HV96yYgACaO7yk_UDHSY">
      <div className="pyTEW2ubUOpnmXDOnlXx">
        <div className="indiana-scroll-container indiana-scroll-container--hide-scrollbars">
          <div className="IeEppAzLrYw_D50itAoP">
            {data[0]?.recent_winner?.map(({ winner }, i) => {
              return (
                <div
                  key={i}
                  className={`fSaeCExJe5Hg1sSPIiTA   
                   ${winner?.charAt(0) === "L" ? "resultRed" : ""}
                   ${winner?.charAt(0) === "H" ? "resultGreen" : ""}
                   ${winner?.charAt(0) === "7" ? "resultYellow" : ""}
                   
                   `}
                >
                  <span>{winner?.charAt(0)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentWinner;
