const getClassName = (
  clickedRunner,
  runner,
  game,
  winner,
  placedBorder,
  time
) => {
  return `${
    clickedRunner.includes(runner.id) && game?.status === "OPEN"
      ? "border-green-color"
      : ""
  }
   ${winner[`${runner?.id}-${runner?.name}`] ? "border-green-color" : ""} 

    ${placedBorder[`${runner?.id}-${runner?.name}`] ? "border-red-color" : ""}

    ${game?.status === "OPEN" && time > 0 ? "" : "disabled"}`;
};

export default getClassName;
