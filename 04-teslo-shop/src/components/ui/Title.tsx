import { titleFont } from "@/config/fonts";

type TitleProps = {
  title: string;
  subTitle?: string;
  className?: string;
};

export const Title = ({ title, subTitle, className }: TitleProps) => {
  return (
    <div className={` ${className}`}>
      <h1 className={`${titleFont.className} antialiased text-4xl font-semibold my-5`}>{title}</h1>

      {subTitle && <h3 className="text-xl mb-5">{subTitle}</h3>}
    </div>
  );
};
