import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";
import BookingsPage from "../pages/bookings";
import BuyersPage from "../pages/buyer";
import BuyerId from "../pages/buyer/id";
import LandingPage from "../pages/landing";
import NotFoundPage from "../pages/notfound";
import PropertiesPage from "../pages/property";
import AddProperty from "../pages/property/add";
import PropertyByIdPage from "../pages/property/id";
import SellersPage from "../pages/seller";
import SellerId from "../pages/seller/id";

export const navigation = [
  { name: "Properties", href: "/property" },
  { name: "Sellers", href: "/sellers" },
  { name: "Buyers", href: "/buyers" },
  { name: "Bookings", href: "/bookings" },
];

export const propertyTypeOptions = [
  { label: "Detached", value: "Detached" },
  { label: "Semi-Detached", value: "Semi-Detached" },
  { label: "Mansion", value: "Mansion" },
  { label: "Apartment", value: "Apartment" },
  { label: "Cottage", value: "Cottage" },
  { label: "Bungalow", value: "Bungalow" },
];
export const bathroomNumberOptions = [
  { label: 1, value: 1 },
  { label: 2, value: 2 },
  { label: 3, value: 3 },
  { label: 4, value: 4 },
  { label: 5, value: 5 },
  { label: 6, value: 6 },
  { label: 7, value: 7 },
];
export const bedroomNumberOptions = [
  { label: 1, value: 1 },
  { label: 2, value: 2 },
  { label: 3, value: 3 },
  { label: 4, value: 4 },
  { label: 5, value: 5 },
  { label: 6, value: 6 },
  { label: 7, value: 7 },
];
export const gardenNumberOptions = [
  { label: 0, value: 0 },
  { label: 1, value: 1 },
  { label: 2, value: 2 },
  { label: 3, value: 3 },
];

export const limitOptions = [
  { label: "All", value: "all" },
  { label: 5, value: 5 },
  { label: 10, value: 10 },
  { label: 20, value: 20 },
];

export const propertyTypeFilterOptions = [
  { label: "Type", value: "Type" },
  { label: "Detached", value: "Detached" },
  { label: "Semi-Detached", value: "Semi-Detached" },
  { label: "Mansion", value: "Mansion" },
  { label: "Apartment", value: "Apartment" },
  { label: "Cottage", value: "Cottage" },
  { label: "Bungalow", value: "Bungalow" },
];

export const bathroomFilterOptions = [
  { label: "Bathrooms", value: "Bathrooms" },
  { label: "1 bathroom", value: 1 },
  { label: "2 bathrooms", value: 2 },
  { label: "3 bathrooms", value: 3 },
  { label: "4 bathrooms", value: 4 },
  { label: "5 bathrooms", value: 5 },
  { label: "6 bathrooms", value: 6 },
  { label: "7 bathrooms", value: 7 },
];
export const bedroomFilterOptions = [
  { label: "Bedrooms", value: "Bedrooms" },
  { label: "1 bedroom", value: 1 },
  { label: "2 bedrooms", value: 2 },
  { label: "3 bedrooms", value: 3 },
  { label: "4 bedrooms", value: 4 },
  { label: "5 bedrooms", value: 5 },
  { label: "6 bedrooms", value: 6 },
  { label: "7 bedrooms", value: 7 },
];
export const gardenFilterOptions = [
  { label: 0, value: 0 },
  { label: 1, value: 1 },
  { label: 2, value: 2 },
  { label: 3, value: 3 },
];

export const propertyImages = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 4,
    url: "https://images.pexels.com/photos/1694360/pexels-photo-1694360.jpeg",
  },
  {
    id: 5,
    url: "https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 6,
    url: "https://images.pexels.com/photos/158730/new-home-construction-retro-design-158730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 7,
    url: "https://images.pexels.com/photos/276593/pexels-photo-276593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 8,
    url: "https://images.pexels.com/photos/210538/pexels-photo-210538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 9,
    url: "https://images.pexels.com/photos/259685/pexels-photo-259685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 10,
    url: "https://images.pexels.com/photos/1500459/pexels-photo-1500459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=",
  },
];

