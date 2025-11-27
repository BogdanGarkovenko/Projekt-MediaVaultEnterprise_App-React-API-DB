import React from "react";
import { motion } from "framer-motion";

export default function SkeletonMovie() {
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden bg-white/10 dark:bg-white/5 border border-white/10 shadow-[0_0_25px_rgba(139,92,246,0.25)]"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="relative h-80 w-full bg-gray-300/40 dark:bg-gray-700/40 overflow-hidden">
        <div className="absolute inset-0 shimmer" />
      </div>

      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 rounded bg-gray-300/40 dark:bg-gray-700/40 relative overflow-hidden"><div className="absolute inset-0 shimmer" /></div>
        <div className="h-3 w-1/2 rounded bg-gray-300/40 dark:bg-gray-700/40 relative overflow-hidden"><div className="absolute inset-0 shimmer" /></div>
      </div>
    </motion.div>
  );
}