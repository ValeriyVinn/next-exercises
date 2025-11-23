import { ReactNode } from "react";

interface FooterProps {
  children: ReactNode;
}

export default function CardFooter({ children }: FooterProps) {
  return <footer style={{ marginTop: 12  }}>{children}</footer>;
}
