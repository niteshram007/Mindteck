// ----------------------------------------------------------------------

export const varContainer = (props) => {
  const staggerIn = props?.staggerIn || 0.1;
  const delayIn = props?.delay || 0.3;


  return {
    hidden: { opacity: 0,},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerIn,
        delayChildren: delayIn,
      },
    },
  };
};

export const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};