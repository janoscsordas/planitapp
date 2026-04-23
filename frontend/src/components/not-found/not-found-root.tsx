import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import { IconCompass } from "@tabler/icons-react";


export default function NotFoundRoot() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon" className="size-16">
            <IconCompass className="size-8" />
          </EmptyMedia>
          <EmptyTitle className="text-3xl font-bold">Eltévedtél?</EmptyTitle>
          <EmptyDescription className="text-xl">Úgy tűnik, nem találod amit keresel.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link to="/">
            <Button className="cursor-pointer" size="lg">Vissza a kezdőlapra</Button>
          </Link>
        </EmptyContent>
      </Empty>
    </div>
  )
}