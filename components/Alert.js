import React from "react";

export default function Alert({ name = "", count, alert, text, type = "add" }) {
  return (
    <>
      <div>
        <div
          className={`${
            type === "remove"
              ? "bg-red-100 border-red-400 text-red-700"
              : "bg-green-100 border-green-400 text-green-700"
          } text-center border text-sm px-4 my-3 py-2 rounded relative`}
          role="alert"
        >
          <strong className="font-bold text-sm">{name}</strong>
          <span className="block sm:inline ml-3 text-sm">{text}</span>
        </div>
      </div>
    </>
  );
}
