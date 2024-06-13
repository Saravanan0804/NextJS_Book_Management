import { render, fireEvent } from "@testing-library/react";
import AddBookForm from "../AddBookForm";

describe("AddBookForm", () => {
  it("should render form fields", () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <AddBookForm addBook={() => {}} />,
    );
    expect(getByLabelText("Title")).toBeInTheDocument();
    expect(getByLabelText("Author")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter book title")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter book author")).toBeInTheDocument();
  });

  it("should add a book when form is submitted with valid input", () => {
    const mockAddBook = jest.fn();
    const { getByLabelText, getByText } = render(
      <AddBookForm addBook={mockAddBook} />,
    );
    const titleInput = getByLabelText("Title");
    const authorInput = getByLabelText("Author");
    const addButton = getByText("Add Book");

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(authorInput, { target: { value: "Test Author" } });
    fireEvent.click(addButton);

    expect(mockAddBook).toHaveBeenCalledWith({
      title: "Test Title",
      author: "Test Author",
    });
    expect(titleInput).toHaveValue("");
    expect(authorInput).toHaveValue("");
  });

  it("should not add a book when form is submitted with empty input", () => {
    const mockAddBook = jest.fn();
    const { getByText } = render(<AddBookForm addBook={mockAddBook} />);
    const addButton = getByText("Add Book");

    fireEvent.click(addButton);

    expect(mockAddBook).not.toHaveBeenCalled();
  });
});
