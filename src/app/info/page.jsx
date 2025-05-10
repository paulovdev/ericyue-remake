"use client";

import { useRouter } from "next/navigation";

const Info = () => {
  const router = useRouter();
  return (
    <main className="h-screen grid grid-cols-5 grid-rows-2 py-3 max-lg:h-fit max-lg:grid-cols-2 max-lg:grid-rows-1">
      <section className="col-start-5 col-span-1 max-lg:col-start-2">
        <div className="fixed top-0 right-0 px-5 py-2 flex justify-end max-lg:py-6">
          <button
            className="text-[11px] font-bold uppercase cursor-pointer select-none"
            onClick={() => {
              router.push("/");
            }}
          >
            CLOSE
          </button>
        </div>

        <ul className="">
          <div className="mb-4 flex flex-col items-start gap-[.01rem]">
            <h2 className="text-[11px] font-normal">Narrative & Feature</h2>
            <h2 className="text-[11px] font-normal">Grant Illes | WME</h2>
            <p className="text-[11px] font-normal cursor-pointer transition-all hover:opacity-50">
              gilles@wmeagency.com
            </p>
            <p className="text-[11px] font-normal cursor-pointer transition-all hover:opacity-50">
              310.246.3318
            </p>
          </div>

          <div className="mb-4 flex flex-col items-start gap-[.01rem]">
            <h2 className="text-[11px] font-normal">Commercial & Music</h2>
            <h2 className="text-[11px] font-normal">Shari Shankewitz | WME</h2>
            <p className="text-[11px] font-normal cursor-pointer transition-all hover:opacity-50">
              sshankewitz@wmeagency.com
            </p>
            <p className="text-[11px] font-normal cursor-pointer transition-all hover:opacity-50">
              310.246.3133
            </p>
          </div>

          <div className="mb-4 flex flex-col items-start gap-[.01rem]">
            <h2 className="text-[11px] font-normal">Sarah Hurley | WME</h2>
            <p className="text-[11px] font-normal cursor-pointer transition-all hover:opacity-50">
              shurley@wmeagency.com
            </p>
            <p className="text-[11px] font-normal cursor-pointer transition-all hover:opacity-50">
              310.859.4454
            </p>
          </div>

          <div className="mb-4 flex flex-col items-start gap-[.01rem]">
            <h2 className="text-[11px] font-normal">Studio</h2>

            <p className="text-[11px] font-normal cursor-pointer transition-all hover:opacity-50">
              studio@ericyue.com
            </p>
          </div>

          <div className="flex flex-col items-start gap-[.01rem]">
            <h2 className="text-[11px] font-normal">Select Press</h2>

            <p className="text-[11px] font-normal cursor-pointer transition-all hover:opacity-50">
              Le Cinéma Club
            </p>
            <p className="text-[11px] font-normal cursor-pointer transition-all hover:opacity-50">
              American Cinematographer
            </p>
            <p className="text-[11px] font-normal cursor-pointer transition-all hover:opacity-50">
              British Cinematographer
            </p>
            <p className="text-[11px] font-normal cursor-pointer transition-all hover:opacity-50">
              Indiewire
            </p>
            <p className="text-[11px] font-normal cursor-pointer transition-all hover:opacity-50">
              Filmmaker Magazine
            </p>
            <p className="text-[11px] font-normal cursor-pointer transition-all hover:opacity-50">
              ICG Magazine
            </p>
            <p className="text-[11px] font-normal cursor-pointer transition-all hover:opacity-50">
              Focus Features
            </p>
          </div>
        </ul>
      </section>

      <section className="col-start-2 col-span-2 row-start-2 self-end max-lg:row-start-1 max-lg:col-start-1 max-lg:px-4 max-lg:py-3 max-lg:pr-16">
        <p className="text-[11px] font-normal cursor-pointer select-none">
          (b. New York, NY) a multi-disciplinary artist, cinematographer &
          filmmaker who has lensed a variety of traditional narrative films,
          time-based and screen-based projects.
        </p>
      </section>
    </main>
  );
};

export default Info;
