"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const currentMailTypes = [
  "SBS/SBF",
  "comado2024",
  "scrum2024",
  "swe-follow",
  "wineseminar2024",
  "swe-cp24november",
] as const;

const formSchema = z.object({
  width: z.enum(["600", "300"]),
  type: z.enum(currentMailTypes).nullable(),
  ticket: z.string().min(1),
});

export default function CreateGeneralForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      width: "600",
      type: null,
      ticket: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="ticket"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticket</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Which ticket about this mail.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {currentMailTypes.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Type of mail. It can be one of those. If not, just create a new
                one.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="width"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Width</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="600">600px</SelectItem>
                  <SelectItem value="375">375px</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Width of the mail. It iss usually is `375px` or `600px`
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save General</Button>
      </form>
    </Form>
  );
}
