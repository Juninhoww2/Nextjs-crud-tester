import React from "react";
import { useTasks } from "../context/TasksContext";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { BsSignpostSplit } from "react-icons/bs";
import { IoTrashBinOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";

function Home() {
  const { tasks, deleteTask,  } = useTasks();
  const router = useRouter();


  return (
    <Layout>
      <div className="flex justify-center">
        {tasks.length === 0 ? (
          <div className="block">
            <img src="/codeleap.svg"  />
          </div>

          ) : (

          <div className="w-7/10 border border-black rounded-md">
            {tasks.map((task, i) => (
              <div
                key={task.id}
                className="bg-gray-400 hover:bg-gray-400 cursor-pointer px-20 py-5 m-2 flex justify-between rounded-md"
                onClick={() => router.push("/edit/" + task.id)}
              >
                <span className="text-5xl mr-5">{i}</span>
                <div>
                  <div className="flex justify-between">
                    <h1>{task.user}</h1>
                    <h1 className="text">{task.title}</h1>
                    <button
                      className="ml-4 inline-flex items-center"
                      onClick={(e) => {
                        if (window.confirm('Are you sure you want to delete this item?')) {
                            e.stopPropagation();
                            deleteTask(task.id);
                          } else {
                            {window.alert("Ok")};
                          };
                        }}
                    >
                      <IoTrashBinOutline  className="w-10 ml-4 fa-2xl" size={30} />
                    </button>

                    <button
                      className="ml-3 inline-flex items-center"
                        key={task.id}
                        onClick={() => router.push("/edit/" + task.id)} >
                        <FaRegEdit className="w-10 ml-4 fa-2xl" size={30} />
                    </button> </div>
                  <p className="text-black">{task.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Home;
