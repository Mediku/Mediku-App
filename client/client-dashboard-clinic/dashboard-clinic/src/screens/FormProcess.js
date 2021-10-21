import React from "react";
import Sidebar from "./../components/Sidebar";
import Header from "./../components/Header";
import Form from "./../components/FormProcess";

export default function FormProcess({ name }) {
  return (
    <div class="flex min-h-screen flex">
      <h1>{name}</h1>
      <Sidebar />
      <div class="flex flex-col space-y-5 py-5 w-full">
        <Header />
        <div class="flex flex-col w-full bg-gray-100 space-y-5 shadow-md">
          <div class="mx-5 mt-5">
            <p class="font-bold font-xl">
              Dashboard <span class="text-gray-300">|</span>{" "}
              <span class="text-sm font-light">Process registered client</span>
            </p>
          </div>
          <Form />
        </div>
      </div>
    </div>
  );
}