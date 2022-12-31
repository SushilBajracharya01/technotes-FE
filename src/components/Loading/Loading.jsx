import Loader from "../../elements/Loader";

export default function Loading() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <section className="sm:mx-auto w-5/6 sm:max-w-md bg-white  py-8 px-4 shadow rounded-lg sm:px-10 flex justify-center items-center">
        <Loader />
      </section>
    </div>
  );
}
