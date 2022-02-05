import React, { useRef } from "react";
import Print from "../print/Print";
import useReactToPrint from "react-to-print";

export default function ComponentToPrintWrapper(props) {
  // 1.
  const componentRef = useRef(null); // 2.
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div style={{ display: "flex" }}>
      <Print ref={componentRef} id={props.id} />{" "}
      <button className="btn home-btn" onClick={handlePrint}>
        print
      </button>
    </div>
  );
}
