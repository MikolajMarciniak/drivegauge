/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import LoginButton from "../components/LoginButton";


test('renders the LoginButton Component', () => {
    render(<LoginButton />);

    expect(screen.getByRole("button")).toHaveTextContent(/Login/);

});