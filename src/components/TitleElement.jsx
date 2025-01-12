/* eslint-disable react/prop-types */
export default function TitleElement({ title }) {
  return (
    <div className="relative h-[80px] w-full bg-gradient-to-r from-[#2fdcffe2] to-[#963cfdd0] -z-[1]">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: "url('/img/bg-title.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <h2 className="absolute top-1/2 left-[40px] transform -translate-y-1/2 text-white text-3xl font-bold">
        {title}
      </h2>
    </div>
  )
}
