import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Resources from "./Resources";

describe("Resources Component", () => {
    const mockResources = [
        {
            title: "Article 1",
            description: "Description of article 1",
            publishedAt: "2023-01-01T12:00:00Z",
            urlToImage: "https://via.placeholder.com/150",
        },
        {
            title: "Article 2",
            description: "Description of article 2",
            publishedAt: "2023-02-01T12:00:00Z",
            urlToImage: "https://via.placeholder.com/150",
        },
        {
            title: "Article 3",
            description: "Description of article 3",
            publishedAt: "2023-03-01T12:00:00Z",
            urlToImage: "https://via.placeholder.com/150",
        },
    ];

    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockResources),
            })
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test("renders without crashing and displays loading state", async () => {
        render(<Resources />);
        expect(screen.getByText(/Loading resources.../i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/News & Blogs/i)).toBeInTheDocument();
        });
    });

    test("displays error message on fetch failure", async () => {
        global.fetch.mockImplementationOnce(() =>
            Promise.reject(new Error("Network Error"))
        );

        render(<Resources />);

        await waitFor(() => {
            expect(screen.getByText(/Error: Network Error/i)).toBeInTheDocument();
        });
    });

    test("filters articles based on search query", async () => {
        render(<Resources />);
        await waitFor(() => {
            expect(screen.getByText(/Article 1/i)).toBeInTheDocument();
        });

        const searchInput = screen.getByLabelText(/Search Articles/i);
        fireEvent.change(searchInput, { target: { value: "Article 2" } });

        expect(screen.queryByText(/Article 1/i)).not.toBeInTheDocument();
        expect(screen.getByText(/Article 2/i)).toBeInTheDocument();
    });

    test("sorts articles by newest or oldest first", async () => {
        render(<Resources />);
        await waitFor(() => {
            expect(screen.getByText(/Article 1/i)).toBeInTheDocument();
        });

        const sortDropdown = screen.getByDisplayValue("Newest First");
        fireEvent.change(sortDropdown, { target: { value: "oldest" } });

        const sortedTitles = screen
            .getAllByRole("heading", { level: 5 }) // Article titles are level 5
            .map((node) => node.textContent);

        expect(sortedTitles).toEqual(["Article 1", "Article 2", "Article 3"]);
    });

    test("loads more articles when 'Show More' is clicked", async () => {
        render(<Resources />);
        await waitFor(() => {
            expect(screen.getByText(/Article 1/i)).toBeInTheDocument();
        });

        const showMoreButton = screen.getByText(/Show More/i);
        fireEvent.click(showMoreButton);

        // Simulating more resources (add as needed for further tests)
        expect(screen.getByText(/Article 3/i)).toBeInTheDocument();
    });

    test("toggles favorite articles", async () => {
        render(<Resources />);
        await waitFor(() => {
            expect(screen.getByText(/Article 1/i)).toBeInTheDocument();
        });

        const favoriteButton = screen.getAllByText(/Favorite/i)[0];
        fireEvent.click(favoriteButton);

        expect(favoriteButton.textContent).toBe("Unfavorite");
        fireEvent.click(favoriteButton);
        expect(favoriteButton.textContent).toBe("Favorite");
    });

    test("renders 'Search on Google' buttons for each article", async () => {
        render(<Resources />);
        await waitFor(() => {
            expect(screen.getByText(/Article 1/i)).toBeInTheDocument();
        });

        const googleButtons = screen.getAllByText(/Search on Google/i);
        expect(googleButtons).toHaveLength(mockResources.length);

        googleButtons.forEach((button, index) => {
            expect(button).toHaveAttribute(
                "href",
                `https://www.google.com/search?q=${encodeURIComponent(
                    mockResources[index].title
                )}`
            );
        });
    });
});
