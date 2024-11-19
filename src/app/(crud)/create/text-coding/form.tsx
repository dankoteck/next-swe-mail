"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import {
  EditorContent,
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  useEditor,
} from "@tiptap/react";
import html from "highlight.js/lib/languages/xml";
import { createLowlight } from "lowlight";
import { useForm } from "react-hook-form";
import { z } from "zod";

const lowlight = createLowlight();

lowlight.register("html", html);

const formSchema = z.object({
  hasTextCoding: z.boolean(),
});

const addNodeView = () => {
  return ReactNodeViewRenderer(() => (
    <NodeViewWrapper>
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  ));
};

export default function CreateTextCodingForm() {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      CodeBlockLowlight.extend({ addNodeView }).configure({ lowlight }),
    ],
    content: "",
    immediatelyRender: false, // for SSR issue
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasTextCoding: false,
    },
  });

  const hasTextCoding = form.watch("hasTextCoding");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="hasTextCoding"
            render={({ field }) => (
              <FormItem className="flex gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-1"
                  />
                </FormControl>
                <div className="mt-0">
                  <FormLabel className="text-base">Has Text Coding</FormLabel>
                  <FormDescription>
                    Check it if this mail have text coding inside.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          {hasTextCoding && (
            <EditorContent
              editor={editor}
              className="rounded-md border border-primary bg-[#282c34] p-4 text-[#abb2bf]"
            />
          )}

          <Button type="submit">Save Text Coding</Button>
        </form>
      </Form>
    </>
  );
}
