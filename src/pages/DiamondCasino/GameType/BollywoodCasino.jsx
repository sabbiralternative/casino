import getClassName from "../../../hooks/getClassName";

const BollywoodCasino = ({
  data,
  clickedRunners,
  handlePlaceBet,
  WinnerRunner,
  timer,
  placeBetBorder,

}) => {
  const words = ["A", "B", "C", "D", "E", "F"];
  const KQJA = ["K-Q", "J-A"];

  return (
    <>
      <div className="ufCz6c1IqcZ7Cx4Or7Pi" style={{ height: "5.8em" }}>
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
              <span className="DYt62YNc0fa3zJ7_yedE">{words[i]}</span>
              <div className="ji7Xi0_VRN0zb5QA2gcA">
                x{runner?.back[0]?.price}
              </div>
              {/*   <!-- result0 >> runners0 >> back --> */}
            </div>
          );
        })}
      </div>

      <div className="ufCz6c1IqcZ7Cx4Or7Pi" style={{ height: "5.8em" }}>
        <div
          className="QIGYZANQUJzivDLQDHjm border-gold-color"
          style={{ width: "6.8em" }}
          data-combination="3"
          data-testid=""
        >
          <span className="DYt62YNc0fa3zJ7_yedE">Even</span>
          <div className="ji7Xi0_VRN0zb5QA2gcA">x2.1</div>
          {/*   <!-- dont link this --> */}
        </div>
        {data[1]?.runners?.map((runner) => {
          return (
            <div
              onClick={() => handlePlaceBet(data[1], runner)}
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
              data-combination="4"
              data-testid=""
            >
              <span className="DYt62YNc0fa3zJ7_yedE">Odd</span>
              <div className="ji7Xi0_VRN0zb5QA2gcA">
                x{runner?.back[0]?.price}
              </div>
              {/*    <!-- result1 >> runners0 >> back --> */}
            </div>
          );
        })}

        {data[3]?.runners?.map((runner, i) => {
          return (
            <div
              onClick={() => handlePlaceBet(data[3], runner)}
              key={runner?.id}
              className={`QIGYZANQUJzivDLQDHjm  ${
                i === 0 ? "Jd_FQ2o2GATSrBeLJ2Rw" : "z6rwdalImNjtkvdnGBum"
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
              style={{ height: "2.1875em" }}
              data-combination="3"
              data-testid=""
            >
              <span className="DYt62YNc0fa3zJ7_yedE">{runner?.name}</span>
              <div className="ji7Xi0_VRN0zb5QA2gcA">
                x{runner?.back[0]?.price}
              </div>
              {/*  <!-- result3 >> runners0 >> back --> */}
            </div>
          );
        })}

        {data[2]?.runners?.map((runner, i) => {
          return (
            <div
              onClick={() => handlePlaceBet(data[2], runner)}
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
              <span className="DYt62YNc0fa3zJ7_yedE">{KQJA[i]}</span>
              <div className="ji7Xi0_VRN0zb5QA2gcA">
                x{runner?.back[0]?.price}
              </div>
              {/*     <!-- result2 >> runners0 >> back --> */}
            </div>
          );
        })}
      </div>

      <div className="ufCz6c1IqcZ7Cx4Or7Pi" style={{ height: "3.3em" }}>
        {data[4]?.runners?.map((runner) => {
          return (
            <div
              onClick={() => handlePlaceBet(data[4], runner)}
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
              {/*  <!-- result4 >> runners0 >> back --> */}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BollywoodCasino;
