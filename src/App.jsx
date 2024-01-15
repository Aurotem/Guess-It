import { useRef, useEffect } from "react";

function App() {
  const canvasRef = useRef();
  let isPainting = false;
  let mouseX;
  let mouseY;
  let ctx;
  let justClicked = false;
  
  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    draww();
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.addEventListener("mousemove", handleMouseMove);
    draw(ctx);
  });
  function draw(context) {
    ctx = context;
  }

  function clickHandler(boolValue) {
    isPainting = boolValue;
    boolValue && (justClicked = true);
  }

  function draww() {
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
        ref={canvasRef}
        width={700}
        height={700}
      ></canvas>
    </>
  );
}

export default App;
