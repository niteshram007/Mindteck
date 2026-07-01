import * as motion from "motion/react-client";

//
import { varContainer } from "./variants";

// ----------------------------------------------------------------------

export default function MotionContainer({
  children,
  containerProps,
  ...other
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={varContainer(containerProps)}
      {...other}
    >
      {children}
    </motion.div>
  );
}
