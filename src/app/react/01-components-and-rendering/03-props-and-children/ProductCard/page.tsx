import Card from "./Card";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";
import Price from "./Price";
import Button from "./Button";
import CardFooter from "./CardFooter";

export default function ProductCard() {
  const products = [
    {
      id: 1,
      title: "iPhone 16 Pro",
      price: 1299,
      buttonText: "Buy now",
      footer: "In stock",
    },
    {
      id: 2,
      title: "Samsung Galaxy S24",
      price: 999,
      buttonText: "Order now",
      footer: "Only 5 left",
    },
    {
      id: 3,
      title: "Sony",
      price: 1010,
      buttonText: "Order now",
      footer: "Only 1 left",
    },
    {
      id: 4,
      title: "Nokia",
      price: 900,
      buttonText: "Buy now",
      footer: "In stock",
    },
  ];

  return (
    <>
      {products.map((product) => (
        <Card key={product.id}>
          <CardHeader title={product.title} />
          <CardBody>
            <Price value={product.price} />
            <Button text={product.buttonText} />
          </CardBody>
          <CardFooter>{product.footer}</CardFooter>
        </Card>
      ))}
    </>
  );
}
