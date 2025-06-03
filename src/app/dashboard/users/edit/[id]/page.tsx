// app/admin/users/edit/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();
      if (error) {
        console.error("Error fetching user:", error);
      } else if (data) {
        setName(data.name);
        setEmail(data.email);
        setLocation(data.location);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  const handleUpdate = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("users")
      .update({ name, email, location })
      .eq("id", userId);

    if (error) {
      setLoading(false);
      console.error("Error updating user:", error);
    } else {
      setLoading(false);
      router.push("/dashboard/users");
    }
  };

  return (
    <div className="p-6 space-y-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold">ویرایش کاربر</h1>
      <Input
        placeholder="نام"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="ایمیل"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="مکان"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <div className="flex flex-row gap-3 justify-between">
      <Button
        type="submit"
        disabled={loading}
        onClick={handleUpdate}
        className="cursor-pointer"
      >
        {loading ? "در حال ذخیره..." : "ذخیره کاربر"}
      </Button>{" "}
      <Link href="/dashboard/users" className="cursor-pointer rounded-md p-2 bg-gray-500 hover:bg-gray-600 text-white">
        بازگشت
      </Link>
      </div>
    </div>
  );
}
