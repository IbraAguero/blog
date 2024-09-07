import FormAddArticle from "../components/form-add";

const AddArticlePage = () => {
  return (
    <section className="w-full mt-36 grid place-content-center">
      <div className="w-[400px] h-[400px] border rounded-xl flex flex-col items-center p-6">
        <h2 className="font-bold flex-none">Crear nuevo articulo</h2>
        <FormAddArticle />
      </div>
    </section>
  );
};
export default AddArticlePage;
