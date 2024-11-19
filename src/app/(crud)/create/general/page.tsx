import CreateGeneralForm from "./form";

export default function Page() {
  return (
    <>
      <div className="space-y-1 border-b border-primary pb-6">
        <h3 className="text-2xl">General</h3>
        <h4 className="text-base">Common Metadata.</h4>
      </div>

      <div className="pt-6">
        <CreateGeneralForm />
      </div>
    </>
  );
}
