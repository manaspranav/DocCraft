import LandingImg from "../../../public/landing_page_img.svg";
import Image from "next/image";

export default function LandingImage() {
  return (
    <div className="w-full max-w-md mx-auto mt-12">
      <Image
        src={LandingImg}
        alt="Landing illustration"
        width={500}
        height={500}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}
