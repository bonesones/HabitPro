"use client";

import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}> = ({
  isOpen,
  onClose,
  children,
  className: _className,
  contentClassName: _contentClassName,
}) => {
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);

    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const className = clsx(
    "bg-white rounded-xl shadow-lg mx-4 w-full max-w-md lg:max-w-2xl max-h-[90dvh] relative flex flex-col text-sm pointer-events-auto",
    _className
  );

  const contentClassName = clsx("p-6 overflow-auto", _contentClassName);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className={className}>
              <div className={contentClassName} onClick={handleModalClick}>
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
