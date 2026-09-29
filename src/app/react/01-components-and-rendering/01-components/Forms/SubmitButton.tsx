type Props = {
  children: React.ReactNode;
};

export default function SubmitButton({ children }: Props) {
  return (
    <button
      type="submit"
      style={{
        padding: "10px 16px",
        background: "black",
        color: "white",
        border: 0,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
