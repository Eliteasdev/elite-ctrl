import { useState, useEffect, Fragment } from "react";

import { Dialog, Combobox, Transition } from "@headlessui/react";
import SearchIcon from "./SearchIcon.jsx";

export default function CommandPalette({ options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function onKeydown(event) {
      if (event.key === "y" && (event.metaKey || event.ctrlKey)) {
        setIsOpen(!isOpen);
      }
    }
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [isOpen]);

  const filteredOptions = query
    ? options.filter((option) =>
        option.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        // open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        className="fixed inset-0 overflow-y-auto p-4 pt-[25vh] "
      >
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-300 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
        </Transition.Child>

        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-300 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            onChange={() => {}}
            as="div"
            className="relative max-w-xl mx-auto bg-white rounded-md shadow-2xl ring-1 ring-black/5 divide-y divide-gray-100 overflow-hidden"
          >
            <div className="flex items-center px-4">
              <SearchIcon className="h-40 w-6 text-red-800" />
              <Combobox.Input
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
                className="px-2 w-full border-0 bg-transparent focus:outline-none focus:ring-0 text-sm text-gray-800 placeholder-gray-400 h-12 "
                placeholder="Search..."
              />
            </div>
            {filteredOptions.length > 0 && (
              <Combobox.Options
                static
                className="py-4 text-sm max-h-96 overflow-y-auto"
              >
                {filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.id}
                    className={({ active }) =>
                      `px-4 py-2 font-medium text-gray-900 ${
                        active ? "bg-indigo-600" : "bg-white"
                      }`
                    }
                  >
                    <div>{option.title}</div>
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
            {query && filteredOptions.length === 0 && (
              <p className="p-4 text-sm text-gray-500">Sin resultados.</p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
