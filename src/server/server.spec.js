import { addNewTask, updateTask } from "./server";

(async function asyncAdd() {
    await addNewTask({
        name: "Dummy task",
        id: "42"
    });

    await updateTask({
        name: "Dummy task (updated)",
        id: "42"
    });
})();