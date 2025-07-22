"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/srp.module.css";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  const [user, setUser] = useState(null); // holds user data

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header className={styles["hotel-container-header"]}>
      <div className={styles.logo}>
        <Image
          src="/icons/Menu Container.svg"
          alt="hotel banner"
          width={100}
          height={32}
        />
      </div>

      {/* Conditionally render user dropdown or login/register */}
      {user ? (
        <div className={styles["user-dropdoun"]}>
          <select onChange={(e) => e.target.value === "logout" && handleLogout()}>
            <option>Hello, {user.first_name} {user.last_name}</option>
            <option value="profile">My Profile</option>
            <option value="logout">Logout</option>
          </select>
        </div>
      ) : (
        <div className={styles["login-register"]}>
          <Link href="/login"><span>Login</span></Link> |{" "}
          <Link href="/register"><span>Register</span></Link>
        </div>
      )}
    </header>
  );
};

export default NavBar;
