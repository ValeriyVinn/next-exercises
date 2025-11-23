"use client"

import UserCard from "./UserCard";
import { User } from "./types";

export default function UserProfile() {
  const user: User = {
    name: "Іван Петренко",
    email: "ivan.petrenko@example.com",
    isActive: false
  };

  return (
    <div>
      <h1>Профіль користувача</h1>
      <UserCard user={user} />
    </div>
  );
}
