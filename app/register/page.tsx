import Image from "next/image";
import React from "react";

const Register = () => {
  return (
    <div className=" min-h-screen flex">
      <div className="bg-black-800 p-16 w-1/2">
        <Image
          src="assets/icons/logo-dark.svg"
          alt="logo"
          width={147}
          height={30}
          className="mb-20"
        />
        <div className="flex justify-center ">
          <div className="max-w-md">
            <h2 className="display-1-bold mb-10">
              Join our developer community! Sign up now and be part of the
              conversation.
            </h2>
            <article className="flex flex-col gap-5">
              <div className="bg-black-700 p-5 flex gap-5 items-center rounded-lg">
                <div className="bg-black-800 p-5 rounded-md">
                  <Image
                    src="assets/icons/business.svg"
                    alt="business"
                    width={30}
                    height={20}
                  />
                </div>
                <p className="paragraph-1-medium">
                  Discover the latest trends, tools, and insights shaping the
                  developer world.
                </p>
              </div>
              <div className="bg-black-700 p-5 flex gap-5 items-center rounded-lg">
                <div className="bg-black-800 p-5 rounded-md">
                  <Image
                    src="assets/icons/chat.svg"
                    alt="business"
                    width={30}
                    height={20}
                  />
                </div>
                <p className="paragraph-1-medium">
                  Forge connections, collaborate on projects, and grow together.
                </p>
              </div>
              <div className="bg-black-700 p-5 flex gap-5 items-center rounded-lg">
                <div className="bg-black-800 p-5 rounded-md">
                  <Image
                    src="assets/icons/inbox.svg"
                    alt="business"
                    width={30}
                    height={20}
                  />
                </div>
                <p className="paragraph-1-medium">
                  Elevate your coding with exclusive content for professional
                  growth
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
      <div className="text-white-100 bg-black-900 p-16 min-h-screen w-1/2">
        Form
      </div>
    </div>
  );
};

export default Register;
