import { describe, it, expect, vi, beforeEach } from "vitest";
import type { User } from "../../types/user";

const mockStore = new Map<string, User>();

vi.mock("idb", () => ({
  openDB: vi.fn(() =>
    Promise.resolve({
      get: (_store: string, id: string) => Promise.resolve(mockStore.get(id)),
      put: (_store: string, user: User) => {
        mockStore.set(user.id, user);
        return Promise.resolve();
      },
      transaction: (_store: string, _mode: string) => ({
        store: {
          put: (user: User) => {
            mockStore.set(user.id, user);
          },
        },
        done: Promise.resolve(),
      }),
    })
  ),
}));

import { cacheUser, getCachedUser, cacheUsers } from "./users.store";

describe("users.store", () => {
  beforeEach(() => {
    mockStore.clear();
  });

  it("cacheUser stores user and getCachedUser returns it (positive)", async () => {
    const user: User = {
      id: "1",
      organization: "Lendsqr",
      username: "Test User",
      email: "test@example.com",
      phone: "07012345678",
      dateJoined: "2024-01-01T00:00:00.000Z",
      status: "Active",
    };
    await cacheUser(user);
    const retrieved = await getCachedUser("1");
    expect(retrieved).toBeDefined();
    expect(retrieved?.id).toBe("1");
    expect(retrieved?.username).toBe("Test User");
  });

  it("getCachedUser returns undefined for non-existent id (negative)", async () => {
    const result = await getCachedUser("non-existent");
    expect(result).toBeUndefined();
  });

  it("cacheUsers stores multiple users", async () => {
    const users: User[] = [
      {
        id: "a",
        organization: "A",
        username: "User A",
        email: "a@test.com",
        phone: "07000000001",
        dateJoined: "2024-01-01",
        status: "Active",
      },
      {
        id: "b",
        organization: "B",
        username: "User B",
        email: "b@test.com",
        phone: "07000000002",
        dateJoined: "2024-01-02",
        status: "Inactive",
      },
    ];
    await cacheUsers(users);
    expect(await getCachedUser("a")).toBeDefined();
    expect(await getCachedUser("b")).toBeDefined();
    expect((await getCachedUser("a"))?.username).toBe("User A");
  });
});
