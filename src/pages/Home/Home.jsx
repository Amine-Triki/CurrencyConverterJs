import "./Home.css";

import AmineTrikiImg from "../../assets/amine triki.webp"

import { RiGithubFill } from "react-icons/ri";
import { RiLinkedinFill } from "react-icons/ri";
import { RiFacebookCircleFill } from "react-icons/ri";
import { RiYoutubeFill } from "react-icons/ri";
import { RiInstagramFill } from "react-icons/ri";


const home = () => {
  return (
    <main className="  d-flex justify-content-center align-items-center">

      <section className="landing ">
        <div className="container  d-flex justify-content-center align-items-center flex-wrap align-content-between">
          <div>
            <h2 className="pt-3">Hello , I am Amine triki</h2>
            <h3 className="mt-3">I am Junior front end developer</h3>
            <h3 className="mt-3">
            based in tunisia; I create elegant and responsive sites, easy to use and built with best practices
            </h3>
            <h3 className="mt-3">
            I use HTML ,CSS, SASS, Tailwind CSS, Bootstrap, JavaScript & React js;
            I am a WordPress designer
            </h3>
            <a
              className="btn  rounded-pill main-btn  mt-3 fs-4"
              href="https://mega.nz/file/XUt13JrK#htwbQSx2cPZoiB3NImWTzMJ-2N-Rg4gtcCOy9wFherE"
              target="_blank"
              rel="noreferrer"
              style={{ backgroundColor: "#b388ff" }}
            >
              download resume
            </a>
            <div className="mt-4 ">
              <a
                href="https://github.com/Amine-Triki"
                target="_blank"
                rel="noreferrer"
              >
                <RiGithubFill className="display-2 " />
              </a>
              <a
                href="https://tn.linkedin.com/in/amine-triki-06b95220b/"
                target="_blank"
                rel="noreferrer"
              >
                <RiLinkedinFill className="display-2  " />
              </a>
              <a
                href="https://www.facebook.com/amine.triki.1998"
                target="_blank"
                rel="noreferrer"
              >
                <RiFacebookCircleFill className="display-2 " />
              </a>
              <a
                href="https://www.youtube.com/@aminetrikitv"
                target="_blank"
                rel="noreferrer"
              >
                <RiYoutubeFill className="display-2 " />
              </a>
              <a
                href="https://www.instagram.com/mr_amine_triki/"
                target="_blank"
                rel="noreferrer"
              >
                <RiInstagramFill className="display-2 " />
              </a>
            </div>
          </div>
          <img
            className="image mt-5 mb-5 "
            src={AmineTrikiImg}
            alt="Amine Triki"
            title="Amine Triki"
          />
        </div>
      </section>
    </main>
  );
};

export default home;
