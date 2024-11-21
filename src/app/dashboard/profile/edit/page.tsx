"use client";

import { useAlert } from "@/context/AlertContext";
import { useAuth } from "@/context/AuthContext";
import databaseService from "@/lib/server/databaseService";
import storageService from "@/lib/server/storageService";
import { Models } from "appwrite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ProfileFormData = {
  first_name: string | undefined | null;
  last_name: string | undefined | null;
  gender: string | undefined | null;
  dob: string | undefined | null;
};

export default function EditProfile() {
  const { user, loading } = useAuth();
  const { callAlert } = useAlert();
  const router = useRouter();
  const [profile, setProfile] = useState<Models.Document>(
    {} as Models.Document
  );

  const [formData, setFormData] = useState<ProfileFormData>({
    first_name: "",
    last_name: "",
    gender: "",
    dob: "",
  });

  const handleFormChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!profile.$id) {
        return callAlert("Something went wrong", "error");
      }
      if (checkChanges()) {
        return callAlert("No changes made", "info");
      }
      const res = await databaseService.updateUser(
        profile.$id,
        formData.first_name || "",
        formData.last_name || "",
        formData.gender || "",
        formData.dob || ""
      );
      if (!res.$id) {
        return callAlert("Something went wrong", "error");
      }
      callAlert("Profile Updated Successfully", "success");
      return router.push("/dashboard/profile");
    } catch (error) {
      console.error(error);
      return callAlert(`Something went wrong Error: ${error}`, "error");
    }
  };

  const checkChanges = () => {
    return (
      JSON.stringify(formData) ===
      JSON.stringify({
        first_name: profile?.first_name,
        last_name: profile?.last_name,
        gender: profile?.gender,
        dob: profile?.dob,
      })
    );
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile.$id) {
      return callAlert("Something went wrong", "error");
    }
    try {
      const res = await databaseService.updateCoverPhoto(profile.$id, file);
      if (!res.$id) {
        return callAlert("Something went wrong", "error");
      }
      setProfile((prev) => ({
        ...prev,
        coverPic: storageService.getFile(res.coverPic),
      }));
      return callAlert("Cover Picture Updated", "success");
    } catch (error) {
      console.error(error);
      return callAlert(`Something went wrong Error: ${error}`, "error");
    }
  };

  const handleProfileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !profile.$id) {
      return callAlert("Something went wrong", "error");
    }
    try {
      const res = await databaseService.updateProfilePhoto(profile.$id, file);
      if (!res.$id) {
        return callAlert("Something went wrong", "error");
      }
      setProfile((prev) => ({
        ...prev,
        profilePic: storageService.getFile(res.profilePic),
      }));
      return callAlert("Profile Picture Updated", "success");
    } catch (error) {
      console.error(error);
      return callAlert(`Something went wrong Error: ${error}`, "error");
    }
  };

  useEffect(() => {
    if (user && !loading) {
      databaseService.getUserProfile(user.$id).then((res) => {
        setProfile(res);
      });
    }
  }, [user, loading]);

  useEffect(() => {
    setFormData({
      first_name: profile?.first_name,
      last_name: profile?.last_name,
      gender: profile?.gender,
      dob: profile?.dob,
    });
  }, [profile, user]);

  return (
    <section className="py-10 my-auto dark:bg-gray-900">
      <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
          {/*  */}
          <div className="">
            <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
              Profile
            </h1>
            {/* Cover Image */}
            <div
              style={{
                backgroundImage: `url(${
                  profile?.coverPic ||
                  "https://images.unsplash.com/photo-1449844908441-8829872d2607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxob21lfGVufDB8MHx8fDE3MTA0MDE1NDZ8MA&ixlib=rb-4.0.3&q=80&w=1080"
                })`,
              }}
              className={`w-full rounded-sm bg-cover bg-center bg-no-repeat`}
            >
              {/* Profile Image */}
              <div
                style={{
                  backgroundImage: `url(${
                    profile?.profilePic ||
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080"
                  })`,
                }}
                className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat"
              >
                <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                  <input
                    type="file"
                    name="profile"
                    id="upload_profile"
                    onChange={handleProfileUpload}
                    hidden
                  />
                  <label htmlFor="upload_profile">
                    <svg
                      data-slot="icon"
                      className="w-6 h-5 text-blue-700"
                      fill="none"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                      ></path>
                    </svg>
                  </label>
                </div>
              </div>
              <div className="flex justify-end">
                {/*  */}
                <input
                  type="file"
                  name="profile"
                  id="upload_cover"
                  hidden
                  onChange={handleCoverUpload}
                />
                <div className="bg-white flex items-center gap-1 rounded-tl-md px-2 text-center font-semibold">
                  <label
                    htmlFor="upload_cover"
                    className="inline-flex items-center gap-1 cursor-pointer"
                  >
                    Cover
                    <svg
                      data-slot="icon"
                      className="w-6 h-5 text-blue-700"
                      fill="none"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                      ></path>
                    </svg>
                  </label>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <h2 className="text-center mt-1 font-semibold dark:text-gray-300">
                Upload Profile and Cover Image
              </h2>
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full  mb-4 mt-6">
                  <label htmlFor="" className="mb-2 dark:text-gray-300">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData?.first_name || ""}
                    name="first_name"
                    onChange={handleFormChange}
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="First Name"
                  />
                </div>
                <div className="w-full  mb-4 lg:mt-6">
                  <label htmlFor="" className=" dark:text-gray-300">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData?.last_name || ""}
                    name="last_name"
                    onChange={handleFormChange}
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full">
                  <h3 className="dark:text-gray-300 mb-2">Sex</h3>
                  <select
                    className="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    value={formData?.gender || ""}
                    name="gender"
                    onChange={handleFormChange}
                  >
                    <option value="">Select Sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="w-full">
                  <h3 className="dark:text-gray-300 mb-2">Date Of Birth</h3>
                  <input
                    type="date"
                    name="dob"
                    value={formData?.dob || ""}
                    onChange={handleFormChange}
                    className="text-grey p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>
              </div>
              <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                <button
                  type="submit"
                  disabled={checkChanges()}
                  className="w-full p-4 disabled:bg-blue-900 disabled:cursor-not-allowed rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
