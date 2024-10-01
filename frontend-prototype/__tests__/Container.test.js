/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import Container from "../components/Container";


test('renders the Container Component', () => {
    render(<Container />);

});