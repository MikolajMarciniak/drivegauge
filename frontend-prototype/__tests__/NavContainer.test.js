/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import NavContainer from "../components/NavContainer";


test('renders the NavContainer Component', () => {
    render(<NavContainer />);

});