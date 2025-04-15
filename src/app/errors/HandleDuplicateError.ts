/* eslint-disable @typescript-eslint/no-explicit-any */
import { TerrorSourse, TGenericErrorResponse} from "../interface/error";

const HandleDuplicateError = (err: any): TGenericErrorResponse => {
  const statusCode = 400;

  const msg = err?.message.match(/"([^"]*)"/);

  const errorSources: TerrorSourse[] = [
    {
      path: "",
      message: `${msg[0]} is already exists. try new one..`,
    },
  ];

  return {
    statusCode,
    message: "Duplicate Validation Error",
    errorSources,
  };
};

export default HandleDuplicateError;
