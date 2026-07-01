import { varTranEnter, varTranExit } from "./transition";

// ----------------------------------------------------------------------

export const varFade = (props) => {
  const distance = props?.distance || 120;
  const durationIn = props?.durationIn;
  const durationOut = props?.durationOut;
  const easeIn = props?.easeIn;
  const easeOut = props?.easeOut;
  const delay = props?.delay;

  return {
    // IN
    in: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
          
        transition: varTranEnter({ durationIn, easeIn, delay }),
      },
    },
    inUp: {
      hidden: { opacity: 0, y: distance },
      visible: {
        opacity: 1,
        y: 0,
        transition: varTranEnter({ durationIn, easeIn, delay }),
      },
    },
    inDown: {
      hidden: { opacity: 0, y: -distance },
      visible: {
        opacity: 1,
        y: 0,
        transition: varTranEnter({ durationIn, easeIn, delay }),
      },
    },
    inLeft: {
      hidden: { x: -distance, opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        y: 0,
        transition: varTranEnter({ durationIn, easeIn, delay }),
      },
    },
    inRight: {
      hidden: { x: 80, opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: varTranEnter({ durationIn, easeIn, delay }),
      },
    },

    // OUT
    out: {
      hidden: { opacity: 1 },
      visible: {
        opacity: 0,
        transition: varTranEnter({ durationIn, easeIn, delay }),
      },
    },
    outUp: {
      hidden: { y: 0, opacity: 1 },
      visible: {
        y: -distance,
        opacity: 0,
        transition: varTranEnter({ durationIn, easeIn, delay }),
      },
    },
    outDown: {
      hidden: { y: 0, opacity: 1 },
      visible: {
        y: distance,
        opacity: 0,
        transition: varTranEnter({ durationIn, easeIn, delay }),
      },
    },
    outLeft: {
      hidden: { x: 0, opacity: 1 },
      visible: {
        x: -distance,
        opacity: 0,
        transition: varTranEnter({ durationIn, easeIn, delay }),
      },
    },
    outRight: {
      hidden: { x: 0, opacity: 1 },
      visible: {
        x: distance,
        opacity: 0,
        transition: varTranEnter({ durationIn, easeIn, delay }),
      },
    },
  };
};
