interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  return (
    <button style={{ padding: "8px 12px", cursor: "pointer" }}>
      {text}
    </button>
  );
}
