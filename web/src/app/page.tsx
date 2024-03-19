"use client";

import { useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LANGUAGES } from "@/lib/types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import AnimatedSpinner from "@/components/animated-spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { env } from "@/env.mjs";
import { toast } from "sonner";
import Link from "next/link";

const formSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  language: z.enum([
    "JavaScript (Node.js 18.15.0)",
    "Python (3.11.2)",
    "Java (OpenJDK 13.0.1)",
    "C++ (GCC 9.2.0)",
  ]),
  code: z.string().min(1, {
    message: "Code cannot be empty.",
  }),
  stdin: z.string().optional(),
});

const codePlaceholder = `def sum(a, b): 
    return a + b`;

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [loadingState, setLoadingState] = useState("Running Code");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      language: "JavaScript (Node.js 18.15.0)",
      code: "",
      stdin: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setLoadingState("Parsing");
    // Convert code and stdin to base64
    const codeBase64 = btoa(values.code);
    let stdinBase64 = "";
    if (values.stdin) {
      stdinBase64 = btoa(values.stdin);
    }

    let token;
    let stdout;
    try {
      setLoadingState("Running Code");
      const getToken = await fetch(
        `${env.NEXT_PUBLIC_BACKEND_URL}/judge0/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            languageId: LANGUAGES[values.language],
            code: codeBase64,
            stdin: stdinBase64,
          }),
        }
      );

      token = await getToken.json();
      const getStdout = await fetch(
        `${env.NEXT_PUBLIC_BACKEND_URL}/judge0/get`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(token.data),
        }
      );

      stdout = await getStdout.json();
      stdout = stdout.data;
    } catch (error) {
      setLoading(false);
      return toast.error(
        "An error occurred while submitting your code. Please try again later"
      );
    }

    try {
      setLoadingState("Submitting");
      await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/submissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          language: values.language,
          code: codeBase64,
          stdin: stdinBase64,
          stdout: stdout,
        }),
      });

      toast.success(
        <div className="flex flex-row justify-between items-center gap-3 w-full">
          <p>Code submitted successfully</p>
          <Button size="ln" onClick={() => toast.dismiss()} asChild>
            <Link href="/all-snippets">View</Link>
          </Button>
        </div>,
        {
          duration: 5000,
        }
      );
      form.reset({
        username: "",
        language: "JavaScript (Node.js 18.15.0)",
        code: "",
        stdin: "",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return toast.error(
        "An error occurred while submitting your code. Please try again later"
      );
    }
  }

  return (
    <main className="max-w-screen-xl mx-auto font-sans">
      <Card className="mt-[5rem] mx-3">
        <CardHeader>
          <CardTitle>Create a snippet</CardTitle>
          <CardDescription>Add your snippet to this site.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="manik" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Langauge</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a langauge" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(LANGUAGES).map(
                          ([language, languageId]) => {
                            return (
                              <SelectItem key={languageId} value={language}>
                                {language}
                              </SelectItem>
                            );
                          }
                        )}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Language of the code you wish to submit.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={codePlaceholder}
                        className="font-mono max-h-[500px] overflow-scroll"
                        wrap="off"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Write you code here.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stdin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Input</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder=""
                        className="max-h-[200px] font-mono overflow-scroll"
                        wrap="off"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the input for your code
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-end">
                <Button disabled={loading}>
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <AnimatedSpinner className="h-6 w-6" />
                      <span>{loadingState}</span>
                    </div>
                  ) : (
                    <span>Submit</span>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
