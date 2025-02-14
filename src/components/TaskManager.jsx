import { useState } from "react";
import { motion } from "framer-motion";

const tasks = [
  { name: "distribution", color: "bg-red-500" },
  { name: "assistant-es", color: "bg-blue-500" },
  { name: "devoirs", color: "bg-purple-500" },
  { name: "agenda", color: "bg-yellow-500" },
  { name: "écologie", color: "bg-green-500" },
  { name: "livres", color: "bg-pink-500" },
  { name: "messagers", color: "bg-orange-500" },
  { name: "appel", color: "bg-teal-500" },
  { name: "jeux/sport", color: "bg-indigo-500" },
];
const groupColors = [
  "bg-gray-500",
  "bg-lime-500",
  "bg-cyan-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-sky-500",
  "bg-fuchsia-500",
];
const people = [
  "Pablo",
  "Vincent",
  "Cloe",
  "Adriana A.",
  "Milo",
  "Apolline",
  "Jules C",
  "Martin D",
  "Noeline",
  "Micaela",
  "Isabella",
  "Ignacio",
  "Lucia",
  "Martina",
  "Adriana K",
  "Maximilien",
  "Martin L",
  "Gael",
  "Elisa",
  "Dario",
  "Diego",
  "Eliott",
  "Nicolas",
  "Avril",
  "Carla",
  "Jules S",
  "Aristide",
];
const groups = Array.from({ length: 9 }, (_, i) => ({
  name: `Groupe ${i + 1}`,
  members: people.slice(i * 3, i * 3 + 3),
}));

export default function TaskManager() {
  const [assignments, setAssignments] = useState({});
  const [spinning, setSpinning] = useState(false);

  const assignTasks = () => {
    setSpinning(true);
    setTimeout(() => {
      const shuffledTasks = tasks.sort(() => 0.5 - Math.random());
      const newAssignments = groups.reduce((acc, group, index) => {
        acc[group.name] = {
          task: shuffledTasks[index].name,
          taskColor: shuffledTasks[index].color,
          members: group.members,
          groupColor: groupColors[index],
        };
        return acc;
      }, {});
      setAssignments(newAssignments);
      setSpinning(false);
    }, 2000);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold my-8">
        Classe coopérative : gestion des responsabilités
      </h1>
      <div className="flex flex-row justify-between gap-36">
        <div className="flex flex-col justify-center gap-4 mb-4 text-white font-semibold">
          {groups.map((group, index) => (
            <div
              key={group.name}
              className={`p-2 rounded-md ${groupColors[index]}`}
            >
              {group.name}: {group.members.join(", ")}
            </div>
          ))}
        </div>
        <motion.div
          className="my-10 relative w-96 h-96 rounded-full flex items-center justify-center text-xl font-semibold bg-white"
          animate={{ rotate: spinning ? 360 : 0 }}
          transition={{ repeat: spinning ? Infinity : 0, duration: 1 }}
        >
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
            {tasks.map(({ name, color }) => (
              <div
                key={name}
                className={`flex items-center text-lg border text-white border-white justify-center ${color}`}
              >
                {name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <button
        onClick={assignTasks}
        className="mt-10 rounded-md bg-teal-700 text-white py-2 px-4 font-semibold text-lg"
      >
        Répartir les responsabilités de la classe
      </button>
      <div className="flex flex-col items-center py-4">
        <div className="mt-6 w-full max-w-md flex flex-wrap gap-4 bg-white-200 shadow-md p-4">
          {Object.entries(assignments) &&
            Object.entries(assignments).map(([group, data]) => (
              <div key={group} className="flex items-center gap-4 w-full">
                <div
                  className={`p-4 shadow-md rounded-md text-white ${data.taskColor} w-1/2 text-center`}
                >
                  {data.task}
                </div>
                <div className="text-xl">➡️</div>
                <div
                  className={`p-4 shadow-md rounded-md text-white ${data.groupColor} w-1/2 text-center`}
                >
                  <span className="font-bold">{group}</span>
                  <br />
                  <span className="text-sm">{data.members.join(", ")}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
