/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import Drawer from "../components/Drawer";


test('renders the Drawer Component', () => {
    render(<Drawer />);
    expect(screen.getByRole("checkbox").getAttribute('class')).toMatch("drawer-toggle");

    const links = screen.getAllByRole("button");
    expect(links[0]).toHaveAccessibleName(/Home/);
    expect(links[1]).toHaveAccessibleName(/Dashboard/);
    expect(links[2]).toHaveAccessibleName(/Support/);
    expect(links[3]).toHaveAccessibleName(/Documentation/);

});