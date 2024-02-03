import getClassName from "../../../hooks/getClassName";

const DTL = ({
  data,
  clickedRunners,
  handlePlaceBet,
  WinnerRunner,
  timer,
  placeBetBorder,
}) => {
  return (
    <div className="ufCz6c1IqcZ7Cx4Or7Pi" style={{ height: "3.3em" }}>
      {data[0]?.runners?.map((runner) => {
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
            <span className="DYt62YNc0fa3zJ7_yedE">{runner?.name}</span>
            <div className="ji7Xi0_VRN0zb5QA2gcA">
              x{runner?.back[0]?.price}
            </div>
            {/* <!-- result0 >> runners0 >> back --> */}
          </div>
        );
      })}
    </div>
  );
};

export default DTL;
