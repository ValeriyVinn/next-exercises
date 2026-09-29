interface PriceProps {
  value: number;
}

export default function Price({ value }: PriceProps) {
  return <p>Price: ${value}</p>;
}
