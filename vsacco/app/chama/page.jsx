import styles from "./chamaPage.module.css";
import prisma from "../lib/prisma";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ChamaList = async () => {
  const chamaList = await prisma.chama.findMany({
    where: {
      deleted: 0,
    },
  });

  // console.log(chamaList)

  return (
    <div className="container max-w-7xl pt-12 w-full">
      <h1 className="font-display max-w-2xl text-3xl font-semibold sm:text-4xl md:text-5xl">
        Our Chamas
      </h1>
      <p className="text-muted-foreground mt-2 text-lg">
        Learn more about palettify and write your posts with MDX.
      </p>
      <div>
        <h2 className="mb-2 mt-4 text-xl font-bold">Search chama by name</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {/* <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
          <Input placeholder="Filter chamas..." className="max-w-sm" />
        </div>
      </div>
      <ul className="flex flex-col space-y-4">
        {chamaList.map((chama) => (
          <Link key={chama.id} href={`/chama/${encodeURIComponent(chama.id)}`}>
            <li className="group relative cursor-pointer">
              <div className="absolute left-0 top-0 z-0 h-full w-full rounded-xl border bg-[rgba(50,50,50,0.1)] opacity-50 shadow-md transition-all duration-300 group-hover:opacity-100 dark:bg-[rgba(230,230,230,0.1)] dark:from-transparent dark:via-transparent dark:to-transparent"></div>
              <div className="flex space-x-2 p-4 sm:flex-row md:p-6">
                <div className="w-full">
                  <div className="mb-1 flex space-x-1">
                    <div>
                      <h2 className="text-lg font-bold">{chama.name}</h2>
                      <p className="mb-2 text-sm text-gray-400">
                        Published on Nov 19, 2023 • 4 min read
                      </p>
                    </div>
                  </div>
                  <p className="mb-3 text-sm">
                    {chama.description.slice(0, 250)} ...
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center text-xs font-medium text-foreground bg-transparent px-3 py-1 z-10">
                      <Link
                        key={chama.id}
                        href="#"
                        className="z-20 hover:underline hover:text-primary"
                      >
                        Blog
                      </Link>
                    </div>
                    <div className="flex items-center text-xs font-medium text-foreground bg-transparent px-3 py-1 z-10">
                      <Link
                        key={chama.id}
                        href="#"
                        className="z-20 hover:underline hover:text-primary"
                      >
                        Website
                      </Link>
                    </div>
                    <div className="flex items-center text-xs font-medium text-foreground bg-transparent px-3 py-1 z-10">
                      <Link
                        key={chama.id}
                        href="#"
                        className="z-20 hover:underline hover:text-primary"
                      >
                        Portfolio
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ChamaList;
