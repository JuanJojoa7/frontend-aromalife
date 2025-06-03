import React from "react";
import { render, screen, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { UserProvider, useUser } from "./user-context";

const mockUser = {
  id: "123",
  name: "Test User",
  email: "testuser@example.com",
  roles: "admin",
};

describe("UserContext", () => {
  it("should provide user data to children components", () => {
    const TestComponent = () => {
      const { user } = useUser();
      return <div data-testid="user-name">{user?.name || "No User"}</div>;
    };

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    act(() => {
      localStorage.setItem("user", JSON.stringify(mockUser));
      const event = new Event("storage");
      Object.assign(event, { key: "user", newValue: JSON.stringify(mockUser) });
      window.dispatchEvent(event);
    });

    expect(screen.getByTestId("user-name").textContent).toBe("Test User");
  });

  it("should allow updating user data", () => {
    const TestComponent = () => {
      const { user, setUser } = useUser();
      return (
        <div>
          <div>{user?.name}</div>
          <button onClick={() => setUser(mockUser)}>Set User</button>
        </div>
      );
    };

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    act(() => {
      screen.getByText("Set User").click();
    });

    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  it("should clear user data on logout", () => {
    const TestComponent = () => {
      const { user, logout } = useUser();
      return (
        <div>
          <div>{user?.name || "No User"}</div>
          <button onClick={logout}>Logout</button>
        </div>
      );
    };

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    act(() => {
      localStorage.setItem("user", JSON.stringify(mockUser));
      const event = new Event("storage");
      Object.assign(event, { key: "user", newValue: JSON.stringify(mockUser) });
      window.dispatchEvent(event);
    });

    act(() => {
      screen.getByText("Logout").click();
    });

    expect(screen.getByText("No User")).toBeInTheDocument();
  });

  it("should throw an error if useUser is used outside UserProvider", () => {
    expect(() => {
      const TestComponent = () => {
        useUser();
        return null;
      };

      render(<TestComponent />);
    }).toThrow("useUser must be used within a UserProvider");
  });
});
