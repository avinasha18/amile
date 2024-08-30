import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

function Header() {
  const [rotate, setRotate] = useState(false);
  return (
    <div className="w-full h-[60px] bg-gray-900 text-white p-3 flex justify-between items-center">
      <Link to="/">
        <motion.h2
          animate={{ scale: 1 }}
          initial={{ scale: 0 }}
          className="font-bold left text-amber-400 "
        >
          <motion.div
            onClick={() => setRotate(!rotate)}
            animate={{ rotate: rotate ? 360 : 0 }}
            initial={{}}
          >
            Web Compiler
          </motion.div>
        </motion.h2>
      </Link>
      <ul className="flex gap-2">
        <li>
          <Link to="/compiler">
            <Button
              className="font-semibold animate-ping text-amber-400 animate-bounce"
              variant="outline"
            >
              <motion.div
                onClick={() => setRotate(!rotate)}
                animate={{ rotate: rotate ? 360 : 0 }}
                initial={{}}
              >
                Compiler
              </motion.div>
            </Button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
