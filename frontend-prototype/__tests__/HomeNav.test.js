/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import HomeNav from "../components/HomeNav";


test('renders the HomeNav Component', () => {
    render(<HomeNav />);
    const links = screen.getAllByRole("link");
    
    expect(links[0]).toHaveTextContent(/DriveGauge/);
    expect(links[0]).toHaveAttribute('href', '..//');

    expect(links[1]).toHaveTextContent(/Sign in/);
    expect(links[1]).toHaveAttribute('href', '../login');

    expect(links[2]).toHaveTextContent(/Contact us/);
    expect(links[2]).toHaveAttribute('href', '../contacts');

    
});

