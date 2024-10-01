/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import Footer from "../components/Footer";


test('renders the Footer Component', () => {
    render(<Footer />);

});