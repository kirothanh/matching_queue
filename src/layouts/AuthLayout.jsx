/* eslint-disable react/prop-types */
export default function AuthLayout({ children }) {
  return (
    <div className="h-full">
      <div className="bg-gray-50 h-full">
        {children}
      </div>
    </div>
  )
}
