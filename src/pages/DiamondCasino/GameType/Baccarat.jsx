import getClassName from "../../../hooks/getClassName";

const Baccarat = ({
  data,
  clickedRunners,
  handlePlaceBet,
  WinnerRunner,
  timer,
  placeBetBorder,
}) => {
  const modifiedFirstData = data[0]?.runners;
  const modifiedRunners = [...modifiedFirstData];
  [modifiedRunners[1], modifiedRunners[2]] = [
    modifiedRunners[2],
    modifiedRunners[1],
  ];
  const oddsName = ["Perf.", "Big", "Small", "Either"];
  return (
    <>
      <div className="ufCz6c1IqcZ7Cx4Or7Pi" style={{ height: "3.3em" }}>
        {modifiedRunners?.map((runner) => {
          return (
            <div
              onClick={() => handlePlaceBet(data[0], runner)}
              key={runner?.id}
              className={`
              QIGYZANQUJzivDLQDHjm
              ${getClassName(
                clickedRunners,
                runner,
                data[0],
                WinnerRunner,
                placeBetBorder,
                timer
              )} 
                `}
              style={{ width: "6.8em" }}
              data-combination="3"
              data-testid=""
            >
              <span className="DYt62YNc0fa3zJ7_yedE">{runner?.name}</span>
              <div className="ji7Xi0_VRN0zb5QA2gcA">
                x{runner?.back[0]?.price}
              </div>
              {/* <!-- result0 >> runners0 >> back --> */}
            </div>
          );
        })}
      </div>

      <div className="ufCz6c1IqcZ7Cx4Or7Pi" style={{ height: "3.3em" }}>
        {data?.slice(1, 3)?.map((games) =>
          games.runners?.map((runner) => {
            return (
              <div
                onClick={() => handlePlaceBet(games, runner)}
                key={runner?.id}
                className={`QIGYZANQUJzivDLQDHjm
                ${getClassName(
                  clickedRunners,
                  runner,
                  data[0],
                  WinnerRunner,
                  placeBetBorder,
                  timer
                )}
                `}
                style={{ width: "10.5em" }}
                data-combination="3"
                data-testid=""
              >
                <span className="DYt62YNc0fa3zJ7_yedE">{runner?.name}</span>
                <div className="ji7Xi0_VRN0zb5QA2gcA">
                  x{runner?.back[0]?.price}
                </div>
                {/*  <!-- result1 >> runners0 >> back --> */}
              </div>
            );
          })
        )}
      </div>

      <div className="ufCz6c1IqcZ7Cx4Or7Pi" style={{ height: "3.3em" }}>
        {data?.slice(3)?.map((games, i) =>
          games?.runners?.map((runner) => {
            return (
              <div
                onClick={() => handlePlaceBet(games, runner)}
                key={runner?.id}
                className={`QIGYZANQUJzivDLQDHjm border-gold-color
                ${getClassName(
                  clickedRunners,
                  runner,
                  data[0],
                  WinnerRunner,
                  placeBetBorder,
                  timer
                )}
                `}
                style={{ width: "5em", height: "2.1875em" }}
                data-combination="3"
                data-testid=""
              >
                <span className="DYt62YNc0fa3zJ7_yedE">{oddsName[i]}</span>
                <div className="ji7Xi0_VRN0zb5QA2gcA">
                  x{runner?.back[0]?.price}
                </div>
                {/*  <!-- result3 >> runners0 >> back --> */}
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Baccarat;
