"use client";

type Props = {
  children: React.ReactNode;
  action?: string;
  method?: "get" | "post";
};

export default function FormWrapper({ children, action, method }: Props) {
  return (
    <form
      action={action}
      method={method}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "400px",
      }}
    >
      {children}
    </form>
  );
}
