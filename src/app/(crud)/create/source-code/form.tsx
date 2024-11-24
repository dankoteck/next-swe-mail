"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
  code: z.string().optional(),
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

function SourceCodeEditor({ onChange }: { onChange: (val: string) => void }) {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      CodeBlockLowlight.extend({ addNodeView }).configure({ lowlight }),
    ],
    content: "",
    immediatelyRender: false, // for SSR problem
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <EditorContent
      editor={editor}
      className="rounded-md border border-primary bg-[#282c34] p-4 text-[#abb2bf]"
    />
  );
}

export default function SourceCodeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { code: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <SourceCodeEditor onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save Code</Button>
      </form>
    </Form>
  );
}
