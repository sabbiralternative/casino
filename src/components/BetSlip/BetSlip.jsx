import { useRef, useState } from "react";
import CloseModalClickOutside from "../../hooks/CloseModalClickOutside";

const BetSlip = ({ setTotalSize, totalSize, setIsOpenBetEdit }) => {
  const betSlipRef = useRef();
  const [editTotalSize, setEditTotalSize] = useState(true);
  const handleRemoveLastIndex = () => {
    const lastIndex = totalSize?.toString().slice(0, -1);
    setTotalSize(lastIndex);
  };

  CloseModalClickOutside(betSlipRef, () => {
    setIsOpenBetEdit(false);
  });

  const handleAddValue = (num) => {
    if (totalSize && editTotalSize) {
      setTotalSize("");
      setEditTotalSize(false);
      setTotalSize((prev) => prev + num);
    } else {
      setTotalSize((prev) => prev + num);
    }
  };

  return (
    <div className="sc-eWHaVC hErkOS">
      <div data-testid="glass-backdrop" className="sc-cgjDci aZvWD"></div>
      <div className="sc-heIBml bQxKNy" ref={betSlipRef}>
        <div className="sc-leQnM ldiKfU">
          <p
            className="sc-kTbCBX gxfXUI"
            style={{ color: "rgb(var(--white))" }}
          >
            Bet Amount
          </p>
        </div>
        <div className="sc-iNIeMn byQZYv">
          <button
            onClick={() => setTotalSize((prev) => parseFloat(prev) - 10)}
            className="sc-ghzrUh TSCQC"
            style={{ color: "rgb(var(--white))" }}
          >
            <span>Min</span>
          </button>
          <div className="sc-kDrquE faMoBy">
            <div className="sc-kSsbVf dyHya">{totalSize}</div>
          </div>
          <button
            onClick={() => setTotalSize((prev) => parseFloat(prev) + 10)}
            className="sc-ghzrUh hDAbBZ"
            style={{ color: "rgb(var(--white))" }}
          >
            <span>Max</span>
          </button>
        </div>
        <div className="sc-dYOqWG cSgZWC">
          <button
            onClick={() => setTotalSize(10)}
            data-quickbet="10"
            className="sc-ghzrUh hzbNIm"
            style={{ color: "rgb(var(--white))" }}
          >
            <span>10</span>
          </button>
          <button
            onClick={() => setTotalSize(100)}
            data-quickbet="100"
            className="sc-ghzrUh hzbNIm"
            style={{ color: "rgb(var(--white))" }}
          >
            <span>100</span>
          </button>
          <button
            onClick={() => setTotalSize(200)}
            data-quickbet="200"
            className="sc-ghzrUh hzbNIm"
            style={{ color: "rgb(var(--white))" }}
          >
            <span>200</span>
          </button>
          <button
            onClick={() => setTotalSize(1000)}
            data-quickbet="1000"
            className="sc-ghzrUh hzbNIm"
            style={{ color: "rgb(var(--white))" }}
          >
            <span>1K</span>
          </button>
          <button
            onClick={() => setTotalSize(2000)}
            data-quickbet="2000"
            className="sc-ghzrUh hzbNIm"
            style={{ color: "rgb(var(--white))" }}
          >
            <span>2K</span>
          </button>
        </div>
        <div className="sc-beeQDc cKErfm"></div>
        <div className="sc-dYoqmx dIxiiB">
          <button
            onClick={() => handleAddValue("1")}
            data-value="1"
            className="sc-ghzrUh jvQLjQ"
            style={{ color: "rgb(var(--white))" }}
          >
            <span>1</span>
          </button>
          <button
            onClick={() => handleAddValue("2")}
            data-value="2"
            className="sc-ghzrUh jvQLjQ"
            style={{ color: "rgb(var(--white))" }}
          >
            <span>2</span>
          </button>
          <button
            onClick={() => handleAddValue("3")}
            data-value="3"
            className="sc-ghzrUh jvQLjQ"
            style={{ color: "rgb(var(--white))" }}
          >
            <span>3</span>
          </button>
          <button
            onClick={() => handleAddValue("4")}
            data-value="4"
            className="sc-ghzrUh jvQLjQ"
            style={{ color: "rgb(var(--white))" }}
          >
            <span>4</span>
          </button>
          <button
            onClick={() => handleAddValue("5")}
            data-value="5"
            className="sc-ghzrUh jvQLjQ"
            style={{ color: "rgb(var(--white))" }}
          >
            <span>5</span>
          </button>
          <button
            onClick={() => handleAddValue("6")}
            data-value="6"
            className="sc-ghzrUh jvQLjQ"
            style={{ color: "rgb(var(--white))" }}
          >
            <span>6</span>
          </button>
          <button
            onClick={() => handleAddValue("7")}
            data-value="7"
            className="sc-ghzrUh jvQLjQ"
            style={{ color: "rgb(var(--white))" }}
          >
            <span>7</span>
          </button>
          <button
            onClick={() => handleAddValue("8")}
            data-value="8"
            className="sc-ghzrUh jvQLjQ"
            style={{ color: "rgb(var(--white))" }}
          >
            <span>8</span>
          </button>
          <button
            onClick={() => handleAddValue("9")}
            data-value="9"
            className="sc-ghzrUh jvQLjQ"
            style={{ color: "rgb(var(--white))" }}
          >
            <span>9</span>
          </button>
        </div>
        <div className="sc-dYOqWG cSgZWC">
          <button
            onClick={() => handleAddValue("0")}
            data-value="0"
            className="sc-ghzrUh hzbNIm"
            style={{ color: "rgb(var(--white))" }}
          >
            0
          </button>
          <button
            onClick={() => setTotalSize("")}
            data-value="."
            className="sc-ghzrUh hzbNIm"
            style={{ color: "rgb(var(--white))", textTransform: "uppercase" }}
          >
            Clear
          </button>
          <button
            onClick={handleRemoveLastIndex}
            className="sc-ghzrUh hzbNIm"
            style={{ color: "rgb(var(--white))" }}
          >
            <span className="sc-dZxRDy ePExHN">
              <svg
                fill="rgb(var(--white))"
                width="100%"
                height="100%"
                viewBox="0 0 17 15"
              >
                <path d="M1.66242 9.82293L5.13685 13.8994C5.4916 14.3172 5.74201 14.6127 6.16979 14.8064C6.58714 15 6.99405 15 7.54704 15L13.8699 15C15.0176 15 15.7793 15 16.3844 14.3987C17 13.8076 17 13.0637 17 11.9427L17 3.78981C17 2.66879 17 1.92484 16.3844 1.33376C15.7793 0.732486 15.0176 0.732486 13.8699 0.732486L7.54704 0.732485C6.99406 0.732485 6.58714 0.732484 6.16979 0.926115C5.75244 1.11975 5.4916 1.41529 5.13685 1.83312L1.66242 5.90955C1.0364 6.64331 0.619048 7.13248 0.619048 7.86624C0.619048 8.6 1.0364 9.08917 1.66242 9.82293ZM7.88092 6.05223C7.66181 5.83822 7.66181 5.48153 7.88092 5.26752C7.99569 5.15541 8.13133 5.10446 8.28784 5.10446C8.43391 5.10446 8.56955 5.15541 8.68432 5.26752L10.5624 7.09172L12.4405 5.26752C12.5552 5.15541 12.6909 5.10446 12.8369 5.10446C12.9934 5.10446 13.1291 5.15541 13.2439 5.26752C13.463 5.48153 13.463 5.83822 13.2439 6.05223L11.3762 7.88662L13.2439 9.71083C13.463 9.93503 13.463 10.2917 13.2439 10.5057C13.0248 10.7197 12.6596 10.7197 12.4405 10.5057L10.5624 8.67134L8.68432 10.5057C8.46521 10.7197 8.10003 10.7197 7.88092 10.5057C7.66181 10.2917 7.66181 9.93503 7.88092 9.71083L9.74856 7.88662L7.88092 6.05223Z"></path>
              </svg>
            </span>
          </button>
          <button
            onClick={() => setIsOpenBetEdit(false)}
            className="sc-ghzrUh dtOKDb"
            style={{ color: "rgb(var(--white))" }}
          >
            <span>Ok</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetSlip;
