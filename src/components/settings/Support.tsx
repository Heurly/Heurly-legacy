"use client";
import { useState } from "react";
import { FormEvent } from "react";
import cn from "classnames";
const Support: React.FunctionComponent = () => {
  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    // cancel the reloading of the page
    e.preventDefault();

    // convert data to FormData
    const formData = new FormData(e.currentTarget);

    // send data to the api / discord bot
    console.log(formData.get("about"));

    // reset the form
    e.currentTarget.reset();
  };

  return (
    <div className="mt-6">
      <text className="text-white font-semibold">Faire une remarque</text>
      <div className="mt-4 mb-8">
        <form
          onSubmit={handleSendMessage}
          className="flex flex-col items-end gap-y-10"
        >
          <textarea
            id="about"
            name="about"
            rows={3}
            className={cn(
              // default theme
              "bg-black text-white ring-gray-300 placeholder:text-gray-400 focus:ring-orange-200",
              "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 h-1/6",
            )}
          />
          <button
            type="submit"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm text-black-900 font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-grey w-32"
          >
            Envoyer
          </button>
        </form>
      </div>
      <div className="flex justify-end"></div>

      <div className="mt-8 mb-8">
        <hr className="border-gray-600" />
      </div>
    </div>
  );
};

export default Support;
