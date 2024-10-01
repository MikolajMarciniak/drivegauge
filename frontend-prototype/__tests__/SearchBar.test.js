/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import SearchBar from "../components/SearchBar";


test('renders the SearchBar Component', () => {
    render(<SearchBar />);
    expect(screen.getByRole("textbox").getAttribute("placeholder")).toMatch("Type here");

});