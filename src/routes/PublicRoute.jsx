import AuthLayout from "../layouts/AuthLayout";

/* eslint-disable react/prop-types */
export default function PublicRoute({ element }) {
  return (
    <div>
      <AuthLayout>
        {element}
      </AuthLayout>
    </div>
  )
}
