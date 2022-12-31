import { Link } from "react-router-dom";

/**
 *
 */
export default function Public() {
  return (
    <section className="min-h-screen bg-background text-slate-100">
      <header className="flex items-center justify-center py-3 backdrop-blur-sm">
        <h1 className="text-3xl	font-bold">TechNotes</h1>
      </header>

      <div className="text-center rounded-md backdrop-blur-md p-6 mt-36 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-semibold">
          Welcome <br />
          to
          <br />
          <span className="font-bold">DnD Tech Notes</span>
        </h1>

        <p className="mt-6 text-md">
          Located in Beautiful Downtown Foo City, Dan D. Repairs provides a
          trained staff ready to meet your tech repair needs.
        </p>

        <div className="flex justify-center mt-4 text-md">
          <div className="text-left">
            Dan D. Repairs
            <br />
            555 Foo Drive
            <br />
            Foo City, CA 12345
            <br />
            <a href="tel:+15555555555">(555) 555-5555</a>
          </div>
        </div>
        <br />
        <p className="font-semibold">Owner: Dan Davidson</p>

        <div className="mt-3">
          <Link
            to="/login"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
