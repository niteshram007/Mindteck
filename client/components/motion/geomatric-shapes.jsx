// "use client"

// import { motion } from "framer-motion"
// import { useEffect, useState } from "react"

// function randomMovement(min, max) {
//   return Math.random() * (max - min) + min
// }

// function Shape({ color, initialPosition, size, motionRange }) {
//   const [position, setPosition] = useState(initialPosition)

//   useEffect(() => {
//     const interval = setInterval(
//       () => {
//         setPosition({
//           x: position.x + randomMovement(-motionRange, motionRange),
//           y: position.y + randomMovement(-motionRange, motionRange),
//         })
//       },
//       5000,
//     )

//     return () => clearInterval(interval)
//   }, [position, motionRange])

//   return (
//     <motion.svg
//       initial={{
//         x: initialPosition.x,
//         y: initialPosition.y,
//         rotate: 0,
//         scale: 0.8,
//       }}
//       animate={{
//         x: position.x,
//         y: position.y,
//         rotate: 360,
//         scale: 1.2,
//       }}
//       transition={{
//         x: { type: "spring", stiffness: 5, damping: 3 },
//         y: { type: "spring", stiffness: 5, damping: 3 },
//         rotate: { duration: randomMovement(8, 12), repeat: Infinity, ease: "linear" },
//         scale: { duration: randomMovement(6, 10), repeat: Infinity, repeatType: "reverse" },
//       }}
//       width={size}
//       height={size}
//       viewBox="0 0 100 100"
//       className="absolute pointer-events-none blur-3xl"
//     >
//       <path d="M50 5C70 10 90 30 95 50C100 70 90 90 70 95C50 100 30 90 15 75C5 60 10 40 15 25C20 10 30 0 50 5Z" fill={color} opacity="0.1" />
//     </motion.svg>
//   )
// }

// export function GeometricShapes() {
//   return (
//     <div className="absolute top-0 left-0 right-0 bottom-[-42px] overflow-hidden pointer-events-none z-0">
//       <Shape color="#fb923c" initialPosition={{ x: 1000, y: -100 }} size={400} motionRange={250} />
//       <Shape color="#ec4899" initialPosition={{ x: 500, y: 500 }} size={128} motionRange={300} />
//       <Shape color="#16a34a" initialPosition={{ x: 1200, y: 300 }} size={448} motionRange={150} />
//       <Shape color="#22d3ee" initialPosition={{ x: 300, y: -50 }} size={256} motionRange={380} />
//       <Shape color="#eab308" initialPosition={{ x: -50, y: 100 }} size={512} motionRange={100} />
//     </div>
//   )
// }

"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

function randomMovement(min, max) {
  return Math.random() * (max - min) + min
}

// function Shape({ color, initialPosition, size, motionRange }) {
//   const [position, setPosition] = useState(initialPosition)

//   useEffect(() => {
//     const interval = setInterval(
//       () => {
//         setPosition({
//           x: position.x + randomMovement(-motionRange, motionRange),
//           y: position.y + randomMovement(-motionRange, motionRange),
//         })
//       },
//       5000,
//     )

//     return () => clearInterval(interval)
//   }, [position, motionRange])

//   return (
//     <motion.svg
//       initial={{
//         x: initialPosition.x,
//         y: initialPosition.y,
//         rotate: 0,
//         scale: 0.8,
//       }}
//       animate={{
//         x: position.x,
//         y: position.y,
//         rotate: 360,
//         scale: 1.2,
//       }}
//       transition={{
//         x: { type: "spring", stiffness: 5, damping: 3 },
//         y: { type: "spring", stiffness: 5, damping: 3 },
//         rotate: { duration: randomMovement(8, 12), repeat: Infinity, ease: "linear" },
//         scale: { duration: randomMovement(6, 10), repeat: Infinity, repeatType: "reverse" },
//       }}
//       width={size}
//       height={size}
//       viewBox="0 0 100 100"
//       className="absolute pointer-events-none blur-3xl"
//     >
//       <path d="M50 5C70 10 90 30 95 50C100 70 90 90 70 95C50 100 30 90 15 75C5 60 10 40 15 25C20 10 30 0 50 5Z" fill={color} opacity="0.1" />
//     </motion.svg>
//   )
// }

// function Rope({ delay }) {
//   return (
//     <motion.svg
//       width="100%"
//       height="100"
//       viewBox="0 0 1200 100"
//       className="absolute top-1/12"
//     >
//       <motion.path
//         id="ropePath"
//         d="M0,50 C150,20 300,80 450,50 S900,50 1200,50"
//         stroke="#ffffff"
//         strokeWidth="1"
//         fill={'none'}
//         // animate={{
//         //   d: [
//         //     "M0,50 C150,10 300,90 450,50 S900,50 1200,50",
//         //     "M0,50 C150,-10 300,110 450,50 S900,50 1200,50",
//         //     "M0,50 C150,30 300,70 450,50 S900,50 1200,50"
//         //   ],
//         // }}
//         transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay }}
//       />
      
//     </motion.svg>
//   )
// }

export function GeometricShapes() {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-[-42px] overflow-hidden pointer-events-none z-0">
      {/* <Shape color="#fb923c" initialPosition={{ x: 1000, y: -100 }} size={400} motionRange={250} />
      <Shape color="#ec4899" initialPosition={{ x: 500, y: 500 }} size={128} motionRange={300} />
      <Shape color="#16a34a" initialPosition={{ x: 1200, y: 300 }} size={448} motionRange={150} />
      <Shape color="#22d3ee" initialPosition={{ x: 300, y: -50 }} size={256} motionRange={380} />
      <Shape color="#eab308" initialPosition={{ x: -50, y: 100 }} size={512} motionRange={100} /> */}
      {/* {[...Array(2)].map((_, i) => (
        <Rope key={i} delay={i * .5} />
      ))} */}
    </div>
  )
}
