import { getRoomChat } from "../room";

export interface XYType {
     x1: number;
     y1: number;
     x2: number;
     y2: number;
}

export type Shape = {
     type: SelectShapeType.Rect;
     x: number,
     y: number,
     width: number,
     height: number;
} | {
     type: SelectShapeType.Circle;
     y: number;
     x: number;
     radiusX: number;
     radiusY: number;
} | {
     type: SelectShapeType.Line;
     startX: number;
     startY: number;
     EndX: number;
     EndY: number
} | {
     type: SelectShapeType.Text;
     startX: number;
     startY: number;
     text: string;
     size: string;
     style: string;
} | {
     type: SelectShapeType.Pen;
     XY: XYType[];
}

export enum SelectShapeType {
     Rect = 'rect',
     Circle = 'circle',
     Line = 'line',
     Text = 'text',
     Pen = 'pen'
}

export class Game {
     private canvas: HTMLCanvasElement;
     private ctx: CanvasRenderingContext2D;
     private roomId: string;
     private existingShapes: Shape[]
     private startX = 0;
     private startY = 0;
     private clicked: boolean;
     private selectedShape: SelectShapeType;
     private text = "";
     socket: WebSocket;
     
     constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
          this.canvas = canvas;
          this.ctx = canvas.getContext('2d')!
          this.existingShapes = [];
          this.roomId = roomId;
          this.socket = socket;
          this.clicked = false;
          this.selectedShape = SelectShapeType.Text;
          this.init();
          this.reciveSocketMsg();
          this.initMouseEvent();
          this.initKeyEvent();
     }

     async init() {
          const oldShape = await getRoomChat({ roomId: this.roomId });
          if(!oldShape) {
               return;
          }
          
          oldShape.forEach(old => {
               const parseShape = JSON.parse(old.message);
               this.existingShapes.push(parseShape);
          })
          this.clearCanvas();
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
               }
          })
          this.ctx.fillStyle = 'black';
     }

     reciveSocketMsg() {
          this.socket.onmessage = (event) => {
               const msg = JSON.parse(event.data)
               if(msg.type === 'chat') {
                    const shape = JSON.parse(msg.massege)
                    this.existingShapes.push(shape);
                    this.clearCanvas();
               }
          }
     }

     setShape(shape : SelectShapeType) {
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
          this.clearCanvas();
          this.text += e.key;
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
          const shape: Shape = {
                    type: SelectShapeType.Text,
                    text: this.text,
                    startX: this.startX,
                    startY: this.startY,
                    size: "30px",
                    style: "Arial"
          }    
          this.existingShapes.push(shape);
          this.socket.send(JSON.stringify({
               type: 'chat',
               massege: JSON.stringify(shape),
               roomId: this.roomId
          }));
          this.text = "";
     }

     initMouseEvent() {
          this.canvas.addEventListener('mousedown', this.mouseDown)
          this.canvas.addEventListener('mouseup', this.mouseUp)
          this.canvas.addEventListener('mousemove', this.mouseMove);
     }

     mouseDown = (e: MouseEvent) => {
          this.storeText();
          this.startX = e.clientX;
          this.startY = e.clientY;
          this.clicked = true;
     }

     mouseUp = (e: MouseEvent) => {
          this.clicked = false;
          let shape: Shape | null = null;

          if(this.selectedShape === SelectShapeType.Rect) {
               shape = {
                    type: this.selectedShape,
                    x: this.startX,
                    y: this.startY,
                    width: e.clientX - this.startX,
                    height: e.clientY - this.startY
               }    
          } else if(this.selectedShape === SelectShapeType.Circle) {
               shape = {
                    type: this.selectedShape,
                    x: this.startX,
                    y: this.startY,
                    radiusX: this.radiusX(e),
                    radiusY: this.radiusY(e),
               }
          } else if(this.selectedShape === SelectShapeType.Line) {
               shape = {
                    type: this.selectedShape,
                    startX: this.startX,
                    startY: this.startY,
                    EndX: e.clientX,
                    EndY: e.clientY
               }
          }
          if(!shape) {
               return;
          }
          this.existingShapes.push(shape);
          this.socket.send(JSON.stringify({
               type: 'chat',
               massege: JSON.stringify(shape),
               roomId: this.roomId
          }));
     }

     mouseMove = (e: MouseEvent) => {
          if(!this.clicked) {
               return;
          }
          this.clearCanvas();
          this.ctx.strokeStyle = "rgba(255, 255, 255)"
          if(this.selectedShape === SelectShapeType.Rect) {
               const width = e.clientX - this.startX;
               const height = e.clientY - this.startY;
               this.drawRect(this.startX, this.startY, width, height);
          } else if (this.selectedShape === SelectShapeType.Circle) {
               const radiusX = this.radiusX(e);
               const radiusY = this.radiusY(e);
               this.drawCricle(this.startX, this.startY, radiusX, radiusY);
          } else if (this.selectedShape === SelectShapeType.Line) {
               const x = e.clientX;
               const y = e.clientY;
               this.drawLine(this.startX, this.startY, x, y);
          } else if (this.selectedShape === SelectShapeType.Pen) {
               const x = e.offsetX;
               const y = e.offsetY;
               
          }
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
     
     drawCricle = (x: number, y: number, radiusX: number, radiusY: number) => {
          this.ctx.beginPath();
          this.ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
          this.ctx.stroke();
     }

     radiusX(e: MouseEvent): number {
          return Math.abs(e.clientX - this.startX ) / 2;
     }

     radiusY(e: MouseEvent): number {
          return Math.abs(e.clientY - this.startY ) / 2;
     }
     cleanUp() {
          this.canvas.removeEventListener('mousedown', this.mouseDown)
          this.canvas.removeEventListener('mouseup', this.mouseUp)
          this.canvas.removeEventListener('mousemove', this.mouseMove)
          this.canvas.removeEventListener('keydown', this.keyWriteDown)
     }
}