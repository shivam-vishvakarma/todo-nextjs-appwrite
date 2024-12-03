"use client";

import EditPhoneOrEmail from "@/components/EditPhoneOrEmail";
import Loader from "@/components/Loader";
import { useAlert } from "@/context/AlertContext";
import { useAuth } from "@/context/AuthContext";
import authService from "@/lib/server/authService";
import databaseService from "@/lib/server/databaseService";
import storageService from "@/lib/server/storageService";
import { Models } from "appwrite";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const { callAlert } = useAlert();
  const { user, loading } = useAuth();
  const [showLoader, setShowLoader] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<Models.Document>(
    {} as Models.Document
  );
  const [edit, setEdit] = useState<"phone" | "email" | null>(null);

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowLoader(true);
    const file = e.target.files?.[0];
    if (!file || !profile.$id) {
      setShowLoader(false);
      return callAlert("Something went wrong", "error");
    }
    try {
      const res = await databaseService.updateCoverPhoto(profile.$id, file);
      if (!res.$id) {
        setShowLoader(false);
        return callAlert("Something went wrong", "error");
      }
      setProfile((prev) => ({
        ...prev,
        coverPic: storageService.getFile(res.coverPic),
      }));
      setShowLoader(false);
      return callAlert("Cover Picture Updated", "success");
    } catch (error) {
      console.error(error);
      setShowLoader(false);
      return callAlert(`Something went wrong Error: ${error}`, "error");
    }
  };

  const handleProfileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowLoader(true);
    const file = e.target.files?.[0];
    if (!file || !profile.$id) {
      setShowLoader(false);
      return callAlert("Something went wrong", "error");
    }
    try {
      const res = await databaseService.updateProfilePhoto(profile.$id, file);
      if (!res.$id) {
        setShowLoader(false);
        return callAlert("Something went wrong", "error");
      }
      setProfile((prev) => ({
        ...prev,
        profilePic: storageService.getFile(res.profilePic),
      }));
      setShowLoader(false);
      return callAlert("Profile Picture Updated", "success");
    } catch (error) {
      console.error(error);
      setShowLoader(false);
      return callAlert(`Something went wrong Error: ${error}`, "error");
    }
  };

  const editPhone = () => {
    setEdit("phone");
  };

  const editEmail = () => {
    setEdit("email");
  };

  const createPhoneVerification = async () => {
    setShowLoader(true);
    try {
      await authService.createPhoneVerification();
      setShowLoader(false);
      return callAlert("Verification Sent", "success");
    } catch (error) {
      console.error(error);
      setShowLoader(false);
      return callAlert(`Something went wrong Error: ${error}`, "error");
    }
  };

  const createEmailVerification = async () => {
    setShowLoader(true);
    try {
      await authService.createEmailVerification();
      setShowLoader(false);
      return callAlert("Verification Sent", "success");
    } catch (error) {
      console.error(error);
      setShowLoader(false);
      return callAlert(`Something went wrong Error: ${error}`, "error");
    }
  };

  const EditButton = () => {
    return (
      <Link
        href={"/dashboard/profile/edit"}
        className="text-slate-800 hover:text-blue-600 text-sm bg-white font-medium inline-flex space-x-1 items-center mr-2"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </span>
        <span className="hidden md:inline-block">Edit</span>
      </Link>
    );
  };

  useEffect(() => {
    if (user && !loading) {
      databaseService.getUserProfile(user.$id).then((res) => {
        setProfile(res);
        setShowLoader(false);
      });
    }
  }, [user, loading]);
  useEffect(() => {
    if (searchParams.has("edit")) {
      const edit = searchParams.get("edit");
      if (edit === "phone") {
        setEdit("phone");
      } else if (edit === "email") {
        setEdit("email");
      }
    }
  }, [searchParams]);
  useEffect(() => {
    if (edit !== null) router.push("?edit=" + edit);
    else router.push("/dashboard/profile");
  }, [edit]);

  if (loading || showLoader) {
    return <Loader />;
  }

  return (
    <section className="w-full overflow-hidden dark:bg-gray-900 mt-4">
      <div className="flex flex-col">
        {/* Cover Image */}
        <div className="relative">
          <div className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]">
            <img
              src={
                profile.coverPic ||
                "https://images.unsplash.com/photo-1732130318657-c8740c0f5215?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="User Cover"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute right-1 bottom-1">
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
        {/* Profile Image */}
        <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
          <div className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]">
            <img
              src={
                profile.profilePic ||
                "https://images.unsplash.com/photo-1690749170664-fe894475db98?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="User Profile"
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute right-0 bottom-0 bg-white/90 rounded-ss-lg w-6 h-6 text-center ml-28 mt-4">
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
          {/* FullName */}
          <h1 className="w-full text-left my-4 sm:mx-4 xs:pl-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif">
            {profile?.first_name} {profile?.last_name}
          </h1>
        </div>
        <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
          {/* Detail */}
          <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
            <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
              <div className="w-full">
                <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                  <div className="flex flex-col pb-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                      First Name
                    </dt>
                    <dd className="text-lg font-semibold flex justify-between">
                      <p>{profile?.first_name}</p> <EditButton />
                    </dd>
                  </div>

                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                      Date Of Birth
                    </dt>
                    <dd className="text-lg font-semibold flex justify-between">
                      <p>{new Date(profile?.dob).toDateString()}</p>{" "}
                      <EditButton />
                    </dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                      Gender
                    </dt>
                    <dd className="text-lg font-semibold flex justify-between">
                      <p>{profile?.gender?.toUpperCase()}</p> <EditButton />
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="w-full">
                <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                  <div className="flex flex-col pb-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                      Last Name
                    </dt>
                    <dd className="text-lg font-semibold flex justify-between">
                      <p>{profile?.last_name}</p> <EditButton />
                    </dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                      Phone Number
                    </dt>
                    <dd className="text-lg font-semibold flex justify-between">
                      <p>{user?.phone}</p>{" "}
                      <span className="flex gap-2">
                        <button
                          onClick={editPhone}
                          className="text-slate-800 gap-1 hover:text-blue-600 text-sm bg-white rounded-l-lg font-medium inline-flex items-center"
                        >
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </span>
                          <span className="hidden md:inline-block">Edit</span>
                        </button>
                        {user?.phoneVerification === false && (
                          <button
                            onClick={createPhoneVerification}
                            className="text-slate-800 gap-1 hover:text-blue-600 text-sm bg-white font-medium inline-flex items-center"
                          >
                            <span className="hidden md:inline-block">
                              Verify
                            </span>
                          </button>
                        )}
                      </span>
                    </dd>
                  </div>
                  <div className="flex flex-col pt-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                      Email
                    </dt>
                    <dd className="text-lg font-semibold flex justify-between">
                      <p>{user?.email}</p>
                      <span className="flex gap-2">
                        <button
                          onClick={editEmail}
                          className="text-slate-800 gap-1 hover:text-blue-600 text-sm bg-white rounded-l-lg font-medium inline-flex items-center"
                        >
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </span>
                          <span className="hidden md:inline-block">Edit</span>
                        </button>
                        {user?.emailVerification === false && (
                          <button
                            onClick={createEmailVerification}
                            className="text-slate-800 gap-1 hover:text-blue-600 text-sm bg-white font-medium inline-flex items-center"
                          >
                            <span className="hidden md:inline-block">
                              Verify
                            </span>
                          </button>
                        )}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditPhoneOrEmail edit={edit} setClose={setEdit} />
    </section>
  );
}
