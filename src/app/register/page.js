import React, { Suspense } from "react";
import RegisterPage from "../../../imports/register/RegisterPage";

const page = () => {
  return (
    <Suspense>
      <RegisterPage />
    </Suspense>
  );
};

export default page;
