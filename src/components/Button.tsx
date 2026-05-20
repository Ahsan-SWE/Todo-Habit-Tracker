import type { ReactNode } from "react";


type ButtonProps = {
  children: ReactNode;
};

export function Button({ children }: ButtonProps) {
  return (
    <button className="bg-violet-600 hover:bg-violet-500 transition-colors text-white px-3 py-1 rounded">
      {children}
    </button>
  );
}
