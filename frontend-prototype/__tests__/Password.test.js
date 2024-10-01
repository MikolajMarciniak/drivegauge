/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import Password from "../components/Password";


test('renders the Password Component', () => {
    render(<Password />);

});