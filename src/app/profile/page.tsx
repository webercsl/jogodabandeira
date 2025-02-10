"use client";

import { useEffect, useState } from "react";

export default function AdBlockDetector() {
    const [adBlockDetected, setAdBlockDetected] = useState(false);

    useEffect(() => {
        const checkAdBlock = async () => {
            const testAd = document.createElement("div");
            testAd.className = "adsbygoogle";
            testAd.style.display = "none";
            document.body.appendChild(testAd);

            setTimeout(() => {
                if (testAd.offsetHeight === 0) {
                    setAdBlockDetected(true);
                }
                testAd.remove();
            }, 100);
        };

        checkAdBlock();
    }, []);

    if (!adBlockDetected) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center text-white text-center p-4">
            <div className="flex flex-col justify-center items-center">
                <img src="/adblock.png" alt="Imagem do AdBlock" />
                <h2 className="text-2xl font-bold mb-4">AdBlock Detectado!</h2>
                <p className="mb-4">Por favor, desative o AdBlock para continuar acessando o site.</p>
                <button
                    className="bg-red-600 px-6 py-2 rounded-lg text-white font-semibold hover:bg-red-700"
                    onClick={() => window.location.reload()}
                >
                    Já desativei o AdBlock
                </button>
            </div>
        </div>
    );
}
