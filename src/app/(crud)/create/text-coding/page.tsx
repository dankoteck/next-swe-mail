import CreateTextCodingForm from "./form";

export default function Page() {
  return (
    <>
      <div className="space-y-1 border-b border-primary pb-6">
        <h3 className="text-2xl">Text Coding</h3>
        <h4 className="text-base">All about text coding for this mail.</h4>
      </div>

      <div className="pt-6">
        <CreateTextCodingForm />
      </div>
    </>
  );
}
