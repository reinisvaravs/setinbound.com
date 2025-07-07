import Link from "next/link";

export default function BackHomeBtn() {
  return (
    <Link
      href="/"
      className="ease inline-flex items-center justify-center rounded-md bg-accent-BLUE px-6 py-3 text-center text-base font-medium text-primary-WHITE transition duration-300 hover:bg-success-500"
    >
      Back to Home
    </Link>
  );
}
