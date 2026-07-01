import { m } from "framer-motion";
// @mui
//
import { varFade } from "./variants";

// ----------------------------------------------------------------------

export default function TextAnimate({ text, variants, ...other }) {
  return (
    <m.h1 {...other}>
      {text.split("").map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </m.span>
      ))}
    </m.h1>
  );
}
