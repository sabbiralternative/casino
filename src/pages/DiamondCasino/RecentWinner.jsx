const RecentWinner = ({ data, eventId }) => {
  // console.log(eventId);
  const getClassName = (id, alphabet) => {
    return `
    ${id === "10001" && alphabet === "L" ? "resultRed" : ""}
    ${id === "10001" && alphabet === "H" ? "resultGreen" : ""}
    ${id === "10001" && alphabet === "7" ? "resultYellow" : ""}
    ${id === "10004" && alphabet === "A" ? "resultRed" : ""}
    ${id === "10004" && alphabet === "B" ? "resultGreen" : ""}
    ${id === "10004" && alphabet === "C" ? "resultYellow" : ""}
    ${id === "10007" && alphabet === "D" ? "resultRed" : ""}
    ${id === "10007" && alphabet === "T" ? "resultGreen" : ""}
   
    
    
    `;
  };
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
                  ${getClassName(eventId, winner?.charAt(0))}
                   
                   
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
