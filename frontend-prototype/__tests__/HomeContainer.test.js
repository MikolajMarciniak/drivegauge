/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import HomeContainer from "../components/HomeContainer";


test('renders the HomeContainer Component', () => {
    render(<HomeContainer />);

});