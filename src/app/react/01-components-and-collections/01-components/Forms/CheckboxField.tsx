type Props = {
  label: string;
  name: string;
  value: string;
};

export default function CheckboxField({ label, name, value }: Props) {
  return (
    <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
      <input type="checkbox" name={name} value={value} />
      {label}
    </label>
  );
}
