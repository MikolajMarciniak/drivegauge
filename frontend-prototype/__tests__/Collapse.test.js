/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import Collapse from "../components/Collapse";


test('renders the Collapse Component', () => {
    render(<Collapse />);
    expect(screen.getByRole("checkbox").getAttribute('class')).toMatch("peer");
});
