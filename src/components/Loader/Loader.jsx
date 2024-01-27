import { FadeLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FadeLoader color="#36d7b7" />
    </div>
  );
};

export default Loader;
