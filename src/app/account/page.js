"use client";

import { useEffect, useState } from "react";

import ProfileView from "@/components/account/ProfileView";


export default function AccountPage() {

  return (
    <>
      <ProfileView onEdit={() => setEdit(true)} />
    </>
  );
}


