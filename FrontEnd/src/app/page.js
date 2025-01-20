"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allData, deleteUser } from "./Redux/userSlice";
import { Spinner } from "flowbite-react";

export default function Home() {
  const { getAllData, status } = useSelector((state) => state.Sli);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allData());
  }, [dispatch]);

  const deleteTo = (id) => {
    dispatch(deleteUser({ id: id })).then(() => {
      dispatch(allData());
    });
  };

  return (
    <>
      {status === "loading" ? (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <p className="text-3xl">Loading...</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto my-8 px-2">
          <Link href="/create">
            <button className="bg-purple-700 text-white p-2 rounded-sm text-sm">
              Create New
            </button>
          </Link>
          <div className="flex justify-center text-2xl md:text-3xl font-bold my-4">
            All Users
          </div>

          {getAllData.length === 0 && !status==="loading" ? (
            <div className="text-center text-xl text-gray-500">
              No data found
            </div>
          ) : (
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 p-2 xl:p-5">
              {getAllData.map((item) => (
                <li
                  key={item._id}
                  className="relative bg-white flex flex-col justify-between border border-gray-300 rounded shadow-md hover:shadow-teal-400"
                >
                  <div className="flex flex-col gap-3 px-4 py-3">
                    <h1 className="flex justify-center items-center text-xl font-semibold text-teal-700 hover:text-teal-800">
                      {item.fname} {item.lname}
                    </h1>
                    <p className="text-gray-600 text-start">
                      Writey A.I is an AI tool that generates original, researched blog posts in minutes.
                    </p>
                    <div className="flex justify-between w-full">
                      <Link href={`/${item._id}`}>
                        <button className="bg-white border border-teal-500 rounded px-3 py-2 text-teal-500 hover:bg-teal-500 hover:text-white">
                          View
                        </button>
                      </Link>

                      <div className="flex gap-3">
                        <Link href={`/update/${item._id}`}>
                          <button className="bg-blue-600 py-2 px-3 rounded text-white hover:bg-blue-800">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                          </button>
                        </Link>

                        <button className="bg-red-600 py-2 px-3 rounded text-white hover:bg-red-800" onClick={() => deleteTo(item._id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
