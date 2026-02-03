import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider } from "react-router-dom";
import { router } from "../../app/router";

describe("Login", () => {
  it("shows error when email is empty (negative)", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const logInBtns = await screen.findAllByRole("button", { name: /log in/i });
    await user.click(logInBtns[0]);
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });

  it("shows error when password is empty after filling email (negative)", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const emailInputs = await screen.findAllByPlaceholderText(/email/i);
    await user.type(emailInputs[0], "test@example.com");
    const logInBtns = screen.getAllByRole("button", { name: /log in/i });
    await user.click(logInBtns[0]);
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it("shows welcome heading (positive)", async () => {
    render(<RouterProvider router={router} />);
    const headings = await screen.findAllByRole("heading", { name: /welcome/i });
    expect(headings[0]).toBeInTheDocument();
  });
});
