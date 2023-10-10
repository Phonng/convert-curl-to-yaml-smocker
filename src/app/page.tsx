"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  convertCurlToRequestObject,
  convertResponseToResponseMock,
  jsonToYaml,
} from "@/util";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  curl: string;
  response: string;
  httpStatus: number;
};

export default function Home() {
  const [mockData, setMockData] = useState<string | undefined>();
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.httpStatus && data.curl && data.response) {
      const request = convertCurlToRequestObject(data.curl);
      const status = data.httpStatus;
      const body = convertResponseToResponseMock(data.response);
      const nextMockData = jsonToYaml({
        request,
        response: {
          status,
          body,
        },
      });
      let formatMockData = "-" + nextMockData.slice(1);
      const lines = formatMockData.split("body: "); //format response body
      lines[0] = lines[0] + "body: >";
      lines[1] = "      " + lines[1];
      formatMockData = lines.join("\n");

      setMockData(formatMockData);
    }
  };

  return (
    <div className="bg-white h-[100vh]">
      <main className="mx-auto  max-w-[1024px]  p-12 text-black flex flex-col gap-6">
        <div>
          <h1 className="text-3xl">cURL to SMOCKER</h1>
          <h2 className="text-2xl">Paste curl command and response JSON</h2>
        </div>
        <div className="flex gap-12 m-auto">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4  w-[400px]">
                <div>
                  <div className="text-xl">cURL command</div>
                  <div className="">
                    <Textarea
                      className="h-[300px]"
                      placeholder="Paste cURL command. You can use generated string by Google Chrome DevTools!"
                      {...register("curl")}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-xl">Response JSON</div>
                  <div>
                    <Input
                      placeholder="HTTP status code"
                      {...register("httpStatus")}
                    />
                  </div>
                  <div>
                    <Textarea
                      className="h-[200px]"
                      placeholder="JSON response "
                      {...register("response")}
                    />
                  </div>
                </div>
                <div>
                  <Button type="submit">Convert</Button>
                </div>
              </div>
            </form>
          </div>
          <div className="bg-red w-[400px]">
            <div className="text-xl">Smocker</div>
            <Textarea
              className="h-[600px]"
              placeholder="mocker yaml will display here"
              value={mockData}
              onChange={(event) => setMockData(event.target.value)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
