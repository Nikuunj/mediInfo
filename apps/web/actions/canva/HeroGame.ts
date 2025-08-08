import { SelectShapeType, Shape, XYType } from "./Game";

export class HeroGame {
     private canvas: HTMLCanvasElement;
     private ctx: CanvasRenderingContext2D;
     private existingShapes: Shape[]
     private startX = 0;
     private startY = 0;
     private clicked: boolean;
     private selectedShape: SelectShapeType;
     private rect: DOMRect;
     private penXY: XYType[];
     private text = "";
     
     constructor(canvas: HTMLCanvasElement) {
          this.canvas = canvas;
          this.ctx = canvas.getContext('2d')!
          this.existingShapes = [];
          this.clicked = false;
          this.selectedShape = SelectShapeType.Rect;
          this.rect = canvas.getBoundingClientRect();
          this.penXY = []
          this.initMouseEvent();
          this.initKeyEvent();
     }

     // Helper function to get canvas coordinates
     private getCanvasCoordinates(e: MouseEvent): { x: number, y: number } {
          return {
               x: e.clientX - this.rect.left,
               y: e.clientY - this.rect.top
          };
     }

     clearCanvas() {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.ctx.strokeStyle = "rgba(255, 255, 255)"
          this.existingShapes.forEach(shape => {
               if(shape.type === SelectShapeType.Rect) {
                    this.drawRect(shape.x, shape.y, shape.width, shape.height)
               } else if (shape.type === SelectShapeType.Circle) {
                    this.drawCricle(shape.x, shape.y, shape.radiusX, shape.radiusY)
               } else if (shape.type === SelectShapeType.Line) {
                    this.drawLine(shape.startX, shape.startY, shape.EndX, shape.EndY);
               } else if (shape.type === SelectShapeType.Text) {
                    this.writeText(shape.startX, shape.startY, shape.text, shape.size, shape.style)
               } else if (shape.type === SelectShapeType.Pen) {
                    shape.XY.forEach((XY: XYType, _) => {
                         this.drawPen(XY.x1, XY.y1, XY.x2, XY.y2);
                    })
               }
          })
          this.ctx.fillStyle = 'black';
     }

     setShape(shape : SelectShapeType) {
          this.clicked = false;
          this.canvas.classList.add('cursor-default')
          this.canvas.classList.remove('cursor-crosshair')
          this.selectedShape = shape;
     }

     initKeyEvent() {
          this.canvas.setAttribute('tabindex', '0');
          this.canvas.addEventListener('keydown', this.keyWriteDown) 
          this.canvas.focus();
     }

     keyWriteDown = (e: KeyboardEvent) => {
          if(this.selectedShape !== SelectShapeType.Text) {
               return;
          }
          if(e.code === 'Enter' || e.key == 'Enter') {
               this.storeText();
               return;
          }
          if(this.selectedShape !== SelectShapeType.Text) {
               return;
          }
          const specialKeys = [
               'Control', 'Alt', 'Shift', 'Meta', 'Tab', 'Escape', 'CapsLock',
               'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
               'Home', 'End', 'PageUp', 'PageDown', 'Insert', 'Delete',
               'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'NumLock',
          ];
          
          if (e.ctrlKey || e.altKey || e.metaKey) {
               return;
          }
          
          if (specialKeys.includes(e.key)) {
               return;
          }
          if(e.key === 'Backspace') {
               console.log('here');
               this.text = this.text.slice(0, this.text.length - 1);
          } else {
               this.text += e.key;
          }
          const scrollY = window.scrollY;
          this.clearCanvas();
          this.writeText(this.startX, this.startY, this.text, "30px", "Arial")
     }

     writeText = (x: number, y: number, text: string, size: string, style: string) => {
          this.ctx.fillStyle = "white";
          this.ctx.font = size + " " + style;
          this.ctx.fillText(text, x, y);
     }

     storeText = () => {
          if(!this.text) {
               return;
          }
          const scrollY = window.scrollY;
          const shape: Shape = {
                    type: SelectShapeType.Text,
                    text: this.text,
                    startX: this.startX,
                    startY: this.startY,
                    size: "30px", 
                    style: "Arial"
          }    
          this.existingShapes.push(shape);
          this.text = "";
     }

     initMouseEvent() {
          this.canvas.addEventListener('mousedown', this.mouseDown)
          this.canvas.addEventListener('mouseup', this.mouseUp)
          this.canvas.addEventListener('mousemove', this.mouseMove);
     }

     mouseDown = (e: MouseEvent) => {
          this.storeText();
          this.startX = e.offsetX;
          this.startY = e.offsetY;
          this.clicked = true;
          this.canvas.classList.remove('cursor-default')
          this.canvas.classList.add('cursor-crosshair')
     }

