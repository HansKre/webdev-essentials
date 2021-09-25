import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type Props = {
  children: ReactNode;
  delay?: number;
};

export default function WithSyncedBouncingAnimation({
  children,
  delay,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [null, 0.9, 1],
        scale: [null, 1.5, 1],
      }}
      transition={{
        duration: 1.5,
        times: [0, 0.15, 0.5],
        ease: 'easeInOut',
        delay: delay ? delay : 1.5,
      }}
    >
      {children}
    </motion.div>
  );
}
