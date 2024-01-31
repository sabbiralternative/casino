import useContextState from "./useContextState";

const useFullScreenToggle = () => {
  const { setShowTapToPlay } = useContextState();

  const toggleFullScreen = () => {
    setShowTapToPlay(false);
    sessionStorage.setItem("isTapToPlay", "false");

    const docElement = document.documentElement;

    if (
      (docElement.fullScreenElement && docElement.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (docElement.requestFullScreen) {
        docElement.requestFullScreen();
      } else if (docElement.mozRequestFullScreen) {
        docElement.mozRequestFullScreen();
      } else if (docElement.webkitRequestFullScreen) {
        docElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  };

  return { toggleFullScreen };
};

export default useFullScreenToggle;
