import { useAlert } from "@/context/AlertContext";
import authService from "@/lib/server/authService";
import { useEffect, useState } from "react";

export default function EditPhoneOrEmail({
  edit,
  setClose,
}: {
  edit: "phone" | "email" | null;
  setClose: (value: "phone" | "email" | null) => void;
}) {
  const { callAlert } = useAlert();
  const [form, setForm] = useState({ password: "", phone: "", email: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (edit === "phone") {
      try {
        // adding country code to phone number
        let phone = form.phone;
        if (phone.length === 10) {
          phone = `+91${form.phone}`;
        }
        await authService.updatePhone(phone, form.password);
        callAlert("Phone number updated successfully", "success");
        setClose(null);
        return;
      } catch (error) {
        console.error(error);
        callAlert(`Something went wrong Error: ${error}`, "error");
      }
    } else if (edit === "email") {
      try {
        const res = await authService.updateEmail(form.email, form.password);
        if (!res.$id) {
          callAlert("Invalid password", "error");
          return;
        }
        callAlert("Email updated successfully", "success");
        setClose(null);
      } catch (error) {
        console.error(error);
        callAlert(`Something went wrong Error: ${error}`, "error");
      }
    }
    setClose(null);
  };
  useEffect(() => {
    setForm({ password: "", phone: "", email: "" });
  }, [edit]);
  if (edit === null) return null;
  return (
    <div
      id="edit-phone-or-email"
      tabIndex={-1}
      role="dialog"
      className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex"
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <button
            type="button"
            onClick={() => setClose(null)}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center cursor-pointer"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="#c6c7c7"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              />
            </svg>
            <span className="sr-only">Close popup</span>
          </button>
          <div className="p-5">
            <h3 className="text-2xl mb-0.5 font-medium" />
            <p className="mb-4 text-sm font-normal text-gray-800" />
            <div className="text-center">
              <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                Enter your password
              </p>
              <p className="mt-2 text-sm leading-4 text-slate-600">
                You must enter your password to edit your {edit}.
              </p>
            </div>
            <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600"></div>
            <form
              onSubmit={handleSubmit}
              className="w-full bg-white flex flex-col gap-4"
            >
              <div className="relative bg-inherit">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="peer bg-transparent h-12 w-full rounded-lg placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                  placeholder="password"
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute cursor-text left-2 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                >
                  Password
                </label>
              </div>
              {form.password && (
                <div className="relative bg-inherit">
                  <input
                    type={edit === "phone" ? "tel" : "email"}
                    id={edit}
                    name={edit}
                    value={form[edit]}
                    onChange={handleChange}
                    className="peer bg-transparent h-12 w-full rounded-lg placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                    placeholder={edit === "phone" ? "Phone" : "Email"}
                    required
                  />
                  <label
                    htmlFor={edit}
                    className="absolute cursor-text left-2 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                  >
                    {edit === "phone" ? "Phone" : "Email"}
                  </label>
                </div>
              )}
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
