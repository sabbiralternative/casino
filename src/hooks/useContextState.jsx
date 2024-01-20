import { useContext } from "react";
import { StateContext } from "../provider/StateProvider";

const useContextState = () => {
  const stateProvider = useContext(StateContext);
  return stateProvider;
};

export default useContextState;
