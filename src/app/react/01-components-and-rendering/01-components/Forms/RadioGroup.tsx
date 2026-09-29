type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  name: string;
  options: Option[];
};

export default function RadioGroup({ label, name, options }: Props) {
  return (
    <fieldset style={{ border: "none", padding: 0 }}>
      <legend>{label}</legend>

      {options.map((o) => (
        <label key={o.value} style={{ display: "flex", gap: 6 }}>
          <input type="radio" name={name} value={o.value} />
          {o.label}
        </label>
      ))}
    </fieldset>
  );
}
