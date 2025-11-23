type Props = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
};

export default function TextInput({ label, name, type = "text", placeholder }: Props) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {label}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        style={{ padding: "8px", border: "1px solid #ccc" }}
      />
    </label>
  );
}