     mouseUp = (e: MouseEvent) => {
          this.clicked = false;
          this.canvas.classList.add('cursor-default')
          this.canvas.classList.remove('cursor-crosshair')
          let shape: Shape | null = null;
          const coords = this.getCanvasCoordinates(e);
          const scrollY = window.scrollY;
          if(this.selectedShape === SelectShapeType.Rect) {
               shape = {
                    type: this.selectedShape,
                    x: this.startX,
                    y: this.startY,
                    width: e.offsetX - this.startX,
                    height: e.offsetY - this.startY
               }    
          } else if(this.selectedShape === SelectShapeType.Circle) {
               shape = {
                    type: this.selectedShape,
                    x: this.startX,
                    y: this.startY,
                    radiusX: e.offsetX,
                    radiusY: e.offsetY,
               }
          } else if(this.selectedShape === SelectShapeType.Line) {
               shape = {
                    type: this.selectedShape,
                    startX: this.startX,
                    startY: this.startY,
                    EndX: e.offsetX,
                    EndY: e.offsetY
               }
          } else if (this.selectedShape === SelectShapeType.Pen) {
               shape = {
                    type: this.selectedShape,
                    XY: this.penXY
               }
               this.penXY = [];
          }
          if(!shape) {
               return;
          }
          this.existingShapes.push(shape);
     }

     mouseMove = (e: MouseEvent) => {
          if(!this.clicked) {
               return;
          }
          this.clearCanvas();
          
          if(this.selectedShape === SelectShapeType.Rect) {
               const width = e.offsetX - this.startX;
               const height = e.offsetY - this.startY;
               this.drawRect(this.startX, this.startY, width, height);
          } else if (this.selectedShape === SelectShapeType.Circle) {
               this.drawCricle(this.startX, this.startY, e.offsetX, e.offsetY);
          } else if (this.selectedShape === SelectShapeType.Line) {
               this.drawLine(this.startX, this.startY, e.offsetX, e.offsetY);
          } else if (this.selectedShape === SelectShapeType.Pen)  {
               const x = e.offsetX;
               const y = e.offsetY;
               this.penXY.push({
                    x1: this.startX,
                    y1: this.startY,
                    x2: x,
                    y2: y
               })
               this.penXY.forEach((XY: XYType, _) => {
                    this.drawPen(XY.x1, XY.y1, XY.x2, XY.y2);
               });
               [this.startX, this.startY] = [x, y];
          }
     }

     drawPen = (x1: number, y1: number, x2: number, y2: number) => { 
          this.ctx.beginPath();
          this.ctx.moveTo(x1, y1);
          this.ctx.lineTo(x2, y2);
          this.ctx.stroke();
     }
     drawLine = (x1: number, y1: number, x2: number, y2: number) => {
          this.ctx.beginPath();
          const headlen = 7; 
          const dx = x2 - x1;
          const dy = y2 - y1;
          const angle = Math.atan2(dy, dx);

          this.ctx.moveTo(x1, y1);
          this.ctx.lineTo(x2, y2);

          this.ctx.moveTo(x2, y2);
          this.ctx.lineTo(x2 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6));

          this.ctx.moveTo(x2, y2);
          this.ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6));

          this.ctx.stroke();
     }

     drawRect = (x: number, y: number, width: number, height: number) => {
          this.ctx.strokeRect(x, y, width, height);   
     }
     
     drawCricle = (x1: number, y1: number, x2: number, y2: number) => {
          var radiusX = (x2 - x1) * 0.588, 
          radiusY = (y2 - y1) * 0.588, 
          centerX = x1 + radiusX,    
          centerY = y1 + radiusY,
          step = 0.01,               
          a = step,                  
          pi2 = Math.PI * 2 - step;  
          
          this.ctx.beginPath();

          this.ctx.moveTo(centerX + radiusX * Math.cos(0),
                         centerY + radiusY * Math.sin(0));
          for(; a < pi2; a += step) {
               this.ctx.lineTo(centerX + radiusX * Math.cos(a),
                         centerY + radiusY * Math.sin(a));
          }
          this.ctx.strokeStyle = 'white';
          this.ctx.stroke();
     }

     radiusX(x: number): number {
          return Math.abs(x - this.startX) / 2;
     }

     radiusY(y: number): number {
          return Math.abs(y - this.startY) / 2;
     }

     cleanUp() {
          this.canvas.removeEventListener('mousedown', this.mouseDown)
          this.canvas.removeEventListener('mouseup', this.mouseUp)
          this.canvas.removeEventListener('mousemove', this.mouseMove)
          this.canvas.removeEventListener('keydown', this.keyWriteDown)
     }
}