import * as motion from "motion/react-client";
import { varContainer } from "./variants";

// ----------------------------------------------------------------------

export default function MotionViewport({
  children,
  ...other
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={varContainer()}
      {...other}
    >
      {children}
    </motion.div>
  );
}
