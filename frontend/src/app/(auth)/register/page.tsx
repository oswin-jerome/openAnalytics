import RegisterForm  from "@/components/register-form";

const RegisterPage = () => {
  return (
    <div >
    <div className="min-h-svh grid lg:grid-cols-2">
      <div className="bg-[var(--color-app-500)]"></div>
      <div className="flex flex-col gap-6 justify-center items-center p-4">
        <div className=" max-w-xs w-full">
        <RegisterForm/>
        </div>
      </div>
    </div>
  </div>
  )
};

export default RegisterPage;
