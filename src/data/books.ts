export type Book = {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  image: string;
  inStock: boolean;
};

export const books: Book[] = [
  {
    id: "p1",
    title: "Whispers of the Quiet Forest",
    category: "Story Books",
    price: 299,
    description:
      "A heartwarming illustrated tale about courage, friendship and the small wonders of the woods.",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=70",
    inStock: true,
  },
  {
    id: "p2",
    title: "The Curious Atlas of Animals",
    category: "Learning Books",
    price: 449,
    description:
      "An interactive learning book filled with fun facts, maps and beautiful illustrations of wildlife.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=70",
    inStock: true,
  },
  {
    id: "p3",
    title: "Colours of the Festival",
    category: "Colouring Books",
    price: 199,
    description:
      "A vibrant colouring book celebrating Indian festivals. Thick paper, bold outlines, hours of fun.",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=70",
    inStock: true,
  },
  {
    id: "p4",
    title: "Mindful Mornings (Ebook)",
    category: "Ebooks",
    price: 149,
    description:
      "A digital guide to building a calm, focused morning routine. Delivered as a downloadable PDF.",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=70",
    inStock: true,
  },
];

export const categories = [
  { name: "Ebooks", tagline: "Read anywhere, anytime." },
  { name: "Story Books", tagline: "Tales that spark wonder." },
  { name: "Colouring Books", tagline: "Hours of creative fun." },
  { name: "Learning Books", tagline: "Workbooks that work." },
];

export const formatPrice = (price: number) => `₹${price}`;
