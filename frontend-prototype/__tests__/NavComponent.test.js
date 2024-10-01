/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import NavComponent from "../components/NavComponent";


test('renders the NavComponent Component', () => {
    render(<NavComponent />);

});