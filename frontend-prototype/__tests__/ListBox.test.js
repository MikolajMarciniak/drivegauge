/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import ListBox from "../components/ListBox";


test('renders the ListBox Component', () => {
    render(<ListBox />);

    const headers = screen.getAllByRole("columnheader");

    expect(headers[0]).toHaveTextContent(/Customer ID/);
    expect(headers[1]).toHaveTextContent(/Driving Score/);


});