import { createPortal } from "react-dom";
import { useImperativeHandle, useRef } from "react";
import Button from "./Button";

export default function Modal({ ref, children, buttonText }) {
  const dialogRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      }
    }
  });

  return createPortal(
    <dialog className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
      ref={dialogRef}>
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>
          {buttonText}
        </Button>
      </form>
    </dialog>,
    document.getElementById('modal-root'));
}