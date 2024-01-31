import getClassName from "../../../hooks/getClassName";

const DragonTigerLion = ({
  data,
  clickedRunners,
  handlePlaceBet,
  WinnerRunner,
  timer,
  placeBetBorder,
}) => {
  const dragonSectionName = ["Dragon", "Tie", "Tiger"];
  return (
    <>
      <div className="ufCz6c1IqcZ7Cx4Or7Pi" style={{ height: "3.3em" }}>
        {data[0]?.runners?.map((runner, i) => {
          return (
            <div
              onClick={() => handlePlaceBet(data[0], runner)}
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
              style={{ width: "6.8em" }}
              data-combination="3"
              data-testid=""
            >
              <span className="DYt62YNc0fa3zJ7_yedE">
                {dragonSectionName[i]}
              </span>
              <div className="ji7Xi0_VRN0zb5QA2gcA">
                x{runner?.back[0]?.price}
              </div>
              {/*   <!-- result0 >> runners0 >> back --> */}
            </div>
          );
        })}
      </div>

      <div className="TbDJtMH0Lesra_HZpmsu">
        <span className="PzV26OxN2WKtuj8Y9FHR"></span>
        <span className="dZ2gRLY67cqVBgNjZAFl">Dragon</span>
        <span className="g4jdfxv4yJMhUCeEyYRD"></span>
      </div>

      <div className="ufCz6c1IqcZ7Cx4Or7Pi" style={{ height: "3.3em" }}>
        {data[2]?.runners?.map((runner) => {
          return (
            <div
              onClick={() => handlePlaceBet(data[2], runner)}
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
              <span className="DYt62YNc0fa3zJ7_yedE">{runner?.name}</span>
              <div className="ji7Xi0_VRN0zb5QA2gcA">
                x{runner?.back[0]?.price}
              </div>
              {/*    <!-- result1 >> runners0 >> back --> */}
            </div>
          );
        })}

        {data[4]?.runners?.map((runner, i) => {
          return (
            <div
              onClick={() => handlePlaceBet(data[4], runner)}
              key={runner?.id}
              className={`QIGYZANQUJzivDLQDHjm ${
                i === 0 ? "Jd_FQ2o2GATSrBeLJ2Rw2" : "z6rwdalImNjtkvdnGBum2"
              }
          ${getClassName(
            clickedRunners,
            runner,
            data[0],
            WinnerRunner,
            placeBetBorder,
            timer
          )}
          `}
              style={{ width: "5.3em", height: "2.1875em" }}
              data-combination="3"
              data-testid=""
            >
              <span className="DYt62YNc0fa3zJ7_yedE">{runner?.name}</span>
              <div className="ji7Xi0_VRN0zb5QA2gcA">
                x{runner?.back[0]?.price}
              </div>
              {/* <!-- result2 >> runners0 >> back --> */}
            </div>
          );
        })}
      </div>

      <div className="TbDJtMH0Lesra_HZpmsu">
        <span className="PzV26OxN2WKtuj8Y9FHR"></span>
        <span className="dZ2gRLY67cqVBgNjZAFl">Tiger</span>
        <span className="g4jdfxv4yJMhUCeEyYRD"></span>
      </div>

      <div className="ufCz6c1IqcZ7Cx4Or7Pi" style={{ height: "3.3em" }}>
        {data[3]?.runners?.map((runner) => {
          return (
            <div
              onClick={() => handlePlaceBet(data[3], runner)}
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
              <span className="DYt62YNc0fa3zJ7_yedE">{runner?.name}</span>
              <div className="ji7Xi0_VRN0zb5QA2gcA">
                x{runner?.back[0]?.price}
              </div>
              {/*    <!-- result1 >> runners0 >> back --> */}
            </div>
          );
        })}

        {data[5]?.runners?.map((runner, i) => {
          return (
            <div
              onClick={() => handlePlaceBet(data[5], runner)}
              key={runner?.id}
              className={`QIGYZANQUJzivDLQDHjm ${
                i === 0 ? "Jd_FQ2o2GATSrBeLJ2Rw2" : "z6rwdalImNjtkvdnGBum2"
              }
          ${getClassName(
            clickedRunners,
            runner,
            data[0],
            WinnerRunner,
            placeBetBorder,
            timer
          )}
          `}
              style={{ width: "5.3em", height: "2.1875em" }}
              data-combination="3"
              data-testid=""
            >
              <span className="DYt62YNc0fa3zJ7_yedE">{runner?.name}</span>
              <div className="ji7Xi0_VRN0zb5QA2gcA">
                x{runner?.back[0]?.price}
              </div>
              {/* <!-- result2 >> runners0 >> back --> */}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DragonTigerLion;
