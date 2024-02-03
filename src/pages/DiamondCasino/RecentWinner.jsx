import getAlphabetClassName from "../../hooks/getAlphabetClassName";

const RecentWinner = ({ data, eventId }) => {
  console.log(eventId);

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
                  ${getAlphabetClassName(eventId, winner?.charAt(0))}
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
