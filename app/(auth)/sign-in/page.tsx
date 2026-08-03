import React from 'react'
import Image from "next/image";
import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import { GithubSignInForm } from '@/features/auth/components/github-sign-in-form';


export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to CodeRuby AI Code Reviewer with your GitHub account.",
};

type SignInPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};


const SignInPage = async ({ searchParams }: SignInPageProps) => {
  const { callbackUrl } = await searchParams;
  return (
    <Card className="card-premium animate-scale-in border-border/60">
      <CardHeader className="items-center text-center">
        <div className="mb-5 flex justify-center pt-2">
          <Image
            src="/logo2.svg"
            alt="CodeRuby AI Code Reviewer"
            width={140}
            height={140}
            priority
            className="text-foreground"
          />
        </div>
        <CardTitle className="text-lg font-semibold tracking-tight">
          Welcome back
        </CardTitle>
        <CardDescription className="mt-1">
          Sign in with GitHub to review and manage your code.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldSet>
          <FieldGroup>
            <Field>
              <GithubSignInForm callbackUrl={callbackUrl} />
              <FieldDescription className="mt-4 text-center text-[11px] leading-relaxed">
                We only request the permissions needed to identify your
                account. You can revoke access anytime from GitHub settings.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </CardContent>
    </Card>
  )
}

export default SignInPage