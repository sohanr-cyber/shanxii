"use client";
import { useState } from "react";
import BarcodeScanner from "../components/Utility/BarcodeScanner";

export default function BarcodePage() {
    const [barcode, setBarcode] = useState("");

    return (
        <div style={{ paddingTop: "60px" }}>
            <h1>Next.js Barcode Scanner</h1>
            <BarcodeScanner />
            {barcode && <p>Scanned Barcode: {barcode}</p>}
        </div>
    );
}
