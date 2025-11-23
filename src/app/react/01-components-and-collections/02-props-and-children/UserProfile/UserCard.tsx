"use client"

import UserDetails from "./UserDetails";
import { User } from "./types";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="card">
      <UserDetails
        name={user.name}
        email={user.email}
        isActive={user.isActive}
      />
    </div>
  );
}