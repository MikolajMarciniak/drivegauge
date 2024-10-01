/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import Graph from "../components/Graph";


test('renders the Graph Component', () => {
    render(<Graph />);

});