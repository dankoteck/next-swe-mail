"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  hasTextCoding: z.boolean().default(false),
  devicesTested: z.boolean().default(false),
});

export default function DangerousForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasTextCoding: false,
      devicesTested: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h4 className="mb-4 text-2xl font-semibold text-red-500">
          Dangerous Zone
        </h4>
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="hasTextCoding"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base font-semibold text-red-500">
                    Text Coding
                  </FormLabel>
                  <FormDescription>
                    Check this if this mail contains Text Coding.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="devicesTested"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base font-semibold text-red-500">
                    Devices Tested
                  </FormLabel>
                  <FormDescription>
                    <span className="mb-2 block">
                      Check this if this mail (at least) tested on these
                      devices.
                    </span>
                    <span className="flex flex-col gap-1">
                      <span>- iPhone 11</span>
                      <span>- iPhone 8</span>
                      <span>- Windows Surface</span>
                      <span>- Android 12</span>
                    </span>
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit">Save Dangerous Zone</Button>
        </div>
      </form>
    </Form>
  );
}
