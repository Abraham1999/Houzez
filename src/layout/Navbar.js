import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserContext, classNames } from "../utils/helpers";
import { Link, useLocation } from "react-router-dom";
import { navigation } from "../utils/data";
import { useContext } from "react";

function Navbar() {
  const location = useLocation();
  const user = useContext(UserContext);

  const filteredNavigationList = () => {
    if (user === null) {
      return navigation;
    } else if (user[0].accountType === "seller") {
      return navigation.filter((item) => item.name !== "Sellers");
    } else if (user[0].accountType === "buyer") {
      return navigation.filter((item) => item.name !== "Buyer");
    }
  };

  return (
    <Disclosure
      as="nav"
      className={classNames(
        location.pathname === "/" ? "bg-[#FAF3F0]" : "bg-white"
      )}
    >
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <img
                      className="h-8 w-auto cursor-pointer"
                      src={require("../assets/images/houzez.png")}
                      alt="Houzez"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {filteredNavigationList().map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.href === location.pathname
                            ? "text-[#0C356A] font-bold"
                            : "text-gray-500 hover:text-[#0C356A]",
                          "rounded-md px-3 py-2 text-md font-medium"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {user === null ? (
                  <Link
                    to="register"
                    className="font-semibold relative rounded-full border border-[#0C356A] px-2 text-[#0C356A] hover:text-[#0C356A] focus:outline-none focus:ring-2 focus:ring-[#0C356A] focus:ring-offset-2 focus:ring-offset-[#0C356A]"
                  >
                    Get started
                  </Link>
                ) : (
                  <Link
                    to="#"
                    className="font-semibold relative rounded-full border border-[#0C356A] px-2 text-[#0C356A] hover:text-[#0C356A] focus:outline-none focus:ring-2 focus:ring-[#0C356A] focus:ring-offset-2 focus:ring-offset-[#0C356A]"
                  >
                    Profile
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {filteredNavigationList().map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.href === location.pathname
                      ? "bg-[#0C356A] text-white"
                      : "text-gray-500 hover:bg-[#0C356A] hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;
