type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  name: string;
  options: Option[];
};

export default function SelectField({ label, name, options }: Props) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {label}
      <select name={name} style={{ padding: "8px" }}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
