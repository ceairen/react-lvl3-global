import Todos from "../../components/ExerciceOne/Todos/Todos";
import TodosForm from "../../components/ExerciceOne/TodosForm/TodosForm";

export default function ExerciceOne() {
  return (
    <section className="ExerciceOne">
      <h1>Exercice 1</h1>
      <div>
        <TodosForm />
        <hr/>
        <Todos />
      </div>
    </section>
  );
}
