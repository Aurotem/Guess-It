import { useRef, useEffect } from "react";

export default function Canvas() {
  const canvasRef = useRef();
  //* If the player currently painting
  let isPainting = false;

  //* Checks if the player clicked the canvas(Who has the canvas)
  let justClicked = false;

  //* Canvas
  let ctx;

  function handleMouseMove(e) {
    //* Mouse positions
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    draw(mouseX, mouseY);
  }

  //! Create the canvas and connect its Ref
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.addEventListener("mousemove", handleMouseMove);
    ctxTransfer(ctx);
  });
  function ctxTransfer(context) {
    //* Make Canvas ref global
    ctx = context;
  }
  //! --------------------

  function clickHandler(boolValue) {
    isPainting = boolValue;
    boolValue && (justClicked = true);
  }

  function draw(mouseX, mouseY) {
    if (isPainting) {
      if (justClicked) {
        ctx.beginPath();
        justClicked = false;
      }
      ctx.lineWidth = 5;
      ctx.lineTo(mouseX, mouseY);
      ctx.stroke();
    }
  }
  return (
    <>
      <canvas
        onMouseDown={() => clickHandler(true)}
        onMouseUp={() => clickHandler(false)}
        onMouseLeave={() => (isPainting = false)}
        ref={canvasRef}
        width={700}
        height={700}
      ></canvas>
    </>
  );
}
