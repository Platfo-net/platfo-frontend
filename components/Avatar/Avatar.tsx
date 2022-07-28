import Image from "next/image";

/* eslint-disable @next/next/no-img-element */
type AvatarProps = {};

const Avatar: React.FC<AvatarProps> = ({ imageUrl, icon, className }) => {
  return (
    <>
      {imageUrl && (
        <Image
          className="avatar inline-block rounded-full ring-2 ring-white w-full h-full"
          src={imageUrl}
          alt=""
        />
      )}
      {icon && <div className={`avatar ${className}`}> {icon}</div>}
    </>
  );
};

export default Avatar;
