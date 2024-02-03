const getAlphabetClassName = (id, ct) => {
  return `
    ${
      (id === "10001" || id === "10002" || id === "10003") && ct === "L"
        ? "resultRed"
        : ""
    }
    ${
      (id === "10001" || id === "10002" || id === "10003") && ct === "H"
        ? "resultGreen"
        : ""
    }
    ${
      (id === "10001" || id === "10002" || id === "10003") &&
      (ct === "7" || ct === "T")
        ? "resultYellow"
        : ""
    }
    ${id === "10004" && ct === "A" ? "resultRed" : ""}
    ${id === "10004" && ct === "B" ? "resultGreen" : ""}
    ${id === "10004" && ct === "C" ? "resultYellow" : ""}
    ${id === "10010" && ct === "D" ? "resultRed" : ""}
    ${id === "10010" && ct === "T" ? "resultGreen" : ""}
    ${id === "10010" && ct === "L" ? "resultYellow" : ""}
    ${id === "10024" && ct === "B" ? "resultRed" : ""}
    ${id === "10024" && ct === "T" ? "resultGreen" : ""}
    ${id === "10024" && ct === "P" ? "resultYellow" : ""}
    
    
    `;
};

export default getAlphabetClassName;
