import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import { IconCompass } from "@tabler/icons-react";


export default function NotFoundRoot() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconCompass />
          </EmptyMedia>
          <EmptyTitle>Eltévedtél?</EmptyTitle>
          <EmptyDescription>Úgy tűnik, nem találod amit keresel.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link to="/">
            <Button className="cursor-pointer">Vissza a kezdőlapra</Button>
          </Link>
        </EmptyContent>
      </Empty>
    </div>
  )
}