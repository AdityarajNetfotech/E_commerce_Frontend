import uniformImg from "./Components/Images/Rectangle 420 (1).png";
import bookImg from "./Components/Images/Rectangle 420 (2).png";
import uniformRedImg from "./Components/Images/Rectangle 420.png";

const products = [
  {
    id: 1,
    name: "Red School Uniform",
    school: "Sunrise High School",
    price: 850,
    img: uniformRedImg,
    sizes: [32, 34, 36, 38],
    productInfo: "Comfortable and durable red school uniform for students.",
    sellerInfo: {
      name: "ABC Uniforms",
      contact: "abc.uniforms@example.com",
      location: "Delhi, India"
    }
  },
  {
    id: 2,
    name: "Blue School Uniform",
    school: "Greenwood Academy",
    price: 950,
    img: uniformImg,
    sizes: [32, 34, 36, 38],
    productInfo: "High-quality blue school uniform with a soft fabric.",
    sellerInfo: {
      name: "XYZ Uniforms",
      contact: "xyz.uniforms@example.com",
      location: "Mumbai, India"
    }
  },
  {
    id: 3,
    name: "Mathematics Book",
    school: "Sunrise High School",
    price: 450,
    img: bookImg,
    sizes: [], // Books ke liye size nahi hoga
    productInfo: "Mathematics book covering algebra, geometry, and calculus.",
    sellerInfo: {
      name: "Book World",
      contact: "bookworld@example.com",
      location: "Kolkata, India"
    }
  },
  {
    id: 4,
    name: "Science Book",
    school: "Greenwood Academy",
    price: 400,
    img: bookImg,
    sizes: [],
    productInfo: "Latest edition science book with physics, chemistry, and biology concepts.",
    sellerInfo: {
      name: "Education Hub",
      contact: "educationhub@example.com",
      location: "Bangalore, India"
    }
  },
  {
    id: 5,
    name: "Yellow School Uniform",
    school: "Oakwood International School",
    price: 900,
    img: uniformRedImg,
    sizes: [32, 34, 36, 38],
    productInfo: "Premium quality yellow school uniform with breathable fabric.",
    sellerInfo: {
      name: "Elite Uniforms",
      contact: "elite.uniforms@example.com",
      location: "Chennai, India"
    }
  },
  {
    id: 6,
    name: "Black School Uniform",
    school: "Blue Ridge Academy",
    price: 1000,
    img: uniformImg,
    sizes: [32, 34, 36, 38],
    productInfo: "Elegant black school uniform made from soft and durable material.",
    sellerInfo: {
      name: "Best Uniforms",
      contact: "best.uniforms@example.com",
      location: "Hyderabad, India"
    }
  }
];

export default products;
