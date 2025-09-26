export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  previews: string[];
  popular: boolean;
  category: string;
  inStock: boolean;
};

export const productList: Product[] = [
  {
    id: 1,
    name: "Classic Santa Letter",
    description: "Traditional red and green design with Santa's signature",
    image: "/LetterFromSanta.png",
    previews: [
      "/LetterFromSanta.png",
      "/LetterFromSanta.png",
      "/LetterFromSanta.png",
    ],
    category: "Letter",
    popular: true,
    price: 9.89,
    inStock: true,
  },
  {
    id: 2,
    name: "Winter Wonderland Card",
    description: "Snowy scene with reindeer and Christmas trees",
    image: "/LetterFromSanta.png",
    category: "Card",
    previews: [
      "/LetterFromSanta.png",
      "/LetterFromSanta.png",
      "/LetterFromSanta.png",
    ],
    popular: false,
    price: 9.89,
    inStock: true,
  },
  {
    id: 3,
    name: "Elf Workshop Letter",
    description: "Fun design featuring Santa's busy workshop",
    image: "/LetterFromSanta.png",
    category: "Letter",
    previews: [
      "/LetterFromSanta.png",
      "/LetterFromSanta.png",
      "/LetterFromSanta.png",
    ],
    popular: false,
    price: 9.89,
    inStock: true,
  },
  {
    id: 4,
    name: "North Pole Postcard",
    description: "Vintage-style postcard from the North Pole",
    image: "/LetterFromSanta.png",
    category: "Card",
    previews: [
      "/LetterFromSanta.png",
      "/LetterFromSanta.png",
      "/LetterFromSanta.png",
    ],
    popular: true,
    price: 9.89,
    inStock: true,
  },
  {
    id: 5,
    name: "Naughty or Nice Certificate",
    description: "Official certificate with personalized details",
    image: "/LetterFromSanta.png",
    category: "Certificate",
    previews: [
      "/LetterFromSanta.png",
      "/LetterFromSanta.png",
      "/LetterFromSanta.png",
    ],
    popular: false,
    price: 9.89,
    inStock: true,
  },
  {
    id: 6,
    name: "Christmas Magic Letter",
    description: "Sparkly design with magical Christmas elements",
    image: "/LetterFromSantas.png",
    category: "Letter",
    previews: [
      "/LetterFromSanta.png",
      "/LetterFromSanta.png",
      "/LetterFromSanta.png",
    ],
    popular: false,
    price: 9.89,
    inStock: true,
  },
];

export type InProgressProduct = {
  id: string;
  productId: number;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  message: string;
};

export type InProgressProductWithProduct = Omit<
  InProgressProduct,
  "productId"
> & {
  product: Product;
  actuallyPaid?: number;
};

export type InProgressOrder = {
  products: InProgressProduct[];
  total: number;
};

export type InProgressOrderWithProducts = {
  products: InProgressProductWithProduct[];
  total: number;
};

export const DefaultMessage: string = "Merry Christmas from Santa's Workshop!";
