/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import GraphContainer from "../components/GraphContainer";


test('renders the GraphContainer Component', () => {
    render(<GraphContainer />);

});