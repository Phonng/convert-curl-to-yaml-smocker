import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="bg-white h-[100vh]">
      <main className="mx-auto  max-w-[1240px]  py-12 text-black flex flex-col gap-6">
        <div>
          <h1 className="text-3xl">cURL to SMOCKER</h1>
          <h2 className="text-2xl">Paste curl command and response JSON</h2>
        </div>
        <div>
          <div className="flex flex-column gap-4">
            <div className="bg-yellow">
              <div>cURL command</div>
              <div>
                <Textarea className="resize-y rounded-md" />
              </div>
            </div>
            <div className="bg-blue"></div>
          </div>
          <div className="bg-red"></div>
        </div>
      </main>
    </div>
  );
}
