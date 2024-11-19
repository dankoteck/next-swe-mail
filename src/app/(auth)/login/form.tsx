"use client";

import GoogleIcon from "@/assets/icons/google.svg";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm() {
  return (
    <Card className="w-1/2">
      <CardHeader className="flex-row gap-3">
        <Avatar className="mt-1 size-12">
          <AvatarFallback className="bg-primary text-xl font-semibold text-white">
            NSM
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h1 className="text-3xl">Next SWE Mail</h1>
          <h2 className="text-lg">
            All you need about research, developments, etc... is in here.
          </h2>
        </div>
      </CardHeader>
      <CardFooter>
        <Button asChild variant="outline" className="w-full" size="lg">
          <Link href="/api/login/google">
            <Image width={24} height={24} alt="google icon" src={GoogleIcon} />
            Login with Google
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
