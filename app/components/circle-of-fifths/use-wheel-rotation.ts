import { useRef, useState } from "react";
import { mod, shortestStep } from "@/lib/circular";

const DRAG_THRESHOLD_DEGREES = 5;

const KEY_STEPS: Record<string, number> = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 };

interface DragState {
  lastAngle: number;
  offset: number;
  isDragging: boolean;
}

function pointerAngle(event: React.PointerEvent<SVGSVGElement>): number {
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - (bounds.left + bounds.width / 2);
  const y = event.clientY - (bounds.top + bounds.height / 2);
  return (Math.atan2(y, x) * 180) / Math.PI;
}

export function useWheelRotation(size: number) {
  const segmentAngle = 360 / size;
  const [steps, setSteps] = useState(0);
  const [dragOffset, setDragOffset] = useState<number | null>(null);
  const drag = useRef<DragState | null>(null);
  const suppressClick = useRef(false);

  const position = mod(steps, size);
  const rotateBy = (delta: number) => setSteps((current) => current + delta);
  const rotateTo = (target: number) => rotateBy(shortestStep(position, target, size));

  function endDrag() {
    if (drag.current?.isDragging) {
      rotateBy(-Math.round(drag.current.offset / segmentAngle));
      suppressClick.current = true;
    }
    drag.current = null;
    setDragOffset(null);
  }

  const wheelHandlers = {
    onPointerDown(event: React.PointerEvent<SVGSVGElement>) {
      suppressClick.current = false;
      drag.current = { lastAngle: pointerAngle(event), offset: 0, isDragging: false };
    },
    onPointerMove(event: React.PointerEvent<SVGSVGElement>) {
      const state = drag.current;
      if (!state) return;
      if (event.buttons === 0) return endDrag();

      const angle = pointerAngle(event);
      state.offset += mod(angle - state.lastAngle + 180, 360) - 180;
      state.lastAngle = angle;
      if (!state.isDragging && Math.abs(state.offset) < DRAG_THRESHOLD_DEGREES) return;

      if (!state.isDragging) {
        state.isDragging = true;
        event.currentTarget.setPointerCapture(event.pointerId);
      }
      setDragOffset(state.offset);
    },
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    // A drag ends with a click on whichever segment is under the pointer, which would undo the drag.
    onClickCapture(event: React.MouseEvent<SVGSVGElement>) {
      if (!suppressClick.current) return;
      suppressClick.current = false;
      event.stopPropagation();
    },
    onKeyDown(event: React.KeyboardEvent<SVGSVGElement>) {
      if (event.key === "Home") rotateTo(0);
      else if (event.key in KEY_STEPS) rotateBy(KEY_STEPS[event.key]);
      else return;
      event.preventDefault();
    },
  };

  return {
    steps,
    position,
    rotation: -steps * segmentAngle + (dragOffset ?? 0),
    isDragging: dragOffset !== null,
    rotateBy,
    rotateTo,
    reset: () => rotateTo(0),
    wheelHandlers,
  };
}
