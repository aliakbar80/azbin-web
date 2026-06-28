import Link from "next/link";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="flex items-center min-h-[80vh] w-full">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col gap-6 max-w-md text-center">
          <h2 className="font-extrabold text-9xl text-muted-foreground">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-lg">با عرض پوزش، ما نتوانستیم این صفحه را پیدا کنیم.</p>
          <Link href="/">
            <Button>برگشتن به صفحه اصلی</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
