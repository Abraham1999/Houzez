import {
  CheckCircleIcon,
  CurrencyPoundIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { landingPageCards } from "../../utils/data";

const LandingPage = () => {
  const [images] = useState([
    { url: "landing1.jpeg", price: "£5,400/mo", interest: "3.5%" },
    { url: "landing2.jpeg", price: "£3,500/mo", interest: "4.0%" },
    { url: "landing3.jpeg", price: "£1,900/mo", interest: "2.3%" },
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    // Clear interval on component unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <div className="px-8 py-2 lg:py-8 bg-[#FAF3F0]">
        <div>
          <div className="flex items-center ">
            <div className="flex-1  pb-16 lg:pb-24 mx-auto rounded-lg">
              <div className="flex flex-col md:flex-row">
                <div className="sm:m-auto sm:w-full sm:max-w-md py-8">
                  <h1 className="text-left text-6xl font-bold tracking-tight">
                    Make one of our houses,{" "}
                    <span className="italic">your home!</span>
                  </h1>
                  <p className="py-8 text-gray-500 text-xl font-bold">
                    We eliminate middlemen by connecting you directly to
                    property sellers and buyers.
                  </p>
                  <Link
                    to="register"
                    className="font-semibold relative rounded-full px-4 py-2 text-white bg-[#0C356A] hover:text-white"
                  >
                    Get started
                  </Link>
                </div>

                <div className="lg:block lg:h-3/4 lg:w-1/2 relative">
                  <img
                    className="object-cover rounded-3xl"
                    src={require(`../../assets/images/${images[currentImageIndex].url}`)}
                    alt={`Slide ${currentImageIndex + 1}`}
                  />
                  <div className="hidden w-full absolute -bottom-24 sm:-bottom-16 lg:left-0 lg:right-0 lg:flex justify-center">
                    <div className="grid grid-cols-3 space-x-4 mx-auto px-16 py-6 bg-white shadow-lg rounded-xl">
                      <div className="col-span-1">
                        <p className="text-sm font-bold ">Interest rate</p>
                        <p className="text-5xl text-orange-300">
                          {images[currentImageIndex].interest}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm font-bold ">Monthly payments</p>
                        <p className="text-5xl text-orange-300">
                          {images[currentImageIndex].price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white px-8 py-16">
        <h1 className="pb-10 text-center text-5xl font-semibold">
          Why choose Houzez
        </h1>

        <div className="text-center grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <CurrencyPoundIcon
              className="h-12 w-12 text-[#0C356A] mx-auto"
              aria-hidden="true"
            />
            <h3 className="font-bold text-2xl">Higher proceeds</h3>
            <p>
              Maximize your property sales potential by up to 14% with our
              tailored buyer interaction strategies.
            </p>
          </div>

          <div>
            <UserGroupIcon
              className="h-12 w-12 text-[#0C356A] mx-auto"
              aria-hidden="true"
            />
            <h3 className="font-bold text-2xl">More Buyers / Sellers</h3>
            <p>
              Accelerate your transactions by tapping into our extensive network
              of buyers and sellers for swift closures.
            </p>
          </div>
          <div>
            <CheckCircleIcon
              className="h-12 w-12 text-[#0C356A] mx-auto"
              aria-hidden="true"
            />
            <h3 className="font-bold text-2xl">Faster Property Closing</h3>
            <p>
              Properties undergo swift closure facilitated by ongoing bidding
              and negotiations, expediting the transaction process.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#FAF3F0] px-16 py-8 lg:py-12">
        <h1 className="text-center text-5xl font-semibold">
          How Houzez changed lives
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-2">
          {landingPageCards.map((card) => (
            <figure key={card.id} className="md:flex bg-white rounded-xl p-8 md:p-0">
              <img
                className="object-cover w-24 h-24 md:w-48 md:h-auto mx-auto  md:rounded-l-md"
                src={card.url}
                alt={card.author}
              />
              <div className="pt-8 md:p-8 text-center md:text-left space-y-4">
                <blockquote>
                  <p className="text-lg font-medium">{card.subtitle}</p>
                </blockquote>
                <figcaption className="font-medium">
                  <div className="text-[#0C356A]">{card.author} </div>
                  <div className="text-[#0C356A]">{card.location}</div>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
