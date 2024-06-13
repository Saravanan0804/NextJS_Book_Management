import { render, waitFor } from "@testing-library/react";
import BookList from "../BookList";
import { Book } from "../../types/Book";
import { fetchBooks } from "@/lib/fetchBooks";

jest.mock("../lib/fetchBooks");

const mockBooks: Book[] = [
  { id: 1, title: "Test Book 1", author: "Test Author 1" },
  { id: 2, title: "Test Book 2", author: "Test Author 2" },
];

describe("BookList", () => {
  beforeEach(() => {
    (fetchBooks as jest.Mock).mockResolvedValue(mockBooks);
  });

  it("should render book list correctly", async () => {
    const { getByText } = render(<BookList books={mockBooks} />);

    await waitFor(() => {
      expect(getByText("Test Book 1")).toBeInTheDocument();
      expect(getByText("Test Author 1")).toBeInTheDocument();
      expect(getByText("Test Book 2")).toBeInTheDocument();
      expect(getByText("Test Author 2")).toBeInTheDocument();
    });
  });

  it("should show loading state while fetching books", async () => {
    const { getByText } = render(<BookList books={[]} />);

    expect(getByText("Loading...")).toBeInTheDocument();
  });
});
