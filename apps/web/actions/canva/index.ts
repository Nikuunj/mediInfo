type Shepe = {
     type: "rect"
     x: number;
     y: number;
     width: number;
     height: number;
} 

export function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
     const ctx = canvas.getContext('2d');
     if (!ctx) return;
     const existingShapes: Shepe[] = [];

     let isDrawing = false;
     let startX = 0;
     let startY = 0;

     const handleMouseDown = (e: MouseEvent) => {
          isDrawing = true;
          startX = e.clientX;
          startY = e.clientY;
     };

     const handleMouseUp = (e: MouseEvent) => {
          isDrawing = false;
          existingShapes.push({
               type: 'rect',
               x: startX,
               y: startY,
               width: e.clientX - startX,
               height: e.clientY - startY
          })
     };

     const handleMouseMove = (e: MouseEvent) => {
          if (!isDrawing) return;

          const width = e.clientX - startX;
          const height = e.clientY - startY;
          clearCanvas(canvas, existingShapes, ctx);
          ctx.strokeStyle = "rgba(255, 255, 255)";
          ctx.strokeRect(startX, startY, width, height);
     };

     canvas.addEventListener('mousedown', handleMouseDown);
     canvas.addEventListener('mouseup', handleMouseUp);
     canvas.addEventListener('mousemove', handleMouseMove);

     return () => {
          canvas.removeEventListener('mousedown', handleMouseDown);
          canvas.removeEventListener('mouseup', handleMouseUp);
          canvas.removeEventListener('mousemove', handleMouseMove);
     };
}

function clearCanvas(canvas: HTMLCanvasElement, existingShapes: Shepe[], ctx: CanvasRenderingContext2D) {
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     existingShapes.forEach(shape => {
          ctx.strokeStyle = "rgba(255, 255, 255)";
          ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
     })
}