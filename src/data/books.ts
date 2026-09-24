export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  description: string;
  image: string;
  inStock: boolean;
  stock: number;
  rating: number;
  badge?: string;
  format: "Paperback" | "Hardcover" | "Ebook";
};

export const books: Book[] = [
  { id:"p1", title:"Whispers of the Quiet Forest", author:"Mira Sen", category:"Story Books", price:299, description:"A warm illustrated tale about courage, friendship and the small wonders hiding in the woods.", image:"https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=900&q=82", inStock:true, stock:18, rating:4.8, badge:"Bestseller", format:"Hardcover" },
  { id:"p2", title:"The Curious Atlas of Animals", author:"Arjun Mehta", category:"Learning Books", price:449, description:"An interactive learning book packed with fascinating facts, maps and wildlife discoveries.", image:"https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=82", inStock:true, stock:7, rating:4.9, badge:"Editor pick", format:"Hardcover" },
  { id:"p3", title:"Colours of the Festival", author:"Rhea Kapoor", category:"Colouring Books", price:199, description:"A vibrant colouring book inspired by Indian festivals, bold patterns and joyful celebrations.", image:"https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=82", inStock:true, stock:4, rating:4.7, badge:"Kids love it", format:"Paperback" },
  { id:"p4", title:"Mindful Mornings", author:"Tara Bose", category:"Ebooks", price:149, description:"A practical digital guide to calmer mornings, focused routines and better everyday habits.", image:"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=82", inStock:true, stock:999, rating:4.6, badge:"Instant read", format:"Ebook" },
  { id:"p5", title:"The Moonlight Post Office", author:"Anya Rao", category:"Story Books", price:349, description:"A magical bedtime adventure about a tiny post office that delivers letters after the stars come out.", image:"https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=900&q=82", inStock:true, stock:12, rating:4.9, badge:"New arrival", format:"Hardcover" },
  { id:"p6", title:"Little Inventors Lab", author:"Kabir Iyer", category:"Learning Books", price:399, description:"Hands-on experiments and clever challenges that turn everyday objects into science discoveries.", image:"https://images.unsplash.com/photo-1455885666463-9a8f27dce20f?auto=format&fit=crop&w=900&q=82", inStock:true, stock:5, rating:4.8, badge:"STEM favourite", format:"Paperback" },
  { id:"p7", title:"Dream in Doodles", author:"Naina Shah", category:"Colouring Books", price:249, description:"A playful sketch-and-colour collection designed to unlock imagination one page at a time.", image:"https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=82", inStock:true, stock:9, rating:4.5, format:"Paperback" },
  { id:"p8", title:"Focus Without the Fuss", author:"Neel Verma", category:"Ebooks", price:179, description:"A concise digital workbook for building attention, reducing distractions and finishing what matters.", image:"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=82", inStock:true, stock:999, rating:4.7, badge:"Quick read", format:"Ebook" },
  { id:"p9", title:"The River That Remembered", author:"Ishita Malhotra", category:"Story Books", price:329, description:"A lyrical story of memory, belonging and a river that quietly carries every secret downstream.", image:"https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=82", inStock:true, stock:3, rating:4.8, badge:"Staff pick", format:"Paperback" },
  { id:"p10", title:"Why Does the Sky Change?", author:"Devika Menon", category:"Learning Books", price:379, description:"Big science questions explained simply through illustrations, experiments and everyday examples.", image:"https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=900&q=82", inStock:true, stock:6, rating:4.9, badge:"Top rated", format:"Hardcover" },
];

export const categories = [
  { name:"Story Books", tagline:"Tales made for wonder.", short:"Stories" },
  { name:"Learning Books", tagline:"Curiosity with a purpose.", short:"Learning" },
  { name:"Colouring Books", tagline:"Make every page your own.", short:"Creative" },
  { name:"Ebooks", tagline:"Read instantly, anywhere.", short:"Ebooks" },
];

export const formatPrice = (price: number) => `₹${price}`;
