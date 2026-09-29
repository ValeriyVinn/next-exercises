"use client";

import { User } from "./types";

type UserDetailsProps = User;

export default function UserDetails({
  name,
  email,
  isActive,
}: UserDetailsProps) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Email: {email}</p>
      <p>Статус: {isActive ? "Активний" : "Неактивний"}</p>
    </div>
  );
}
