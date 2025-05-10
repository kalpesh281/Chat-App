import React from "react";
import { motion } from "framer-motion";

function PageNotFound() {
  return (
    <>
      <div className="p-4 h-screen flex flex-col items-center justify-center text-center text-white">
        <motion.div
          className="text-9xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          🚧
        </motion.div>
        <motion.h1
          className="text-5xl font-extrabold mt-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Oops! Page Not Found
        </motion.h1>
      </div>
    </>
  );
}

export default PageNotFound;
