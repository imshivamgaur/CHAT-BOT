import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="text-center border-t-1 p-3 border-[#ffffff2b] ">
      <div>Made with ❤️ by Shivam</div>
      <ul className="w-full h-12 flex items-center justify-center gap-4  ">
        <li className=" text-gray-400 text-2xl hover:text-zinc-400 transition-all duration-300">
          <Link target="blank" to={"https://github.com/imshivamgaur"}>
            <FaGithub />
          </Link>
        </li>
        <li className=" text-gray-400 text-2xl hover:text-red-400 transition-all duration-300">
          <Link target="blank" to={"https://www.instagram.com/ishivamgaur/"}>
            <FaInstagram />
          </Link>
        </li>
        <li className=" text-gray-400 text-2xl hover:text-blue-400 transition-all duration-300">
          <Link
            target="blank"
            to={"https://www.linkedin.com/in/iamshivamgaur/"}
          >
            <FaLinkedin />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
