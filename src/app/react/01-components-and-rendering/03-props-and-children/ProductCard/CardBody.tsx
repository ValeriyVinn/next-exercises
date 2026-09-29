import { ReactNode } from "react";

interface CardBodyProps {
  children: ReactNode;
}

export default function CardBody({ children }: CardBodyProps) {
  return <div style={{ margin: "12px 0" }}>{children}</div>;
}
