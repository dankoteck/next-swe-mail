import DangerousForm from "./dangerous-form";
import GeneralForm from "./general-form";

export default function Page() {
  return (
    <>
      <div className="space-y-1 border-b border-primary pb-6">
        <h3 className="text-2xl">Information</h3>
        <h4 className="text-base">All information about this mail template.</h4>
      </div>
      <div className="space-y-12 pt-6">
        <GeneralForm />
        <DangerousForm />
      </div>
    </>
  );
}
