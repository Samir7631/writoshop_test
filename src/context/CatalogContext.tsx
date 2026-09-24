import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { books as seedBooks, type Book } from "@/data/books";

export type NewBookInput = Omit<Book, "id" | "inStock">;

type CatalogContextValue = {
  books: Book[];
  addBook: (book: NewBookInput) => void;
  deleteBook: (bookId: string) => void;
  updateStock: (bookId: string, stock: number) => void;
  resetCatalog: () => void;
};

const STORAGE_KEY = "writoshop-catalog-v1";
const CatalogContext = createContext<CatalogContextValue | undefined>(undefined);

function loadBooks() {
  if (typeof window === "undefined") return seedBooks;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Book[]) : seedBooks;
  } catch {
    return seedBooks;
  }
}

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>(() => loadBooks());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  const value = useMemo<CatalogContextValue>(() => {
    const addBook = (book: NewBookInput) => {
      const stock = Math.max(0, Number(book.stock) || 0);
      setBooks((current) => [
        {
          ...book,
          stock,
          inStock: stock > 0,
          id: `book_${Date.now()}`,
        },
        ...current,
      ]);
    };

    const deleteBook = (bookId: string) =>
      setBooks((current) => current.filter((book) => book.id !== bookId));

    const updateStock = (bookId: string, stockValue: number) => {
      const stock = Math.max(0, Number(stockValue) || 0);
      setBooks((current) =>
        current.map((book) =>
          book.id === bookId ? { ...book, stock, inStock: stock > 0 } : book,
        ),
      );
    };

    return {
      books,
      addBook,
      deleteBook,
      updateStock,
      resetCatalog: () => setBooks(seedBooks),
    };
  }, [books]);

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCatalog must be used within a CatalogProvider");
  }
  return context;
}
