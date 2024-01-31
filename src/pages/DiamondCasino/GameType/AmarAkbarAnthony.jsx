import getClassName from "../../../hooks/getClassName";

const AmarAkbarAnthony = ({
  data,
  clickedRunners,
  handlePlaceBet,
  WinnerRunner,
  timer,
  placeBetBorder,
}) => {
  return (
    <>
      <div className="ufCz6c1IqcZ7Cx4Or7Pi " style={{ height: "3.4em" }}>
        {data[0]?.runners?.map((runner, ) => {
          return (
            <div
              onClick={() => handlePlaceBet(data[0], runner)}
              key={runner?.id}
              className={`QIGYZANQUJzivDLQDHjm ${getClassName(
                clickedRunners,
                runner,
                data[0],
                WinnerRunner,
                placeBetBorder,
                timer
              )} `}
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

      <div className="ufCz6c1IqcZ7Cx4Or7Pi " style={{ height: "5.8em" }}>
        {data?.slice(1, 4)?.map((games) =>
          games?.runners?.map((runner) => {
            return (
              <div
                onClick={() => {
                  handlePlaceBet(games, runner);
                }}
                key={runner?.id}
                className={` QIGYZANQUJzivDLQDHjm ${
                  runner?.name === "Red" ? "Jd_FQ2o2GATSrBeLJ2Rw" : ""
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
                style={{
                  width: "6.8em",
                  height: "2.1875em",
                }}
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

      <div className="B8EAcQGrnzn_Hl8mH6Hk">
        <div className="TbDJtMH0Lesra_HZpmsu">
          <span className="PzV26OxN2WKtuj8Y9FHR"></span>
          <span
            className={`dZ2gRLY67cqVBgNjZAFl  ${
              data[0]?.status === "OPEN" && timer > 0 ? "" : "disabled"
            }`}
          >
            x{data[4]?.runners[0]?.back[0]?.price}
          </span>
          <span className="g4jdfxv4yJMhUCeEyYRD"></span>
        </div>
        <div className="HIZjOTeNz60Nkxq2F8yF">
          {data[4]?.runners?.map((runner) => {
            return (
              <div
                onClick={() => handlePlaceBet(data[4], runner)}
                key={runner?.id}
                className={`eiFJV7HiEPLhZOWBIVL_ 
                
                ${getClassName(
                  clickedRunners,
                  runner,
                  data[0],
                  WinnerRunner,
                  placeBetBorder,
                  timer
                )}
             
                `}
                data-combination="09"
                style={{ width: "7.2%" }}
              >
                <span className="phht8116FLncA8Oh2SMh">{runner?.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AmarAkbarAnthony;
