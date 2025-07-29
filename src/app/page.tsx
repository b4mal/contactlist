import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="bg-white lg:grid lg:h-screen/60 lg:place-content-center">
        <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-prose text-center">
            <h1 className="head_text">
              {" "}
              Stay Connected With
              <strong className="orange_gradient"> Your loved ones</strong>
            </h1>

            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              Add, view and organize your personal or professional connections
              with ease.
            </p>

            <div className="mt-4 flex justify-center gap-4 sm:mt-6">
              <Link
                href={"/all-contacts"}
                className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
              >
                Your Contacts
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
