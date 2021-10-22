import React from "react";
import Sidebar from "./../components/Sidebar";
import Header from "./../components/Header";
import Form from "./../components/FormProcess";

export default function FormProcess({ name }) {
  return (
    <div className="flex min-h-screen flex">
      <h1>{name}</h1>
      <Sidebar />
      <div className="flex flex-col space-y-5 py-5 w-full">
        <Header />
        <div className="flex flex-col w-full bg-gray-100 space-y-5 shadow-md">
          <div className="mx-5 mt-5">
            <p className="font-bold font-xl">
              Dashboard <span className="text-gray-300">|</span>{" "}
              <span className="text-sm font-light">Process registered client</span>
            </p>
          </div>
          <Form />
        </div>
      </div>
    </div>
  );
}