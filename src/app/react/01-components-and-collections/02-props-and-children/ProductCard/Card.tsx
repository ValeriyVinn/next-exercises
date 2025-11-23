import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div style={{marginBottom: "20px", border: "1px solid #ccc", padding: 16, borderRadius: 8 }}>
      {children}
    </div>
  );
}