export const landingPageCards = [
  {
    id: 1,
    url: require("../assets/images/profilePics/Anthony.jpg"),
    subtitle:
      '"Houzez exceeded my expectations! The team was incredibly helpful, guiding me through every step of the rental process. Their professionalism and dedication made finding my dream home a seamless experience."',
    author: "Anthony Leif Patrick Peterson",
    location: "Forfar, Glasgow.",
  },
  {
    id: 2,
    url: require("../assets/images/profilePics/Gemma.jpg"),
    subtitle:
      '"I had an outstanding experience with Houzez. They listened attentively to my preferences and found me the perfect property within my budget. I highly recommend their services for anyone seeking a hassle-free renting process."',
    author: "Gemma Grant",
    location: "Peterson, Edingburg.",
  },
  {
    id: 3,
    url: require("../assets/images/profilePics/Toby.jpg"),
    subtitle:
      '"Five stars to Houzez! The staff was knowledgeable, friendly, and always available to address any concerns. Their commitment to customer satisfaction is commendable, and I am grateful for their assistance in finding a beautiful home."',
    author: "Toby Keech",
    location: "Kurktown, Glasgow.",
  },
  {
    id: 4,
    url: require("../assets/images/profilePics/Ayo.jpg"),
    subtitle:
      '"Houzez made my relocation stress-free! Their prompt responses and personalized approach made me feel valued as a client. I am thrilled with the property they helped me find and could not be happier with their service."',
    author: "Ayodeji Shote",
    location: "Dyce, Aberdeen.",
  },
  {
    id: 5,
    url: require("../assets/images/profilePics/Vasu.jpg"),
    subtitle:
      '"I can not thank Houzez enough for their exceptional service. They were proactive in finding properties that matched my criteria, and their expertise in the real estate market was evident throughout the entire process. Highly recommended!"',
    author: "Vasu Agarwal",
    location: "Marketgait, Dundee.",
  },
  {
    id: 6,
    url: require("../assets/images/profilePics/Maxwell.jpg"),
    subtitle:
      '"Choosing Houzez was the best decision I made while searching for a property. Their expertise and guidance simplified the otherwise daunting process. I am grateful for their support and highly recommend their services."',
    author: "Maxwell Bowie",
    location: "Danestone, Aberdeen.",
  },
  {
    id: 7,
    url: require("../assets/images/profilePics/Chengyu.jpg"),
    subtitle:
      '"Choosing Houzez was the best decision I made while searching for a property. Their expertise and guidance simplified the otherwise daunting process. I am grateful for their support and highly recommend their services."',
    author: "Chengyu Kang",
    location: "Danestone, Aberdeen.",
  },
  {
    id: 8,
    url: require("../assets/images/profilePics/Lyam.jpg"),
    subtitle:
      '"Choosing Houzez was the best decision I made while searching for a property. Their expertise and guidance simplified the otherwise daunting process. I am grateful for their support and highly recommend their services."',
    author: "Lyam Walburn",
    location: "Danestone, Aberdeen.",
  },
];

export const footerLinks = [
  { id: 1, value: "About us", href: "#" },
  { id: 2, value: "Contact us", href: "#" },
  { id: 3, value: "Login", href: "login" },
  { id: 4, value: "Register", href: "register" },
];

export const footerProductLinks = [
  { id: 1, value: "Buyers", href: "buyers" },
  { id: 2, value: "Sellers", href: "sellers" },
  { id: 3, value: "Properties", href: "property" },
  { id: 4, value: "Bookings", href: "bookings" },
];

export const statusTypes = [
  { value: "For sale", label: "For sale" },
  { value: "Sold", label: "Sold" },
  { value: "Withdrawn", label: "Withdrawn" },
];

export const routes = [
  {
		path: '/',
		element: LandingPage,
		isPrivate: false,
	},
  {
		path: 'bookings',
		element: BookingsPage,
		isPrivate: true,
	},
  {
		path: 'property',
		element: PropertiesPage,
		isPrivate: true,
	},
  {
		path: 'property/:id',
		element: PropertyByIdPage,
		isPrivate: true,
	},
  {
		path: 'property/add',
		element: AddProperty,
		isPrivate: true,
	},
  {
		path: 'sellers',
		element: SellersPage,
		isPrivate: true,
	},
  {
		path: 'sellers/:id',
		element: SellerId,
		isPrivate: true,
	},
  {
		path: 'buyers',
		element: BuyersPage,
		isPrivate: true,
	},
  {
		path: 'buyers/:id',
		element: BuyerId,
		isPrivate: true,
	},
  {
		path: 'property/:propertyId/booking',
		element: BookingsPage,
		isPrivate: true,
	},
  {
		path: 'login',
		element: LoginPage,
		isPrivate: false,
	},
  {
		path: 'register',
		element: RegisterPage,
		isPrivate: false,
	},
  {
    path: '*',
    element: NotFoundPage,
    isPrivate: false,
  }
]