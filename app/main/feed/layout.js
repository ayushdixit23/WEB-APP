import Switcher from "./Component/Switcher";

export default function PostLayout({ children }) {
  return (
    <div className=" w-[100%] h-[100%] ">
      <div className="pn:max-sm:fixed pn:max-md:top-14 z-40 pn:max-md:w-[100%] bg-white">
        <Switcher />
      </div>

      {/* Header */}
      <div className="w-[100%] h-[100vh] z-0 flex">{children}</div>

      {/*Posts*/}
    </div>
  );
}
