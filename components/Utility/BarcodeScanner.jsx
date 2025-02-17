"use client";
import { useEffect, useState, useRef } from "react";
import { Html5Qrcode, Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";

const BarcodeScanner = () => {
  const [scannedCode, setScannedCode] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef(null);
  const scannerId = "reader";

  useEffect(() => {
    if (!isScanning) return;

    // Check if scanner div exists
    const scannerElement = document.getElementById(scannerId);
    if (!scannerElement) {
      console.error("Scanner element not found!");
      return;
    }

    scannerRef.current = new Html5Qrcode(scannerId);

    scannerRef.current.start(
      { facingMode: "environment" }, // Use back camera if available
      {
        fps: 10,
        qrbox: { width: 320, height: 320 }, // Adjust size
      },
      (decodedText) => {
        setScannedCode(decodedText);
        // stopCamera(); // Stop camera on successful scan
      },
      (errorMessage) => {
        console.log("Scan failed:", errorMessage);
      }
    ).catch((err) => console.error("Scanner start error:", err));

    return () => stopCamera(); // Cleanup on unmount
  }, [isScanning]);

  // Stop the scanner
  const stopCamera = () => {
    if (scannerRef.current) {
      scannerRef.current.stop()
        .then(() => {
          console.log("Scanner stopped");
          scannerRef.current.clear();
        })
        .catch((err) => console.log("Error stopping scanner:", err));
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  return (
    <div>
      <h2>Scan a Barcode / QR Code</h2>
      <p><strong>Scanned Code:</strong> {scannedCode || "None"}</p>

      {!isScanning ? (
        <button onClick={() => setIsScanning(true)}>Start Scanner</button>
      ) : (
        <>
          <div id={scannerId}></div>
          <button onClick={stopCamera}>Stop Camera</button>
        </>
      )}
    </div>
  );
};

export default BarcodeScanner;
