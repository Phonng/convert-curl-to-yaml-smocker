"use client";

import CopyIcon from "@/assets/CopyIcon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  convertCurlToRequestObject,
  convertResponseToResponseMock,
  getAcceptProxyOption,
  jsonToYaml,
} from "@/util";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

type Inputs = {
  curl: string;
  response: string;
  httpStatus: number;
  acceptProxy: boolean;
};

export default function Home() {
  const [mockData, setMockData] = useState<string | undefined>();
  // eslint-disable-next-line no-unused-vars
  const [value, copy] = useCopyToClipboard();
  const form = useForm<Inputs>();
  const { register, handleSubmit } = form;
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.httpStatus && data.curl && data.response) {
      const request = convertCurlToRequestObject(data.curl);

      const status = data.httpStatus;
      const body = convertResponseToResponseMock(data.response);
      let nextMockData = jsonToYaml({
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
      if (data.acceptProxy) {
        let requestProxyOption = jsonToYaml(getAcceptProxyOption(data.curl));
        requestProxyOption = "-" + requestProxyOption.slice(1);
        formatMockData = requestProxyOption + formatMockData;
      }
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
            <Form {...form}>
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
                  <div className="flex items-center space-x-2">
                    <FormField
                      control={form.control}
                      name="acceptProxy"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                          <FormControl>
                            <Checkbox
                              id="acceptProxy"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              aria-label="accept proxy"
                            />
                          </FormControl>
                          <Label
                            htmlFor="acceptProxy"
                            className="cursor-pointer"
                          >
                            Accept proxy
                          </Label>
                        </FormItem>
                      )}
                    />
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
                    <Button aria-label="convert" type="submit">
                      Convert
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
          <div className="bg-red w-[400px] relative cursor-pointer">
            <div className="text-xl">Smocker</div>
            <div
              className="absolute right-1 mt-1 hover:text-sky-400	 active:text-sky-600 "
              onClick={() => copy(mockData || "")}
            >
              <TooltipProvider delayDuration={100} skipDelayDuration={100}>
                <Tooltip>
                  <TooltipTrigger aria-label="copy-icon">
                    <CopyIcon />
                  </TooltipTrigger>
                  <TooltipContent>Copy to clipboard</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Textarea
              className="h-[633px]"
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
