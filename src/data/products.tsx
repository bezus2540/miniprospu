export type Product = {
  id: string;
  name: string;
  price: number;
  img: string;
  desc?: string;
};

export const products: Record<string, Product> = {
  shirt: {
    id: "shirt",
    name: "เสื้อนักศึกษา",
    price: 399,
    img: "/products/shirt.png",
    desc: "เสื้อนักศึกษา ผ้าใส่สบาย ระบายอากาศดี",
  },
  pants: {
    id: "pants",
    name: "กางเกงนักศึกษา",
    price: 299,
    img: "/products/pants.png",
    desc: "กางเกงนักศึกษา ทรงมาตรฐาน เนื้อผ้าแข็งแรง",
  },
  shoes: {
    id: "shoes",
    name: "รองเท้านักศึกษา",
    price: 499,
    img: "/products/shoes.png",
    desc: "รองเท้านักศึกษา หนังเรียบ ใส่สบาย",
  },
  socks: {
    id: "socks",
    name: "ถุงเท้า",
    price: 39,
    img: "/products/socks.png",
    desc: "ถุงเท้านักศึกษา สีสุภาพ เนื้อหนากำลังดี",
  },
  tie: {
    id: "tie",
    name: "เน็คไท",
    price: 299,
    img: "/products/tie.png",
    desc: "เน็คไทสีสุภาพ เข้าชุดได้ง่าย",
  },
  belt: {
    id: "belt",
    name: "เข็มขัด",
    price: 99,
    img: "/products/belt.png",
    desc: "เข็มขัดหัวโลหะ ปรับไซซ์ง่าย ทนทาน",
  },
};

// สะดวกเวลา map รายการในหน้า shop
export const allProducts = Object.values(products);
