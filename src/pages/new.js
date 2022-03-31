import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useTasks } from "../context/TasksContext";
import { useRouter } from "next/router";

const inititalState = {
  title: "",
  description: "",
  user: "",
};

const TaskFormPage = () => {
  const [task, setTask] = useState(inititalState);
  const { createTask, updateTask, tasks } = useTasks();
  const router = useRouter();

  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!router.query.id) {
      createTask(task.title, task.description, task.user);
      // setTask(inititalState);
    } else {
      updateTask(router.query.id, task);
    }

    router.push("/");
  };

  useEffect(() => {
    if (router.query.id) {
      const taskFound = tasks.find((task) => task.id === router.query.id);
      if (taskFound)
        setTask({ title: taskFound.title, description: taskFound.description, user: taskFound.user });
    }
  }, [router.query.id]);

  return (
    <Layout>
      <div className="flex justify-center items-center h-full">
        <form className="bg-white p-10 h-6/8" onSubmit={handleSubmit}>
          <h1 className="text-3xl mb-7">
            {router.query.id ? "Edit Post" : "New Post"}
          </h1>
            <h1 className="text-black mb-4">
            What’s on your mind?
            </h1>

          <input
            type="text"
            className="placeholder:italic text-gray-400 placeholder:text-slate-400 block bg-white w-full border border-black rounded-md py-3 px-4 mb-5"
            placeholder="Write username"
            autoFocus
            name="user"
            onChange={handleChange}
            value={task.user}
          />
          <input
            type="text"
            className="placeholder:italic text-gray-400 placeholder:text-slate-400 block bg-white w-full border border-black rounded-md py-3 px-4 mb-5"
            placeholder="Write a title"
            autoFocus
            name="title"
            onChange={handleChange}
            value={task.title}
          />
          <textarea
            cols="2"
              className="placeholder:italic text-gray-400 placeholder:text-slate-400 block bg-white w-full border border-black rounded-mb py-3 px-4 mb-5"
            placeholder="Write a Description"
            name="description"
            onChange={handleChange}
            value={task.description}
          ></textarea>

          <button
            className="bg-black hover:bg-black-800 px-4 pl-4 py-2 rounded-sm disabled:opacity-30"
            disabled={!task.user}
          >
            Create
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default TaskFormPage;
