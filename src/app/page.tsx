"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Game = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/pt");
  }, [router]);

  return null;
};

export default Game;